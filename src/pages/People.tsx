import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {PeoplePaginationData, PeoplesData} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Loading from "../components/C_Loading.tsx";
import C_PeopleList from "../components/C_PeopleList.tsx"
import InputForm from "../components/InputForm.tsx"
import Pagination from "../components/Pagination.tsx"
// style
import ListGroup from "react-bootstrap/ListGroup"

const People = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<PeoplePaginationData>({} as PeoplePaginationData)
	const [peopleData, setPeopleData] = useState<PeoplesData>([])

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const page = searchParams.get('page')
	const get = async (page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res: PeoplePaginationData = await SWAPI.getPeople(page)
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
	}

	const searchReq = async (query: string) => {
		const res = await SWAPI.searchPeople(query)
		setSearchParams({search: query, page: '1'})
		setResData(res)
		setPeopleData(res.data)
	}

	useEffect(() => {
		if (query) {
			searchReq(query)
		} else if (page) {
			get(Number(page))
		} else
			get()
	}, [query, page])

	return (
		<>
			<h1>People</h1>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}

			{resData && peopleData && (
				<>
					<p>Showing {resData.from} to {resData.to} of total {resData.total} results from the People Resource</p>

					<ListGroup className='mb-3'>
						<C_PeopleList data={peopleData}/>
					</ListGroup>

					<Pagination resData={resData}/>
				</>
			)}
		</>
	)
}
export default People