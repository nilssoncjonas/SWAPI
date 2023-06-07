import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {PlanetsPaginationData, PlanetsData} from "../types"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import InputForm from "../components/InputForm.tsx"
import Pagination from "../components/Pagination.tsx"
import C_PlanetsList from "../components/C_PlanetsList.tsx"
// style
import spinner from "../../public/rebel.svg"
import Image from "react-bootstrap/Image"
import ListGroup from "react-bootstrap/ListGroup"


const Planets = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<PlanetsPaginationData>({} as PlanetsPaginationData)
	const [planetsData, setPlanetsData] = useState<PlanetsData>([])
	const [page, setPage] = useState(1)

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const get = async () => {
		setLoading(true)
		setError(null)
		try {
			const res: PlanetsPaginationData = await SWAPI.getPlanets()
			const data: PlanetsData = res.data
			setResData(res)
			setPlanetsData(data)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	const searchReq = async (query: string) => {
		const res = await SWAPI.searchPlanets(query)
		setPage(1)
		setSearchParams({search: query, page: page.toString()})
		setResData(res)
		setPlanetsData(res.data)
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
			<h1>Planets</h1>
			<InputForm onSearch={searchReq}/>
			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}

			{resData && planetsData && (
				<>
					<p>Showing {resData.from} to {resData.to} of {resData.total} from the People Resource</p>

					<ListGroup className='mb-3'>
						<C_PlanetsList data={planetsData}/>
					</ListGroup>

					<Pagination resData={resData} onPrevPage={handlePrevPage} onNextPage={handleNextPage}/>
				</>
			)}
		</>
	)
}
export default Planets