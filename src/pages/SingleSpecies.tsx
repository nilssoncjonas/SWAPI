import {useEffect, useState} from "react"
import {useNavigate, useParams, useSearchParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {TSingleSpecies} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Characters from "../components/C_Characters.tsx"
import C_Films from "../components/C_Films.tsx"
import InputForm from "../components/InputForm.tsx"
// style
import spinner from "../../public/rebel.svg"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"


const SingleSpecies = () => {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [speciesData, setSpeciesData] = useState<TSingleSpecies | null>(null)
	const {id} = useParams()
	const speciesId = Number(id)

	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [searchParams, setSearchParams] = useSearchParams();
	const get = async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const res: TSingleSpecies = await SWAPI.getSingleSpecies(id)
			setSpeciesData(res)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	const searchReq = async (query: string) => {
		setPage(1)
		setSearchParams( {search: query, page: page.toString()})
		navigate(`/species/?search=${query}&page=1`)
	}

	useEffect(() => {
		get(speciesId)

	}, [speciesId])
	return (
		<>
			<InputForm onSearch={searchReq}/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{speciesData && (
				<div className='mb-4'>
					<h1>{speciesData.name}</h1>
					<h2 className='h3'>{speciesData.name}</h2>

					<p className="d-flex justify-content-between align-items-center">
						<span className='h6 d-block'>Classification {speciesData.classification}</span>
						<span className='h6 d-block'>Designation {speciesData.designation}</span>
						<span className='h6 d-block'>Average height {speciesData.average_height}</span>
						<span className='h6 d-block'>Average lifespan: {speciesData.average_lifespan} cm</span>
						<span className='h6 d-block'>Eye colors: {speciesData.eye_colors}</span>
						<span className='h6 d-block'>Hair color: {speciesData.hair_colors}</span>
						<span className='h6 d-block'>Skin color: {speciesData.skin_colors}</span>
						<span className='h6 d-block'>Language: {speciesData.language}</span>
					</p>

					<Container>
						<div>
							<h3 className='mx-auto text-center'>People</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Characters people={speciesData.people}/>
							</ListGroup>
						</div>

						<div>
							<h3 className='mx-auto text-center'>Homeworld</h3>
							<ListGroup className='mb-3 mx-auto'>
								<ListGroup.Item
									action
									href={''}
									key={speciesData.homeworld?.id}>
									{speciesData.homeworld?.name}
								</ListGroup.Item>
							</ListGroup>
						</div>

						<div>
							<h3 className='mx-auto text-center'>Films</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Films films={speciesData.films}/>
							</ListGroup>
						</div>
					</Container>
				</div>
			)}
		</>
	)
}
export default SingleSpecies