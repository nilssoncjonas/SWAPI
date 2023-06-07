import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {TSinglePeople} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Films from "../components/C_Films.tsx"
import C_Species from "../components/C_Species.tsx"
import C_Starships from "../components/C_Starships.tsx"
import C_Vehicles from "../components/C_Vehicles.tsx"
import InputForm from "../components/InputForm.tsx"
// style
import spinner from "../../public/rebel.svg"
import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"
import ListGroup from "react-bootstrap/ListGroup"


const SinglePeople = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [personData, setPersonData] = useState<TSinglePeople | null>(null)
	const {id} = useParams()
	const personId = Number(id)

	const get = async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const res: TSinglePeople = await SWAPI.getSinglePeople(id)
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
								<C_Films films={personData.films}/>
							</ListGroup>
						</div>
						{personData.species && (
							<div>
								<h3 className='mx-auto text-center'>Species</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Species species={personData.species}/>
								</ListGroup>
							</div>
						)}
						<div>
							<h3 className='mx-auto text-center'>Starships</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Starships starships={personData.starships}/>
							</ListGroup>
						</div>
						<div>
							<h3 className='mx-auto text-center'>Vehicles</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Vehicles vehicles={personData.vehicles}/>
							</ListGroup>
						</div>
					</Container>
				</div>
			)}

		</>
	)
}
export default SinglePeople