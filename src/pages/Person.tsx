import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Person} from "../types/peoples"
import * as SWAPI from "../services/SWAPI-client.ts"
import Image from "react-bootstrap/Image"
import spinner from "../../public/rebel.svg"
import AutoAlert from "../components/AutoAlert.tsx"
import InputForm from "../components/InputForm.tsx"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Starships from "../components/Starships.tsx"
import Vehicles from "../components/Vehicles.tsx"
import Films from "../components/Films.tsx"
import Species from "../components/Species.tsx"


const SinglePerson = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [personData, setPersonData] = useState<Person | null>(null)
	const {id} = useParams()
	const personId = Number(id)

	const get = async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const res: Person = await SWAPI.getPerson(id)
			setPersonData(res)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}


	useEffect(() => {
		get(personId)

	}, [personId])
	return (
		<>
			<InputForm/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{personData && (
				<div className='mb-4'>
					<h1>{personData.name}</h1>
					<h2 className='h3'>Home World: {personData.homeworld.name}</h2>

					<p className="d-flex justify-content-between align-items-center">
						<span className='h6 d-block'>Birth Year: {personData.birth_year}</span>
						<span className='h6 d-block'>Eye color: {personData.eye_color}</span>
						<span className='h6 d-block'>Hair color: {personData.hair_color}</span>
						<span className='h6 d-block'>Height: {personData.height} cm</span>
						<span className='h6 d-block'>Mass: {personData.mass}</span>
						<span className='h6 d-block'>Skin color: {personData.skin_color}</span>
					</p>

					<Container>
						<div>
							<h3 className='mx-auto text-center'>Films</h3>
							<ListGroup className='mb-3 mx-auto'>
								<Films films={personData.films}/>
							</ListGroup>
						</div>
						{personData.species && (
							<div>
								<h3 className='mx-auto text-center'>Species</h3>
								<ListGroup className='mb-3 mx-auto'>
									<Species species={personData.species}/>
								</ListGroup>
							</div>
						)}
						<div>
							<h3 className='mx-auto text-center'>Starships</h3>
							<ListGroup className='mb-3 mx-auto'>
								<Starships starships={personData.starships}/>
							</ListGroup>
						</div>
						<div>
							<h3 className='mx-auto text-center'>Vehicles</h3>
							<ListGroup className='mb-3 mx-auto'>
								<Vehicles vehicles={personData.vehicles}/>
							</ListGroup>
						</div>
					</Container>
				</div>
			)}

		</>
	)
}
export default SinglePerson