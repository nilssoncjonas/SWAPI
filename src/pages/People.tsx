import {useEffect, useState} from "react";
import {PaginationData} from "../types"
import * as SWAPI from "../services/SWAPI-client.ts"

import {Image} from "react-bootstrap"
import spinner from "../../public/rebel.svg"
import AutoAlert from "../components/AutoAlert.tsx"
import InputForm from "../components/InputForm.tsx"
import {PeoplePaginationData, PeoplesData} from "../types/peoples";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "../components/Pagination.tsx";
import PeopleList from "../components/PeopleList.tsx";

const People = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<PeoplePaginationData>({} as PeoplePaginationData)
	const [peopleData, setPeopleData] = useState<PeoplesData>([])
	const [page, setPage] = useState(1)
	const get = async () => {
		setLoading(true)
		setError(null)
		try {
			const res: PaginationData = await SWAPI.getPeople()
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

	const handlePrevPage = () => {
		setPage(prevValue => prevValue - 1)
	}
	const handleNextPage = () => {
		setPage(prevValue => prevValue + 1)
	}

	useEffect(() => {
		get()
	}, [])

	return (
		<>
			<h1>People</h1>
			<InputForm/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}

			{resData && peopleData && (
				<>
					<p>Showing {resData.from} to {resData.to} of {resData.total} from the People Resource</p>

					<ListGroup className='mb-3'>
						<PeopleList data={peopleData}/>
					</ListGroup>

					<Pagination resData={resData} onPrevPage={handlePrevPage} onNextPage={handleNextPage}/>
				</>
			)}

		</>
	)
}
export default People