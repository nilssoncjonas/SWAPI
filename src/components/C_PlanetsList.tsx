import React from "react"
import {PlanetsData} from "../types/"
import ListGroup from "react-bootstrap/ListGroup"

interface IProp {
	data: PlanetsData
}

const C_PlanetsList: React.FC<IProp> = ({data}) => {
	return (
		<>
			{data.map((data, index) => (
				<ListGroup.Item
					action
					href={`/planets/${data.id}`}
					key={index}>
					<h2 className='h5 mb-3'>{data.name}</h2>
					<p className="text-muted small mb-0 d-flex justify-content-around align-items-center">
						<span>Films: {data.films_count} </span>
						<span>Residents: {data.residents_count} </span>
					</p>
				</ListGroup.Item>
			))}
		</>
	)
}
export default C_PlanetsList
