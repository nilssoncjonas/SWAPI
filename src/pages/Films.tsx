import {useCallback, useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// Types
import {FilmPaginationData, FilmsData} from "../types"
// Components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Loading from "../components/C_Loading.tsx";
import C_FilmsList from "../components/C_FilmsList.tsx"
import C_SearchResultData from "../components/C_SearchResultData.tsx";
import C_zeroResults from "../components/C_zeroResults.tsx";
import InputForm from "../components/InputForm.tsx"
import Pagination from "../components/Pagination.tsx"
// Style
import ListGroup from "react-bootstrap/ListGroup"

const Films = () => {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<FilmPaginationData>({} as FilmPaginationData)
	const [filmData, setFilmData] = useState<FilmsData>([])

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const page = searchParams.get('page')

	const get = useCallback(async (page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<FilmPaginationData>(`films/?page=${page}`)
			const data: FilmsData = res.data
			setResData(res)
			setFilmData(data)
			setSearchParams({page: page.toString()})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}, [setSearchParams])

	const searchReq = useCallback(async (query: string, page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<FilmPaginationData>(`films/?page=${page}&search=${query}`)
			setSearchParams({search: query, page: page.toString()})
			setResData(res)
			setFilmData(res.data)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}

	}, [setSearchParams])

	useEffect(() => {
		if (query && page) {
			searchReq(query, Number(page))
		} else {
			get(Number(page))
		}
	}, [query, page, get, searchReq])

	return (
		<>
			<h1>Films</h1>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && filmData && (
				<>
					{filmData.length === 0 && <C_zeroResults query={query}/>}
					{filmData.length > 0 && (
						<C_SearchResultData query={query} from={resData.from} to={resData.to} total={resData.total}
																resource={'Films'}/>
					)}
					<ListGroup className='mb-3'>
						<C_FilmsList data={filmData}/>
					</ListGroup>

					{resData.first_page_url && <Pagination resData={resData}/>}
				</>
			)}

		</>
	)
}
export default Films