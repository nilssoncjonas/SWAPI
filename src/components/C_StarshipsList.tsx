import React from "react"
import {StarshipsData} from "../types";
import ListGroup from "react-bootstrap/ListGroup";

interface IProp {
data: StarshipsData
}

const C_StarshipsList:React.FC<IProp> = ({ data }) => {
	return (
		<>
			{data.map((s, index) => (
				<ListGroup.Item
					action
					href={`/starships/${s.id}`}
					key={index}>
					<h2 className='h5 mb-3'> {s.name} by {s.manufacturer}</h2>
					<p className="text-muted small mb-0 d-flex justify-content-around align-items-center">
						<span>Pilots: {s.pilots_count} </span>
						<span>Films: {s.films_count} </span>
					</p>
				</ListGroup.Item>
			))}
		</>
	)
}
export default C_StarshipsList