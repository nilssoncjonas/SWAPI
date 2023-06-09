import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {SpeciesData, SpeciesPaginationData} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Loading from "../components/C_Loading.tsx";
import C_SpeciesList from "../components/C_SpeciesList.tsx"
import InputForm from "../components/InputForm.tsx"
import Pagination from "../components/Pagination.tsx"
// style
import ListGroup from "react-bootstrap/ListGroup"

const Species = () => {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<SpeciesPaginationData>({} as SpeciesPaginationData)
	const [speciesData, setSpeciesData] = useState<SpeciesData>([])

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const page = searchParams.get('page')
	const get = async (page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<SpeciesPaginationData>(`species/?pages=${page}`)
			const data: SpeciesData = res.data
			setResData(res)
			setSpeciesData(data)
			setSearchParams({page: page.toString()})
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	const searchReq = async (query: string) => {
		const res = await SWAPI.get<SpeciesPaginationData>(`species/?pages=1&search=${query}`)
		setSearchParams({search: query, page: '1'})
		setResData(res)
		setSpeciesData(res.data)
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
			<h1>Species</h1>
			<InputForm onSearch={searchReq}/>
			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}

			{resData && speciesData && (
				<>
					<p>Showing {resData.from} to {resData.to} of {resData.total} from the Species Resource</p>

					<ListGroup className='mb-3'>
						<C_SpeciesList data={speciesData}/>
					</ListGroup>

					<Pagination resData={resData}/>
				</>
			)}
		</>
	)
}
export default Species