import {useCallback, useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {PeoplePaginationData, PeoplesData} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Loading from "../components/C_Loading.tsx";
import C_PeopleList from "../components/C_PeopleList.tsx"
import C_SearchResultData from "../components/C_SearchResultData.tsx";
import InputForm from "../components/InputForm.tsx"
import Pagination from "../components/Pagination.tsx"
// style
import ListGroup from "react-bootstrap/ListGroup"
import C_zeroResults from "../components/C_zeroResults.tsx";

const People = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<PeoplePaginationData>({} as PeoplePaginationData)
	const [peopleData, setPeopleData] = useState<PeoplesData>([])

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const page = searchParams.get('page')

	const get = useCallback( async (page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<PeoplePaginationData>(`people/?page=${page}`)
			const data: PeoplesData = res.data
			setResData(res)
			setPeopleData(data)
			setSearchParams({page: page.toString()})
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}, [setSearchParams])

	const searchReq = useCallback( async (query: string) => {
		const res = await SWAPI.get<PeoplePaginationData>(`people/?page=1&search=${query}`)
		setSearchParams({search: query, page: '1'})
		setResData(res)
		setPeopleData(res.data)
	}, [setSearchParams])

	useEffect(() => {
		if (query) {
			searchReq(query)
		} else if (page) {
			get(Number(page))
		} else {
			get()
		}
	}, [query, page, get, searchReq])

	return (
		<>
			<h1>People</h1>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}

			{resData && peopleData && (
				<>
					{peopleData.length === 0 && <C_zeroResults query={query}/>}
					{peopleData.length > 0 && (
						<C_SearchResultData query={query} from={resData.from} to={resData.to} total={resData.total} resource={'People'}/>
					)}
					<ListGroup className='mb-3'>
						<C_PeopleList data={peopleData}/>
					</ListGroup>

					{resData.first_page_url && <Pagination resData={resData}/>}
				</>
			)}
		</>
	)
}
export default People