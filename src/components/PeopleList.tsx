import React from "react"
import ListGroup from "react-bootstrap/ListGroup";
import {PeoplesData} from "../types/peoples";

interface IProp {
data: PeoplesData
}

const FilmsList:React.FC<IProp> = ({ data }) => {
	return (
		<>
			{data.map((data, index) => (
			<ListGroup.Item
				action
				href={`/people/${data.id}`}
				key={index}>
				<h2 className='h5 mb-3'>{data.name} from {data.homeworld.name}</h2>
				<p className="text-muted small mb-0 d-flex justify-content-between align-items-center">
					<span>Films: {data.films_count} </span>
					<span>Species: {data.species_count} </span>
					<span>Starships: {data.starships_count} </span>
					<span>Vehicles: {data.vehicles_count} </span>
				</p>
			</ListGroup.Item>
		))}
		</>
	)
}
export default FilmsList