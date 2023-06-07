import * as SWAPI from "../services/SWAPI-client.ts"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
// types
import {TSingleFilm} from "../types"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Characters from "../components/C_Characters.tsx"
import C_Planets from "../components/C_Planets.tsx"
import C_Species from "../components/C_Species.tsx"
import C_Starships from "../components/C_Starships.tsx"
import C_Vehicles from "../components/C_Vehicles.tsx"
import InputForm from "../components/InputForm.tsx"
// style
import spinner from "../../public/rebel.svg"
import Image from "react-bootstrap/Image"
import ListGroup from "react-bootstrap/ListGroup"
import Container from "react-bootstrap/Container"

const SingleFilm = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [filmData, setFilmData] = useState<TSingleFilm | null>(null)
	const {id} = useParams()
	const filmId = Number(id)
	const get = async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const res: TSingleFilm = await SWAPI.getSingleFilm(id)
			setFilmData(res)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		get(filmId)

	}, [filmId])
	return (
		<>
			<InputForm/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{filmData && (
				<div className='mb-4'>
					<h1>{filmData.title}</h1>
					<h2 className='h3'>Episode {filmData.episode_id}</h2>
					<p>
						{filmData.opening_crawl}
					</p>
					<p>
						<span className='h6 d-block'>Released: {filmData.release_date}</span>
						<span className='h6 d-block'>Directed by: {filmData.director}</span>
						<span className='h6 d-block'>Produced by: {filmData.producer}</span>
					</p>
					<Container>
						<div>
							<h3 className='mx-auto text-center'>Characters</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Characters people={filmData.characters}/>
							</ListGroup>
						</div>
						<div>
							<h3 className='mx-auto text-center'>Planets</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Planets planets={filmData.planets}/>
							</ListGroup>
						</div>
						<div>
							<h3 className='mx-auto text-center'>Starships</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Starships starships={filmData.starships}/>
							</ListGroup>
						</div>
						<div>
							<h3 className='mx-auto text-center'>Vehicles</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Vehicles vehicles={filmData.vehicles}/>
							</ListGroup>
						</div>
						<div>
							<h3 className='mx-auto text-center'>Species</h3>
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
