import {useEffect} from "react"
import {useSearchParams} from "react-router-dom"
// Hooks
import useGetData from "../hooks/useGetData.ts";
// types
import {PeoplePaginationData} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Loading from "../components/C_Loading.tsx";
import C_PeopleList from "../components/C_PeopleList.tsx"
import C_SearchResultData from "../components/C_SearchResultData.tsx";
import C_zeroResults from "../components/C_zeroResults.tsx";
import InputForm from "../components/InputForm.tsx"
import Pagination from "../components/Pagination.tsx"
// style
import ListGroup from "react-bootstrap/ListGroup"

const People = () => {
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
	} = useGetData<PeoplePaginationData>('people')

	const onChangeUrl = (url: string) => {
		setUrl(`people?${url}`)
		setSearchParams(`${url}`)
	}

	useEffect(() => {
		if (page && search) {
			setUrl(`people?page=${page}&search=${search}`)
		} else if (search) {
			setUrl(`people?search=${search}`)
		} else if (page) {
			setUrl(`people?page=${page}`)
		}
		execute
	}, [execute, setUrl, page, search])

	return (
		<>
			<h1>People</h1>
			<InputForm onSearch={onChangeUrl}/>

			{isLoading && <C_Loading/>}

			{isError && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}
			{resData && (
				<>
					{resData.to === null && resData.data.length === 0 && (<C_zeroResults query={search}/>)}
					{resData.data.length > 0 && (
						<C_SearchResultData query={search} from={resData.from} to={resData.to} total={resData.total}
																resource={'People'}/>
					)}
					<ListGroup className='mb-3'>
						<C_PeopleList data={resData.data}/>
					</ListGroup>

					{resData.first_page_url && <Pagination resData={resData} onChangeUrl={onChangeUrl}/>}
				</>
			)
			}
		</>
	)
}
export default People