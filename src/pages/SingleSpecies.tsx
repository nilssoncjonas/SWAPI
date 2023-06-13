import {useEffect, useState} from "react"
import {useNavigate, useParams, useSearchParams} from "react-router-dom"
import * as SWAPI from "../services/SWAPI-client.ts"
// types
import {TSingleSpecies} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Characters from "../components/C_Characters.tsx"
import C_Films from "../components/C_Films.tsx"
import C_Loading from "../components/C_Loading.tsx";
import InputForm from "../components/InputForm.tsx"
// style
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import {ListGroupItem} from "react-bootstrap";


const SingleSpecies = () => {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [speciesData, setSpeciesData] = useState<TSingleSpecies | null>(null)
	const {id} = useParams()
	const speciesId = Number(id)

	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [, setSearchParams] = useSearchParams();
	const get = async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<TSingleSpecies>(`species/${id}`)
			setSpeciesData(res)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
		navigate(`/species/?search=${query}&page=1`)
	}

	useEffect(() => {
		get(speciesId)

	}, [speciesId])
	return (
		<>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{speciesData && (
				<div className='mb-4'>
					<h1>{speciesData.name}</h1>

					<Container>
						<ListGroup className='mb-4 mx-auto'>
							<ListGroupItem>Classification: {speciesData.classification}</ListGroupItem>
							<ListGroupItem>Designation: {speciesData.designation}</ListGroupItem>
							<ListGroupItem>Average height: {speciesData.average_height} cm</ListGroupItem>
							<ListGroupItem>Average
								lifespan: {speciesData.average_lifespan}{speciesData.average_lifespan === 'unknown' ? '' : ' years'}</ListGroupItem>
							<ListGroupItem>Eye colors: {speciesData.eye_colors}</ListGroupItem>
							<ListGroupItem>Hair color: {speciesData.hair_colors}</ListGroupItem>
							<ListGroupItem>Skin color: {speciesData.skin_colors}</ListGroupItem>
							<ListGroupItem>Language: {speciesData.language}</ListGroupItem>
						</ListGroup>

						<div className='mb-4'>
							<h3
								className='mx-auto text-center'>{speciesData.people.length} {speciesData.people.length > 1 ? 'Characters' : 'Character'}</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Characters people={speciesData.people}/>
							</ListGroup>
						</div>

							<div className='mb-4'>
								<h3 className='mx-auto text-center'>Homeworld</h3>
								<ListGroup className='mb-3 mx-auto'>
									<ListGroup.Item
										action
										href={''}
										key={speciesData.homeworld?.id}>
										{!speciesData.homeworld?.name ? 'n/a' : `${speciesData.homeworld?.name}`}
									</ListGroup.Item>
								</ListGroup>
							</div>

						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{speciesData.films.length} Films</h3>
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