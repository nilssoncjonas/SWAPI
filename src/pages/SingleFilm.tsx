import {useEffect, useState} from "react"
import {useNavigate, useParams, useSearchParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {TSingleFilm} from "../types"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Characters from "../components/C_Characters.tsx"
import C_Loading from "../components/C_Loading.tsx";
import C_Planets from "../components/C_Planets.tsx"
import C_Species from "../components/C_Species.tsx"
import C_Starships from "../components/C_Starships.tsx"
import C_Vehicles from "../components/C_Vehicles.tsx"
import InputForm from "../components/InputForm.tsx"
// style
import ListGroup from "react-bootstrap/ListGroup"
import Container from "react-bootstrap/Container"

const SingleFilm = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [filmData, setFilmData] = useState<TSingleFilm | null>(null)
	const {id} = useParams()
	const filmId = Number(id)

	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [,setSearchParams] = useSearchParams();
	const get = async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<TSingleFilm>(`films/${id}`)
			setFilmData(res)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	const searchReq = async (query: string) => {
		setPage(1)
		setSearchParams( {search: query, page: page.toString()})
		navigate(`/films/?page=1&search=${query}`)
	}

	useEffect(() => {
		get(filmId)

	}, [filmId])
	return (
		<>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{filmData && (
				<div className='mb-4'>
					<h1>{filmData.title}</h1>
					<h2 className='h3'>Episode {filmData.episode_id}</h2>
					<p className='mb-5'>
						{filmData.opening_crawl}
					</p>
					<p className='d-flex justify-content-between mb-3'>
						<span className='h6'>Released: {filmData.release_date}</span>
						<span className='h6'>Directed by: {filmData.director}</span>
						<span className='h6'>Produced by: {filmData.producer}</span>
					</p>
					<Container>
						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{filmData.characters.length} Characters</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Characters people={filmData.characters}/>
							</ListGroup>
						</div>
						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{filmData.planets.length} Planets</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Planets planets={filmData.planets}/>
							</ListGroup>
						</div>
						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{filmData.starships.length} Starships</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Starships starships={filmData.starships}/>
							</ListGroup>
						</div>
						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{filmData.vehicles.length} Vehicles</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Vehicles vehicles={filmData.vehicles}/>
							</ListGroup>
						</div>
						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{filmData.starships.length} Species</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Species species={filmData.species}/>
							</ListGroup>
						</div>

					</Container>
				</div>
			)}
		</>
	)
}
export default SingleFilm
