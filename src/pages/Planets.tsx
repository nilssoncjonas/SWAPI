import InputForm from "../components/InputForm.tsx";
import {useEffect, useState} from "react";
import {PaginationData} from "../types";
import * as SWAPI from "../services/SWAPI-client.ts";
import {PlanetsData, PlanetsPaginationData} from "../types/planets";
import {Image} from "react-bootstrap";
import spinner from "../../public/rebel.svg";
import AutoAlert from "../components/AutoAlert.tsx";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "../components/Pagination.tsx";
import PlanetsList from "../components/PlanetsList.tsx";


const Planets = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<PlanetsPaginationData>({} as PlanetsPaginationData)
	const [planetsData, setPeopleData] = useState<PlanetsData>([])
	const [page, setPage] = useState(1)
	const get = async () => {
		setLoading(true)
		setError(null)
		try {
			const res: PaginationData = await SWAPI.getPlanets()
			const data: PlanetsData = res.data
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
			<h1>Planets</h1>
			<InputForm/>
			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}

			{resData && planetsData && (
				<>
					<p>Showing {resData.from} to {resData.to} of {resData.total} from the People Resource</p>

					<ListGroup className='mb-3'>
						<PlanetsList data={planetsData}/>
					</ListGroup>

					<Pagination resData={resData} onPrevPage={handlePrevPage} onNextPage={handleNextPage}/>
				</>
			)}
		</>
	)
}
export default Planets