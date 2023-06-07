import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts";
// types
import {TSingleVehicles} from "../types";
// components
import AutoAlert from "../components/AutoAlert.tsx";
import InputForm from "../components/InputForm.tsx";
import C_Characters from "../components/C_Characters.tsx";
import C_Films from "../components/C_Films.tsx";
// style
import spinner from "../../public/rebel.svg";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

const SingleVehicles = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [vehiclesData, setVehiclesData] = useState<TSingleVehicles | null>(null)
	const {id} = useParams()
	const vehiclesId = Number(id)

	const get = async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const res: TSingleVehicles = await SWAPI.getSingleVehicles(id)
			setVehiclesData(res)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		get(vehiclesId)
	}, [vehiclesId])

	return (
		<>
			<InputForm/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{vehiclesData && (
				<div className='mb-4'>
					<h1>{vehiclesData.name}</h1>
					<h2 className='h3'>{vehiclesData.manufacturer} {vehiclesData.model}</h2>
					<p>
						<span className='h6 d-block'>Vehicle class: {vehiclesData.vehicle_class}</span>
						<span className='h6 d-block'>Cost in credits: {vehiclesData.cost_in_credits}</span>
						<span className='h6 d-block'>Length: {vehiclesData.length}</span>
						<span className='h6 d-block'>Crew: {vehiclesData.crew}</span>
						<span className='h6 d-block'>Passengers: {vehiclesData.passengers}</span>
						<span className='h6 d-block'>Max atmosphering speed: {vehiclesData.max_atmosphering_speed}</span>
						<span className='h6 d-block'>Cargo capacity: {vehiclesData.cargo_capacity}</span>
						<span className='h6 d-block'>Consumables: {vehiclesData.consumables}</span>
					</p>
					<Container>
						<div>
							<h3 className='mx-auto text-center'>Pilots</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Characters people={vehiclesData.pilots}/>
							</ListGroup>
						</div>
						<div>
							<h3 className='mx-auto text-center'>Films</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Films films={vehiclesData.films}/>
							</ListGroup>
						</div>
					</Container>
				</div>
			)}
		</>
	)
}
export default SingleVehicles