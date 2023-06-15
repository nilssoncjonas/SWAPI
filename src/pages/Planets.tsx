import { useEffect} from "react"
import {useSearchParams} from "react-router-dom";
// Hooks
import useGetData from "../hooks/useGetData.ts";
// types
import {PlanetsPaginationData} from "../types"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Loading from "../components/C_Loading.tsx";
import C_PlanetsList from "../components/C_PlanetsList.tsx"
import C_SearchResultData from "../components/C_SearchResultData.tsx";
import C_zeroResults from "../components/C_zeroResults.tsx";
import InputForm from "../components/InputForm.tsx"
import Pagination from "../components/Pagination.tsx"
// style
import ListGroup from "react-bootstrap/ListGroup"


const Planets = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const search = searchParams.get('search')
	const page = searchParams.get('page')

	const {
		resData,
		error,
		isError,
		isLoading,
		execute,
		setUrl,
	} = useGetData<PlanetsPaginationData>('planets')

	const onChangeUrl = (url: string) => {
		setUrl(`planets?${url}`)
		setSearchParams(`${url}`)
	}

	useEffect(() => {
		if (page && search) {
			setUrl(`planets?page=${page}&search=${search}`)
		} else if (search) {
			setUrl(`planets?search=${search}`)
		} else if (page) {
			setUrl(`planets?page=${page}`)
		}
		execute
	}, [execute, setUrl, page, search])

	return (
		<>
			<h1>Planets</h1>
			<InputForm onSearch={onChangeUrl}/>
			{isLoading && <C_Loading/>}

			{isError && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}

			{resData && (
				<>
					{resData.to === null && resData.data.length === 0 && <C_zeroResults query={search}/>}
					{resData.data.length > 0 && (
						<C_SearchResultData query={search} from={resData.from} to={resData.to} total={resData.total}
																resource={'Planets'}/>
					)}

					<ListGroup className='mb-3'>
						<C_PlanetsList data={resData.data}/>
					</ListGroup>

					{resData.first_page_url && <Pagination resData={resData} onChangeUrl={onChangeUrl}/>}
				</>
			)}
		</>
	)
}
export default Planets