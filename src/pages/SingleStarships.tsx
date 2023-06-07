import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts";
// types
import {TSingleStarships} from "../types";
// components
import AutoAlert from "../components/AutoAlert.tsx";
import C_Characters from "../components/C_Characters.tsx";
import C_Films from "../components/C_Films.tsx";
import InputForm from "../components/InputForm.tsx";
// style
import spinner from "../../public/rebel.svg";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

const SingleStarships = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [starshipsData, setStarshipsData] = useState<TSingleStarships | null>(null)
	const {id} = useParams()
	const starshipId = Number(id)

	const get = async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const res: TSingleStarships = await SWAPI.getSingleStarships(id)
			setStarshipsData(res)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		get(starshipId)
	}, [starshipId])

	return (
		<>
			<InputForm/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{starshipsData && (
				<div className='mb-4'>
					<h1>{starshipsData.name}</h1>
					<h2 className='h3'>{starshipsData.manufacturer} {starshipsData.model}</h2>
					<p>
						<span className='h6 d-block'>Starship class: {starshipsData.starship_class}</span>
						<span className='h6 d-block'>Cost in credits: {starshipsData.cost_in_credits}</span>
						<span className='h6 d-block'>Length: {starshipsData.length}</span>
						<span className='h6 d-block'>Crew: {starshipsData.crew}</span>
						<span className='h6 d-block'>Passengers: {starshipsData.passengers}</span>
						<span className='h6 d-block'>Max atmosphering speed: {starshipsData.max_atmosphering_speed}</span>
						<span className='h6 d-block'>Hyperdrive rating: {starshipsData.hyperdrive_rating}</span>
						<span className='h6 d-block'>MGLT: {starshipsData.MGLT}</span>
						<span className='h6 d-block'>Cargo capacity: {starshipsData.cargo_capacity}</span>
						<span className='h6 d-block'>Consumables: {starshipsData.consumables}</span>
					</p>
					<Container>
						<div>
							<h3 className='mx-auto text-center'>Pilots</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Characters people={starshipsData.pilots}/>
							</ListGroup>
						</div>
						<div>
							<h3 className='mx-auto text-center'>Films</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Films films={starshipsData.films}/>
							</ListGroup>
						</div>
					</Container>
				</div>
			)}
		</>
	)
}
export default SingleStarships