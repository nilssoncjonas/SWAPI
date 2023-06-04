import * as SWAPI from "../services/SWAPI-client.ts";
import {useEffect, useState} from "react";
import Image from "react-bootstrap/Image";
import spinner from "../../public/rebel.svg";
import AutoAlert from "../components/AutoAlert.tsx";
import {Film,} from "../types/films";
import {useParams} from "react-router-dom";
import InputForm from "../components/InputForm.tsx";

const SingleFilm = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [filmData, setFilmData] = useState<Film>([])
	const {id} = useParams()

	const get = async (id) => {
		setLoading(true)
		setError(null)
		try {
			const res: Film = await SWAPI.getFilm(id)
			console.log(res)
			setFilmData(res)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		get(id)

	}, [id])
	return (
		<>
			<InputForm/>

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{filmData && (
				<div>
					<h1>{filmData.title}</h1>
					<h2 className='h3'>Episode {filmData.episode_id}</h2>
					<p>
						{filmData.opening_crawl}
					</p>
					<p>
					<span className='h6 d-block'>Released: {filmData.release_date}</span>
					<span className='h6 d-block'>Directed by: {filmData.director}</span>
					<span className='h6 d-block'>Produced by: {filmData.producer}</span>
					</p>
				</div>
			)}

		</>
	)
}
export default SingleFilm
