import * as SWAPI from "../services/SWAPI-client.ts";
import {useEffect, useState} from "react";
// Types
import {FilmData, FilmPaginationData} from "../types/films";
// Components
import AutoAlert from "../components/AutoAlert.tsx";
import InputForm from "../components/InputForm.tsx";
import FilmsList from "../components/FilmsList.tsx";
// Style
import spinner from "../../public/rebel.svg";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";


const Films = () => {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<FilmPaginationData>([])
	const [filmData, setFilmData] = useState<FilmData>([])

	const get = async () => {
		setLoading(true)
		setError(null)
		try {
			const res: FilmPaginationData = await SWAPI.getFilms()
			const data: FilmData = res.data
			console.log(res)
			console.log(res.data)
			setResData(res)
			setFilmData(data)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		get()
	}, [])

	return (
		<>
			<h1>Films</h1>
			<InputForm/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			<div id="data__result">
				<p>Showing {resData.total} results for Films</p>

				<ListGroup className='mb-3'>
					<FilmsList data={filmData}/>
				</ListGroup>

				<div className="d-flex justify-content-between align-items-center">

					<div className="prev">
						<Button variant='primary' disabled={!resData.links[0].active} >{resData.links[0].label}</Button>
					</div>
					<div className="page">{resData.links[1].label}
					</div>
					<div className="next"><
						Button variant='primary' disabled={!resData.links[2].active}>{resData.links[2].label}</Button>
					</div>
				</div>
			</div>

		</>
	)
}
export default Films