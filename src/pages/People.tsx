import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {PeoplePaginationData, PeoplesData} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import InputForm from "../components/InputForm.tsx"
import Pagination from "../components/Pagination.tsx"
import C_PeopleList from "../components/C_PeopleList.tsx"
// style
import spinner from "../../public/rebel.svg"
import {Image} from "react-bootstrap"
import ListGroup from "react-bootstrap/ListGroup"

const People = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<PeoplePaginationData>({} as PeoplePaginationData)
	const [peopleData, setPeopleData] = useState<PeoplesData>([])
	const [page, setPage] = useState(1)

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const get = async () => {
		setLoading(true)
		setError(null)
		try {
			const res: PeoplePaginationData = await SWAPI.getPeople()
			const data: PeoplesData = res.data
			setResData(res)
			setPeopleData(data)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const searchReq = async (query: string) => {
		const res = await SWAPI.searchPeople(query)
		setPage(1)
		setSearchParams({search: query, page: page.toString()})
		setResData(res)
		setPeopleData(res.data)
	}
	const handlePrevPage = () => {
		setPage(prevValue => prevValue - 1)
	}
	const handleNextPage = () => {
		setPage(prevValue => prevValue + 1)
	}

	useEffect(() => {
		if (query) {
			searchReq(query)
		} else {
			get()
		}
	}, [query])

	return (
		<>
			<h1>People</h1>
			<InputForm onSearch={searchReq}/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}

			{resData && peopleData && (
				<>
					<p>Showing {resData.from} to {resData.to} of {resData.total} from the People Resource</p>

					<ListGroup className='mb-3'>
						<C_PeopleList data={peopleData}/>
					</ListGroup>

					<Pagination resData={resData} onPrevPage={handlePrevPage} onNextPage={handleNextPage}/>
				</>
			)}
		</>
	)
}
export default People