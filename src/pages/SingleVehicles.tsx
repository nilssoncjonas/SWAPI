import {useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts";
// types
import {TSingleVehicles} from "../types";
// components
import AutoAlert from "../components/AutoAlert.tsx";
import C_Characters from "../components/C_Characters.tsx";
import C_Films from "../components/C_Films.tsx";
import C_Loading from "../components/C_Loading.tsx";
import InputForm from "../components/InputForm.tsx";
// style
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import {ListGroupItem} from "react-bootstrap";

const SingleVehicles = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [vehiclesData, setVehiclesData] = useState<TSingleVehicles | null>(null)
	const {id} = useParams()
	const vehiclesId = Number(id)

	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [searchParams, setSearchParams] = useSearchParams();

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
	const searchReq = async (query: string) => {
		setPage(1)
		setSearchParams({search: query, page: page.toString()})
		navigate(`/vehicles/?search=${query}&page=1`)
	}
	useEffect(() => {
		get(vehiclesId)
	}, [vehiclesId])

	return (
		<>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{vehiclesData && (
				<div className='mb-4'>
					<h1>{vehiclesData.name}</h1>
					<Container>
						<h2 className='h3'>{vehiclesData.manufacturer} {vehiclesData.model}</h2>
						<ListGroup className='mb-4 mx-auto'>
							<ListGroupItem>Vehicle class: {vehiclesData.vehicle_class}</ListGroupItem>
							<ListGroupItem>Cost in credits: {vehiclesData.cost_in_credits}</ListGroupItem>
							<ListGroupItem>Length: {vehiclesData.length}</ListGroupItem>
							<ListGroupItem>Crew: {vehiclesData.crew}</ListGroupItem>
							<ListGroupItem>Passengers: {vehiclesData.passengers}</ListGroupItem>
							<ListGroupItem>Max atmosphering speed: {vehiclesData.max_atmosphering_speed}</ListGroupItem>
							<ListGroupItem>Cargo capacity: {vehiclesData.cargo_capacity}</ListGroupItem>
							<ListGroupItem>Consumables: {vehiclesData.consumables}</ListGroupItem>
						</ListGroup>

						{vehiclesData.pilots.length > 0 && (
							<div className='mb-4'>
								<h3 className='mx-auto text-center'>Pilots</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Characters people={vehiclesData.pilots}/>
								</ListGroup>
							</div>
						)}

						<div className='mb-4'>
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