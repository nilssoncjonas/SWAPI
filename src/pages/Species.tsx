import InputForm from "../components/InputForm.tsx";
import {useEffect, useState} from "react";
import * as SWAPI from "../services/SWAPI-client.ts";
// types
import {SpeciesData, SpeciesPaginationData} from "../types/species";
// components
import AutoAlert from "../components/AutoAlert.tsx";
import Pagination from "../components/Pagination.tsx";
import C_SpeciesList from "../components/C_SpeciesList.tsx";
// style
import spinner from "../../public/rebel.svg";
import {Image} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

const Species = () => {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<SpeciesPaginationData>({} as SpeciesPaginationData)
	const [speciesData, setSpeciesData] = useState<SpeciesData>([])
	const [page, setPage] = useState(1)
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
			<h1>Species</h1>
			<InputForm/>
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