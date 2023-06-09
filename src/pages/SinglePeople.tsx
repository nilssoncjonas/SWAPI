import {useEffect, useState} from "react"
import {useNavigate, useParams, useSearchParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {TSinglePeople} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Films from "../components/C_Films.tsx"
import C_Loading from "../components/C_Loading.tsx";
import C_Species from "../components/C_Species.tsx"
import C_Starships from "../components/C_Starships.tsx"
import C_Vehicles from "../components/C_Vehicles.tsx"
import InputForm from "../components/InputForm.tsx"
// style
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import {ListGroupItem} from "react-bootstrap";


const SinglePeople = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [personData, setPersonData] = useState<TSinglePeople | null>(null)
	const {id} = useParams()
	const personId = Number(id)

	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [searchParams, setSearchParams] = useSearchParams();

	const get = async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const res: TSinglePeople = await SWAPI.get<TSinglePeople>(`people/${id}`)
			setPersonData(res)
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
		navigate(`/people/?search=${query}&page=${page}`)
	}

	useEffect(() => {
		get(personId)

	}, [personId])
	return (
		<>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{personData && (
				<div className='mb-4'>
					<h1>{personData.name}</h1>
					<Container>
					<h2 className='h3'>Home World: {personData.homeworld.name}</h2>
						<ListGroup className='mb-3 mx-auto'>
							<ListGroupItem>
								Birth Year: {personData.birth_year}
							</ListGroupItem>
							<ListGroupItem>
								Eye color: {personData.eye_color}
							</ListGroupItem>
							<ListGroupItem>
								Hair color: {personData.hair_color}
							</ListGroupItem>
							<ListGroupItem>
								Height: {personData.height} GSH, <span className='small text-muted fst-italic'>Galactic Standard Height</span>
							</ListGroupItem>
							<ListGroupItem>
								Mass: {personData.mass} GMU, <span className='small text-muted fst-italic'>Galactic Mass Unit</span>
							</ListGroupItem>
							<ListGroupItem>
								Skin color: {personData.skin_color}
							</ListGroupItem>
						</ListGroup>

						<div className='mb-4'>
							<h3 className='mx-auto text-center'>Films</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Films films={personData.films}/>
							</ListGroup>
						</div>
						{personData.species.length > 0 && (
							<div className='mb-4'>
								<h3 className='mx-auto text-center'>Species</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Species species={personData.species}/>
								</ListGroup>
							</div>
						)}
						{personData.starships.length > 0 && (
							<div className='mb-4'>
								<h3 className='mx-auto text-center'>Starships</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Starships starships={personData.starships}/>
								</ListGroup>
							</div>
						)}
						{personData.vehicles.length > 0 && (
							<div className='mb-4'>
								<h3 className='mx-auto text-center'>Vehicles</h3>
								<ListGroup className='mb-3 mx-auto'>
									<C_Vehicles vehicles={personData.vehicles}/>
								</ListGroup>
							</div>
						)}
					</Container>
				</div>
			)}

		</>
	)
}
export default SinglePeople