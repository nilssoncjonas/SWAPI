import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// Types
import {FilmPaginationData, FilmsData} from "../types"
// Components
import AutoAlert from "../components/AutoAlert.tsx"
import InputForm from "../components/InputForm.tsx"
import C_FilmsList from "../components/C_FilmsList.tsx"
import Pagination from "../components/Pagination.tsx"
// Style
import spinner from "../../public/rebel.svg"
import ListGroup from "react-bootstrap/ListGroup"
import Image from "react-bootstrap/Image"


const Films = () => {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<FilmPaginationData>({} as FilmPaginationData)
	const [filmData, setFilmData] = useState<FilmsData>([])
	const [page, setPage] = useState(1)

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const get = async () => {
		setLoading(true)
		setError(null)
		try {
			const res: FilmPaginationData = await SWAPI.getFilms()
			const data: FilmsData = res.data
			setResData(res)
			setFilmData(data)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const searchReq = async (query: string) => {

		const res = await SWAPI.searchFilms(query)
		setPage(1)
		setSearchParams({search: query, page: page.toString()})
		setResData(res)
		setFilmData(res.data)
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
			<h1>Films</h1>
			<InputForm onSearch={searchReq}/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && filmData && (
				<>
					<p>Showing {resData.from} to {resData.to} of {resData.total} from the Films Resource</p>

					<ListGroup className='mb-3'>
						<C_FilmsList data={filmData}/>
					</ListGroup>

					<Pagination resData={resData} onPrevPage={handlePrevPage} onNextPage={handleNextPage}/>
				</>
			)}

		</>
	)
}
export default Films