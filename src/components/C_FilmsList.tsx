import React from "react"
import {FilmsData} from "../types"
import ListGroup from "react-bootstrap/ListGroup"

interface IProp {
data: FilmsData
}

const C_FilmsList:React.FC<IProp> = ({ data }) => {
	return (
		<>
			{data.map((data, index) => (
			<ListGroup.Item
				action
				href={`/films/${data.id}`}
				key={index}>
				<h2 className='h5 mb-3'>Episode: {data.episode_id} - {data.title}</h2>
				<p className="text-muted small mb-0 d-flex justify-content-between align-items-center">
					<span>Characters: {data.characters_count} </span>
					<span>Planets: {data.planets_count} </span>
					<span>Starships: {data.starships_count} </span>
					<span>Vehicles: {data.vehicles_count} </span>
					<span>Species: {data.species_count} </span>
				</p>
			</ListGroup.Item>
		))}
		</>
	)
}
export default C_FilmsList