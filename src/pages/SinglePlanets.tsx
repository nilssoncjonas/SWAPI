import {useEffect, useState} from "react"
import {useNavigate, useParams, useSearchParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {TSinglePlanet} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Characters from "../components/C_Characters.tsx"
import C_Loading from "../components/C_Loading.tsx";
import Films from "../components/C_Films.tsx"
import InputForm from "../components/InputForm.tsx"
// style
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import {ListGroupItem} from "react-bootstrap";


const SinglePlanets = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [planetData, setPlanetData] = useState<TSinglePlanet | null>(null)
	const {id} = useParams()
	const planetId = Number(id)

	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [searchParams, setSearchParams] = useSearchParams();
	const get = async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<TSinglePlanet>(`planets/${id}`)
			setPlanetData(res)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	const searchReq = async (query: string) => {
		setPage(1)
		setSearchParams({search: query, page: page.toString()})
		navigate(`/planets/?search=${query}&page=1`)
	}


	useEffect(() => {
		get(planetId)

	}, [planetId])
	return (
		<>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{planetData && (
				<div className='mb-4'>
					<h1>{planetData.name}</h1>
					<Container>

						<ListGroup className='mb-4 mx-auto'>
							<ListGroupItem>Rotation period: {planetData.rotation_period}</ListGroupItem>
							<ListGroupItem>Orbital period: {planetData.orbital_period}</ListGroupItem>
							<ListGroupItem>Diameter: {planetData.diameter}</ListGroupItem>
							<ListGroupItem>Climate: {planetData.climate}</ListGroupItem>
							<ListGroupItem>Gravity: {planetData.gravity}</ListGroupItem>
							<ListGroupItem>Terrain: {planetData.terrain}</ListGroupItem>
							<ListGroupItem>Surface water: {planetData.surface_water}</ListGroupItem>
							<ListGroupItem>Population: {planetData.population === 'unknown' ? 'unknown' : Number(planetData.population).toLocaleString()}</ListGroupItem>
						</ListGroup>


						{planetData.residents.length > 0 && (
							<div className='mb-4'>

								<h3 className='mx-auto text-center'>Residents</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Characters people={planetData.residents}/>
								</ListGroup>
							</div>
						)}
						{planetData.films.length > 0 && (
							<div className='mb-4'>
								<h3 className='mx-auto text-center'>Films</h3>
								<ListGroup className='mb-3 mx-auto'>
									<Films films={planetData.films}/>
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