import InputForm from "../components/InputForm.tsx"
import {useEffect, useState} from "react"
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {SpeciesData, SpeciesPaginationData} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_SpeciesList from "../components/C_SpeciesList.tsx"
import Pagination from "../components/Pagination.tsx"
// style
import spinner from "../../public/rebel.svg"
import Image from "react-bootstrap/Image"
import ListGroup from "react-bootstrap/ListGroup"
import {useSearchParams} from "react-router-dom";

const Species = () => {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<SpeciesPaginationData>({} as SpeciesPaginationData)
	const [speciesData, setSpeciesData] = useState<SpeciesData>([])
	const [page, setPage] = useState(1)

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const get = async () => {
		setLoading(true)
		setError(null)
		try {
			const res: SpeciesPaginationData = await SWAPI.getSpecies()
			const data: SpeciesData = res.data
			setResData(res)
			setSpeciesData(data)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	const searchReq = async (query: string) => {
		const res = await SWAPI.searchSpecies(query)
		setPage(1)
		setSearchParams({search: query, page: page.toString()})
		setResData(res)
		setSpeciesData(res.data)
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
			<h1>Species</h1>
			<InputForm onSearch={searchReq}/>
			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={7} variant='danger' msg={error}/>}

			{resData && speciesData && (
				<>
					<p>Showing {resData.from} to {resData.to} of {resData.total} from the Species Resource</p>

					<ListGroup className='mb-3'>
						<C_SpeciesList data={speciesData}/>
					</ListGroup>

					<Pagination resData={resData} onPrevPage={handlePrevPage} onNextPage={handleNextPage}/>
				</>
			)}
		</>
	)
}
export default Species