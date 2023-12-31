import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useGetData from "../hooks/useGetData.ts";
// types
import {TSingleVehicles} from "../types";
// components
import AutoAlert from "../components/AutoAlert.tsx";
import C_Characters from "../components/C_Characters.tsx";
import C_Films from "../components/C_Films.tsx";
import C_Loading from "../components/C_Loading.tsx";
// style
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

const SingleVehicles = () => {
	const navigate = useNavigate()
	const {id} = useParams()
	const vehicleId = Number(id)

	const {
		resData,
		error,
		isError,
		isLoading,
		execute,
	} = useGetData<TSingleVehicles>(`vehicles/${vehicleId}`)

	useEffect(() => {
		execute
	}, [execute])

	return (
		<>


			{isLoading && <C_Loading/>}

			{isError && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && (
				<div className='mb-4'>
					<Button className='m-2' onClick={() => navigate('/vehicles')}>Back</Button>
					<h1 className='my-2'>{resData.name}</h1>
					<Container>
						<h2 className='h3'>{resData.manufacturer} {resData.model}</h2>
						<ListGroup className='mb-4 mx-auto'>
							<ListGroupItem>Vehicle class: {resData.vehicle_class}</ListGroupItem>
							<ListGroupItem>Cost in credits: {resData.cost_in_credits}</ListGroupItem>
							<ListGroupItem>Length: {resData.length}</ListGroupItem>
							<ListGroupItem>Crew: {resData.crew}</ListGroupItem>
							<ListGroupItem>Passengers: {resData.passengers}</ListGroupItem>
							<ListGroupItem>Max atmosphering speed: {resData.max_atmosphering_speed}</ListGroupItem>
							<ListGroupItem>Cargo capacity: {resData.cargo_capacity}</ListGroupItem>
							<ListGroupItem>Consumables: {resData.consumables}</ListGroupItem>
						</ListGroup>

						{resData.pilots.length > 0 && (
							<div className='mb-4'>
								<h3
									className='mx-auto text-center'>{resData.pilots.length} {resData.pilots.length > 1 ? 'Pilots' : 'Pilot'}</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Characters people={resData.pilots}/>
								</ListGroup>
							</div>
						)}

						<div className='mb-4'>
							<h3
								className='mx-auto text-center'>{resData.films.length} {resData.films.length > 1 ? 'Films' : 'Film'}</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Films films={resData.films}/>
							</ListGroup>
						</div>
					</Container>
				</div>
			)}
		</>
	)
}
export default SingleVehicles