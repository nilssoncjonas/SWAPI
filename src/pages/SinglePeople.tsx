import {useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
// Hooks
import useGetData from "../hooks/useGetData.ts"
// types
import {TSinglePeople} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Films from "../components/C_Films.tsx"
import C_Loading from "../components/C_Loading.tsx"
import C_Species from "../components/C_Species.tsx"
import C_Starships from "../components/C_Starships.tsx"
import C_Vehicles from "../components/C_Vehicles.tsx"
// style
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Button from 'react-bootstrap/Button'


const SinglePeople = () => {
const navigate = useNavigate()
	const {id} = useParams()
	const personId = Number(id)

	const {
		resData,
		error,
		isError,
		isLoading,
		execute,
	} = useGetData<TSinglePeople>(`people/${personId}`)

	useEffect(() => {
		execute
	}, [execute])
	return (
		<>

			{isLoading && <C_Loading/>}

			{isError && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && (
				<div className='mb-4'>
					<Button className='m-2' onClick={() => navigate(-1)}>Back</Button>
					<h1 className='m-2'>{resData.name}</h1>
					<Container>
						<h2 className='h3'>Home World: {resData.homeworld.name}</h2>
						<ListGroup className='mb-3 mx-auto'>
							<ListGroupItem>
								Birth Year: {resData.birth_year}
							</ListGroupItem>
							<ListGroupItem>
								Eye color: {resData.eye_color}
							</ListGroupItem>
							<ListGroupItem>
								Hair color: {resData.hair_color}
							</ListGroupItem>
							<ListGroupItem>
								Height: {resData.height} GSH, <span
								className='small text-muted fst-italic'>Galactic Standard Height</span>
							</ListGroupItem>
							<ListGroupItem>
								Mass: {resData.mass} GMU, <span className='small text-muted fst-italic'>Galactic Mass Unit</span>
							</ListGroupItem>
							<ListGroupItem>
								Skin color: {resData.skin_color}
							</ListGroupItem>
						</ListGroup>

						<div className='mb-4'>
							<h3
								className='mx-auto text-center'>{resData.films.length} {resData.films.length > 1 ? 'Films' : 'Film'}</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Films films={resData.films}/>
							</ListGroup>
						</div>
						{resData.species.length > 0 && (
							<div className='mb-4'>
								<h3 className='mx-auto text-center'>{resData.species.length} Species</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Species species={resData.species}/>
								</ListGroup>
							</div>
						)}
						{resData.starships.length > 0 && (
							<div className='mb-4'>
								<h3
									className='mx-auto text-center'>{resData.starships.length} {resData.starships.length > 1 ? 'Starships' : 'Starship'}</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Starships starships={resData.starships}/>
								</ListGroup>
							</div>
						)}
						{resData.vehicles.length > 0 && (
							<div className='mb-4'>
								<h3
									className='mx-auto text-center'>{resData.vehicles.length} {resData.vehicles.length > 1 ? 'Vehicles' : 'Vehicle'}</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Vehicles vehicles={resData.vehicles}/>
								</ListGroup>
							</div>
						)}
					</Container>
				</div>
			)}

		</>
	)
}
export default SinglePeople