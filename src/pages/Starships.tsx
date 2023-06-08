import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts";
// types
import {StarshipsPaginationData, StarshipsData,} from "../types";
// components
import AutoAlert from "../components/AutoAlert.tsx";
import C_Loading from "../components/C_Loading.tsx";
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
	const get = async (page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res: StarshipsPaginationData = await SWAPI.getStarships(page)
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
	}

	const searchReq = async (query: string) => {
		const res = await SWAPI.searchStarships(query)
		setSearchParams({search: query, page: '1'})
		setResData(res)
		setStarshipData(res.data)
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
			<h1>Starships</h1>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && starshipData && (
				<>
					<p>Showing {resData.from} to {resData.to} of total {resData.total} results from the Starships Resource</p>

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