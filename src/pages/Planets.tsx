import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {PlanetsPaginationData, PlanetsData} from "../types"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Loading from "../components/C_Loading.tsx";
import C_PlanetsList from "../components/C_PlanetsList.tsx"
import InputForm from "../components/InputForm.tsx"
import Pagination from "../components/Pagination.tsx"
// style
import ListGroup from "react-bootstrap/ListGroup"


const Planets = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<PlanetsPaginationData>({} as PlanetsPaginationData)
	const [planetsData, setPlanetsData] = useState<PlanetsData>([])

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const page = searchParams.get('page')
	const get = async (page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<PlanetsPaginationData>(`planets/?pages=${page}`)
			const data: PlanetsData = res.data
			setResData(res)
			setPlanetsData(data)
			setSearchParams({page: page.toString()})
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	const searchReq = async (query: string) => {
		const res = await SWAPI.get<PlanetsPaginationData>(`planets/?page=1&search=${query}`)
		setSearchParams({search: query, page: '1'})
		setResData(res)
		setPlanetsData(res.data)
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
			<h1>Planets</h1>
			<InputForm onSearch={searchReq}/>
			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}

			{resData && planetsData && (
				<>
					<p>Showing {resData.from} to {resData.to} of total {resData.total} results from the Planets Resource</p>

					<ListGroup className='mb-3'>
						<C_PlanetsList data={planetsData}/>
					</ListGroup>

					<Pagination resData={resData}/>
				</>
			)}
		</>
	)
}
export default Planets