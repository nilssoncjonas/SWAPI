import {useCallback, useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {PlanetsPaginationData, PlanetsData} from "../types"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Loading from "../components/C_Loading.tsx";
import C_PlanetsList from "../components/C_PlanetsList.tsx"
import C_SearchResultData from "../components/C_SearchResultData.tsx";
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

	const get = useCallback( async (page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<PlanetsPaginationData>(`planets/?page=${page}`)
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
	}, [setSearchParams])

	const searchReq = useCallback( async (query: string) => {
		const res = await SWAPI.get<PlanetsPaginationData>(`planets/?page=1&search=${query}`)
		setSearchParams({search: query, page: '1'})
		setResData(res)
		setPlanetsData(res.data)
		console.log(planetsData)
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
			<h1>Planets</h1>
			<InputForm onSearch={searchReq}/>
			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}

			{resData && planetsData && (
				<>
					{planetsData.length === 0 && (
						<p>Didin't find anything for <span className='fst-italic fw-bold'>{query}</span>, I sense a disturbance in
							your typing!</p>
					)}
					{planetsData.length > 0 && (
						<C_SearchResultData query={query} from={resData.from} to={resData.to} total={resData.total} resource={'Planets'}/>
					)}

					<ListGroup className='mb-3'>
						<C_PlanetsList data={planetsData}/>
					</ListGroup>

					{resData.first_page_url && <Pagination resData={resData}/>}
				</>
			)}
		</>
	)
}
export default Planets