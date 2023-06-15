import {useEffect} from "react"
import {useSearchParams} from "react-router-dom"
// Hooks
import useGetData from "../hooks/useGetData.ts"
// types
import { VehiclePaginationData} from "../types"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Loading from "../components/C_Loading.tsx"
import C_SearchResultData from "../components/C_SearchResultData.tsx"
import C_VehiclesList from "../components/C_VehiclesList.tsx"
import C_zeroResults from "../components/C_zeroResults.tsx"
import InputForm from "../components/InputForm.tsx"
import Pagination from "../components/Pagination.tsx"
// style
import ListGroup from "react-bootstrap/ListGroup"

const Vehicles = () => {
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
	} = useGetData<VehiclePaginationData>('vehicles')

	const onChangeUrl = (url: string) => {
		setUrl(`vehicles?${url}`)
		setSearchParams(`${url}`)
	}

	useEffect(() => {
		if (page && search) {
			setUrl(`vehicles?page=${page}&search=${search}`)
		} else if (search) {
			setUrl(`vehicles?search=${search}`)
		} else if (page) {
			setUrl(`vehicles?page=${page}`)
		}
		execute
	}, [execute, setUrl, page, search])

	return (
		<>
			<h1>Vehicles</h1>
			<InputForm onSearch={onChangeUrl}/>

			{isLoading && <C_Loading/>}

			{isError && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && (
				<>
					{resData.to === null && resData.data.length === 0 && <C_zeroResults query={search}/>}
					{resData.data.length > 0 && (
						<C_SearchResultData query={search} from={resData.from} to={resData.to} total={resData.total}
																resource={'Vehicles'}/>
					)}
					<ListGroup className='mb-3'>
						<C_VehiclesList data={resData.data}/>
					</ListGroup>

					{resData.first_page_url && <Pagination resData={resData} onChangeUrl={onChangeUrl}/>}
				</>
			)}
		</>
	)
}
export default Vehicles