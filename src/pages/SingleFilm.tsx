import {useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
// Hooks
import useGetData from "../hooks/useGetData.ts"
// types
import {TSingleFilm,} from "../types"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Characters from "../components/C_Characters.tsx"
import C_Loading from "../components/C_Loading.tsx"
import C_Planets from "../components/C_Planets.tsx"
import C_Species from "../components/C_Species.tsx"
import C_Starships from "../components/C_Starships.tsx"
import C_Vehicles from "../components/C_Vehicles.tsx"

// style
import ListGroup from "react-bootstrap/ListGroup"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button";

const SingleFilm = () => {
	const navigate = useNavigate()
	const {id} = useParams()
	const filmId = Number(id)

	const {
		resData,
		error,
		isError,
		isLoading,
		execute,
	} = useGetData<TSingleFilm>(`films/${filmId}`)

	useEffect(() => {
		execute
	}, [execute])
	return (
		<>

			{isLoading && <C_Loading/>}

			{isError && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && (
				<div className='mb-4'>
					<Button className='m-2' onClick={() => navigate('/films?page=1')}>Back</Button>
					<h1 className='my-2'>{resData.title}</h1>
					<h2 className='h3'>Episode {resData.episode_id}</h2>
					<p className='mb-5'>
						{resData.opening_crawl}
					</p>
					<p className='d-flex justify-content-between mb-3'>
						<span className='h6'>Released: {resData.release_date}</span>
						<span className='h6'>Directed by: {resData.director}</span>
						<span className='h6'>Produced by: {resData.producer}</span>
					</p>
					<Container>
						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{resData.characters.length} Characters</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Characters people={resData.characters}/>
							</ListGroup>
						</div>
						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{resData.planets.length} Planets</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Planets planets={resData.planets}/>
							</ListGroup>
						</div>
						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{resData.starships.length} Starships</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Starships starships={resData.starships}/>
							</ListGroup>
						</div>
						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{resData.vehicles.length} Vehicles</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Vehicles vehicles={resData.vehicles}/>
							</ListGroup>
						</div>
						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{resData.starships.length} Species</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Species species={resData.species}/>
							</ListGroup>
						</div>

					</Container>
				</div>
			)}
		</>
	)
}
export default SingleFilm
