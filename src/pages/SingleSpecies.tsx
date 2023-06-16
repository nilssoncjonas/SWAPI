import {useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
//Hooks
import useGetData from "../hooks/useGetData.ts";
// types
import { TSingleSpecies} from "../types/"
// components
import AutoAlert from "../components/AutoAlert.tsx"
import C_Characters from "../components/C_Characters.tsx"
import C_Films from "../components/C_Films.tsx"
import C_Loading from "../components/C_Loading.tsx"
// style
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Button from "react-bootstrap/Button"


const SingleSpecies = () => {
	const navigate = useNavigate()
	const {id} = useParams()
	const personId = Number(id)

	const {
		resData,
		error,
		isError,
		isLoading,
		execute,
	} = useGetData<TSingleSpecies>(`species/${personId}`)

	useEffect(() => {
		execute
	}, [execute])
	return (
		<>

			{isLoading && <C_Loading/>}

			{isError && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && (
				<div className='mb-4'>
					<Button className='m-2' onClick={() => navigate('/species')}>Back</Button>
					<h1 className='my-2'>{resData.name}</h1>

					<Container>
						<ListGroup className='mb-4 mx-auto'>
							<ListGroupItem>Classification: {resData.classification}</ListGroupItem>
							<ListGroupItem>Designation: {resData.designation}</ListGroupItem>
							<ListGroupItem>Average height: {resData.average_height} cm</ListGroupItem>
							<ListGroupItem>Average
								lifespan: {resData.average_lifespan}{resData.average_lifespan === 'unknown' ? '' : ' years'}</ListGroupItem>
							<ListGroupItem>Eye colors: {resData.eye_colors}</ListGroupItem>
							<ListGroupItem>Hair color: {resData.hair_colors}</ListGroupItem>
							<ListGroupItem>Skin color: {resData.skin_colors}</ListGroupItem>
							<ListGroupItem>Language: {resData.language}</ListGroupItem>
						</ListGroup>

						<div className='mb-4'>
							<h3
								className='mx-auto text-center'>{resData.people.length} {resData.people.length > 1 ? 'Characters' : 'Character'}</h3>
							<ListGroup className='mb-3 mx-auto'>
								<C_Characters people={resData.people}/>
							</ListGroup>
						</div>

							<div className='mb-4'>
								<h3 className='mx-auto text-center'>Homeworld</h3>
								<ListGroup className='mb-3 mx-auto'>
									<ListGroup.Item
										action
										href={''}
										key={resData.homeworld?.id}>
										{!resData.homeworld?.name ? 'n/a' : `${resData.homeworld?.name}`}
									</ListGroup.Item>
								</ListGroup>
							</div>

						<div className='mb-4'>
							<h3 className='mx-auto text-center'>{resData.films.length} Films</h3>
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
export default SingleSpecies