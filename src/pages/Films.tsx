import Resources from "../components/Resources.tsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {PaginationData, PartialPaginationData} from "../types";
import {get} from "../services/SWAPI-client.ts";
import {Film, FilmData} from "../types/films";

const Films = () => {
	const {pathname} = useLocation()
	const [filmData, setFilmData] = useState<FilmData | []>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const getResource = async (req: string) => {

		setError(null)
		try {
			const data:any = await get(req)
			console.log(data)
			// setFilmData(data)
			// console.log(filmData)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		}
		setLoading(false)
	}

	useEffect(() => {
		setLoading(true)
		getResource(pathname)
	}, [pathname])

	return (
		<>
			<h1>Movies</h1>
			{/*<Resources data={'films'}/>*/}
		</>
	)
}
export default Films