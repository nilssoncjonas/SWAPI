import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Planet} from "../types/planets"
import * as SWAPI from "../services/SWAPI-client.ts"
import Image from "react-bootstrap/Image"
import spinner from "../../public/rebel.svg"
import AutoAlert from "../components/AutoAlert.tsx"
import InputForm from "../components/InputForm.tsx"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Films from "../components/Films.tsx"
import Characters from "../components/Characters.tsx";


const SinglePlanets = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [planetData, setPlanetData] = useState<Planet | null>(null)
	const {id} = useParams()
	const planetId = Number(id)

	const get = async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const res: Planet = await SWAPI.getPlanet(id)
			setPlanetData(res)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}


	useEffect(() => {
		get(planetId)

	}, [planetId])
	return (
		<>
			<InputForm/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{planetData && (
				<div className='mb-4'>
					<h1>{planetData.name}</h1>

					<p className="d-flex justify-content-between align-items-center">
						<span className='h6 d-block'>Rotation period: {planetData.rotation_period}</span>
						<span className='h6 d-block'>Orbital period: {planetData.orbital_period}</span>
						<span className='h6 d-block'>Diameter: {planetData.diameter}</span>
						<span className='h6 d-block'>Climate: {planetData.climate}</span>
						<span className='h6 d-block'>Gravity: {planetData.gravity}</span>
						<span className='h6 d-block'>Terrain: {planetData.terrain}</span>
						<span className='h6 d-block'>Surface water: {planetData.surface_water}</span>
						<span className='h6 d-block'>Population: {planetData.population}</span>
					</p>

					<Container>
						<div>
							<h3 className='mx-auto text-center'>Residents</h3>
							<ListGroup className='mb-3 mx-auto'>
								<Characters people={planetData.residents}/>
							</ListGroup>
						</div>
						<div>
							<h3 className='mx-auto text-center'>Film</h3>
							<ListGroup className='mb-3 mx-auto'>
								<Films films={planetData.films}/>
							</ListGroup>
						</div>
					</Container>
				</div>
			)}

		</>
	)
}
export default SinglePlanets