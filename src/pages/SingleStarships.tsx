import {useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts";
// types
import {TSingleStarships} from "../types";
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

const SingleStarships = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [starshipsData, setStarshipsData] = useState<TSingleStarships | null>(null)
	const {id} = useParams()
	const starshipId = Number(id)

	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [searchParams, setSearchParams] = useSearchParams();
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
	const searchReq = async (query: string) => {
		setPage(1)
		setSearchParams({search: query, page: page.toString()})
		navigate(`/starships/?search=${query}&page=1`)
	}
	useEffect(() => {
		get(starshipId)
	}, [starshipId])

	return (
		<>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{starshipsData && (
				<div className='mb-4'>
					<h1>{starshipsData.name}</h1>
					<Container>
						<h2 className='h3'>{starshipsData.manufacturer} {starshipsData.model}</h2>
						<ListGroup className='mb-4 mx-auto'>
							<ListGroupItem>Starship class: {starshipsData.starship_class}</ListGroupItem>
							<ListGroupItem>Cost in credits: {Number(starshipsData.cost_in_credits).toLocaleString()} GCS, <span
								className='small text-muted fst-italic'>Galactic Credit Standard</span></ListGroupItem>
							<ListGroupItem>Length: {starshipsData.length} GM, , <span className='small text-muted fst-italic'>Galactic Meters</span></ListGroupItem>
							<ListGroupItem>Crew: {starshipsData.crew}</ListGroupItem>
							<ListGroupItem>Passengers: {starshipsData.passengers}</ListGroupItem>
							<ListGroupItem>Max atmosphering speed: {starshipsData.max_atmosphering_speed}</ListGroupItem>
							<ListGroupItem>Hyperdrive rating: {starshipsData.hyperdrive_rating}</ListGroupItem>
							<ListGroupItem>MGLT: {starshipsData.MGLT}</ListGroupItem>
							<ListGroupItem>Cargo capacity: {Number(starshipsData.cargo_capacity).toLocaleString()} GT, <span
								className='small text-muted fst-italic'>Galactic Tonnes</span></ListGroupItem>
							<ListGroupItem>Consumables: {starshipsData.consumables}</ListGroupItem>
						</ListGroup>

						{starshipsData.pilots.length > 0 && (
							<div className='mb-4'>
								<h3 className='mx-auto text-center'>Pilots</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Characters people={starshipsData.pilots}/>
								</ListGroup>
							</div>
						)}

						<div className='mb-4'>
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