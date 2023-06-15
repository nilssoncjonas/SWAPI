import {useEffect} from "react"
import {useSearchParams} from "react-router-dom"
// Hooks
import useGetData from "../hooks/useGetData.ts";
// Types
import {FilmPaginationData} from "../types"
// Components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Loading from "../components/C_Loading.tsx";
import C_FilmsList from "../components/C_FilmsList.tsx"
import C_SearchResultData from "../components/C_SearchResultData.tsx";
import C_zeroResults from "../components/C_zeroResults.tsx";
import InputForm from "../components/InputForm.tsx"
import Pagination from "../components/Pagination.tsx"
// Style
import ListGroup from "react-bootstrap/ListGroup"

const Films = () => {

	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get('search')
	const page = searchParams.get('page')

	const {
		resData,
		error,
		isError,
		isLoading,
		execute,
		setUrl,
	} = useGetData<FilmPaginationData>('films')

	const onChangeUrl = (url: string) => {
		setUrl(`films?${url}`)
		setSearchParams(`${url}`)
	}

	useEffect(() => {
		if (page && search) {
			setUrl(`films?page=${page}&search=${search}`)
		} else if (search) {
			setUrl(`films?search=${search}`)
		} else if (page) {
			setUrl(`films?page=${page}`)
		}
		execute
	}, [execute, setUrl, page, search])

	return (
		<>
			<h1>Films</h1>
			<InputForm onSearch={onChangeUrl}/>

			{isLoading && <C_Loading/>}

			{isError && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && (
				<>
					{resData.to === null && resData.data.length === 0 && <C_zeroResults query={search}/>}
					{resData.data.length > 0 && (
						<C_SearchResultData query={search} from={resData.from} to={resData.to} total={resData.total}
																resource={'Films'}/>
					)}
					<ListGroup className='mb-3'>
						<C_FilmsList data={resData.data}/>
					</ListGroup>

					{resData.first_page_url && <Pagination resData={resData}  onChangeUrl={onChangeUrl}/>}
				</>
			)}
		</>
	)
}
export default Films