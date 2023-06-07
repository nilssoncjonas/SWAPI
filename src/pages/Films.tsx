import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// Types
import {FilmPaginationData, FilmsData} from "../types"
// Components
import AutoAlert from "../components/AutoAlert.tsx"
import C_FilmsList from "../components/C_FilmsList.tsx"
import InputForm from "../components/InputForm.tsx"
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

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const page = searchParams.get('page')
	const get = async (page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res: FilmPaginationData = await SWAPI.getFilms(page)
			const data: FilmsData = res.data
			setResData(res)
			setFilmData(data)
			setSearchParams({page: page.toString()})
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const searchReq = async (query: string) => {

		const res = await SWAPI.searchFilms(query)
		setSearchParams({search: query, page: '1'})
		setResData(res)
		setFilmData(res.data)
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
			<h1>Films</h1>
			<InputForm onSearch={searchReq}/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && filmData && (
				<>
					<p>Showing {resData.from} to {resData.to} of total {resData.total} results from the Films resource</p>

					<ListGroup className='mb-3'>
						<C_FilmsList data={filmData}/>
					</ListGroup>

					<Pagination resData={resData}/>
				</>
			)}

		</>
	)
}
export default Films