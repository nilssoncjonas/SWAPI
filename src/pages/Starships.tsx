import {useEffect, useState} from "react";
import * as SWAPI from "../services/SWAPI-client.ts";
// types
import {StarshipsPaginationData, StarshipsData, } from "../types";
// components
import AutoAlert from "../components/AutoAlert.tsx";
import C_StarshipsList from "../components/C_StarshipsList.tsx";
import InputForm from "../components/InputForm.tsx";
import Pagination from "../components/Pagination.tsx";
// style
import spinner from "../../public/rebel.svg";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";

const Starships = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<StarshipsPaginationData>({} as StarshipsPaginationData)
	const [starshipData, setStarshipData] = useState<StarshipsData>([])
	const [page, setPage] = useState(1)

	const get = async () => {
		setLoading(true)
		setError(null)
		try {
			const res: StarshipsPaginationData = await SWAPI.getStarships()
			const data: StarshipsData = res.data
			setResData(res)
			setStarshipData(data)
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
			<h1>Starships</h1>
			<InputForm />

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && starshipData && (
				<>
					<p>Showing {resData.from} to {resData.to} of {resData.total} from the Films Resource</p>

					<ListGroup className='mb-3'>
						<C_StarshipsList data={starshipData}/>
					</ListGroup>

					<Pagination resData={resData} onPrevPage={handlePrevPage} onNextPage={handleNextPage}/>
				</>
			)}
		</>
	)
}
export default Starships