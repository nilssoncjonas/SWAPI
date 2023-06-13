import {useCallback, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts";
// types
import {StarshipsPaginationData, StarshipsData,} from "../types";
// components
import AutoAlert from "../components/AutoAlert.tsx";
import C_Loading from "../components/C_Loading.tsx";
import C_SearchResultData from "../components/C_SearchResultData.tsx";
import C_StarshipsList from "../components/C_StarshipsList.tsx";
import InputForm from "../components/InputForm.tsx";
import Pagination from "../components/Pagination.tsx";
// style
import ListGroup from "react-bootstrap/ListGroup";

const Starships = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<StarshipsPaginationData>({} as StarshipsPaginationData)
	const [starshipData, setStarshipData] = useState<StarshipsData>([])

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const page = searchParams.get('page')
	const get = useCallback( async (page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<StarshipsPaginationData>(`starships/?pages=${page}`)
			const data: StarshipsData = res.data
			setResData(res)
			setStarshipData(data)
			setSearchParams({page: page.toString()})
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}, [setSearchParams])

	const searchReq = useCallback( async (query: string) => {
		const res = await SWAPI.get<StarshipsPaginationData>(`starships/?pages=1&search=${query}`)
		setSearchParams({search: query, page: '1'})
		setResData(res)
		setStarshipData(res.data)
	}, [setSearchParams])
	useEffect(() => {
		if (query) {
			searchReq(query)
		} else if (page) {
			get(Number(page))
		} else
			get()
	}, [query, page, get, searchReq])

	return (
		<>
			<h1>Starships</h1>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && starshipData && (
				<>
					{starshipData.length === 0 && (
						<p>Didin't find anything for <span className='fst-italic fw-bold'>{query}</span>, I sense a disturbance in
							your typing!</p>
					)}
					{starshipData.length > 0 && (
						<C_SearchResultData query={query} from={resData.from} to={resData.to} total={resData.total} resource={'Starships'}/>
					)}
					<ListGroup className='mb-3'>
						<C_StarshipsList data={starshipData}/>
					</ListGroup>

					<Pagination resData={resData}/>
				</>
			)}
		</>
	)
}
export default Starships