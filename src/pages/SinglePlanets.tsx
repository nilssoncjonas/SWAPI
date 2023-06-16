import {useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
// Hooks
import useGetData from "../hooks/useGetData.ts"
// types
import {TSinglePlanet} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Characters from "../components/C_Characters.tsx"
import C_Loading from "../components/C_Loading.tsx"
import Films from "../components/C_Films.tsx"
// style
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Button from "react-bootstrap/Button"

const SinglePlanets = () => {
	const navigate = useNavigate()
	const {id} = useParams()
	const planetId = Number(id)

	const {
		resData,
		error,
		isError,
		isLoading,
		execute,
	} = useGetData<TSinglePlanet>(`planets/${planetId}`)

	useEffect(() => {
		execute
	}, [execute])
	return (
		<>

			{isLoading && <C_Loading/>}

			{isError && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && (
				<div className='mb-4'>
					<Button className='m-2' onClick={() => navigate('/planets?page=1')}>Back</Button>
					<h1 className='my-2'>{resData.name}</h1>
					<Container>

						<ListGroup className='mb-4 mx-auto'>
							<ListGroupItem>Rotation period: {resData.rotation_period}</ListGroupItem>
							<ListGroupItem>Orbital period: {resData.orbital_period}</ListGroupItem>
							<ListGroupItem>Diameter: {resData.diameter}</ListGroupItem>
							<ListGroupItem>Climate: {resData.climate}</ListGroupItem>
							<ListGroupItem>Gravity: {resData.gravity}</ListGroupItem>
							<ListGroupItem>Terrain: {resData.terrain}</ListGroupItem>
							<ListGroupItem>Surface water: {resData.surface_water}</ListGroupItem>
							<ListGroupItem>Population: {resData.population === 'unknown' ? 'unknown' : Number(resData.population).toLocaleString()}</ListGroupItem>
						</ListGroup>


						{resData.residents.length > 0 && (
							<div className='mb-4'>

								<h3
									className='mx-auto text-center'>{resData.residents.length} {resData.residents.length > 1 ? 'Residents' : 'Resident'}</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Characters people={resData.residents}/>
								</ListGroup>
							</div>
						)}
						{resData.films.length > 0 && (
							<div className='mb-4'>
								<h3
									className='mx-auto text-center'>{resData.films.length} {resData.films.length > 1 ? 'Films' : 'Film'}</h3>
								<ListGroup className='mb-3 mx-auto'>
									<Films films={resData.films}/>
								</ListGroup>
							</div>
						)}
					</Container>
				</div>
			)}

		</>
	)
}
export default SinglePlanets