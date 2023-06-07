import React from "react"
import {VehiclesData} from "../types";
import ListGroup from "react-bootstrap/ListGroup";

interface IProp {
data: VehiclesData
}

const C_VehiclesList:React.FC<IProp> = ({ data}) => {
	return (
		<>
			{data.map((data, index) => (
				<ListGroup.Item
					action
					href={`/vehicles/${data.id}`}
					key={index}>
					<h2 className='h5 mb-3'> {data.name} by {data.manufacturer}</h2>
					<p className="text-muted small mb-0 d-flex justify-content-around align-items-center">
						<span>Pilots: {data.pilots_count} </span>
						<span>Films: {data.films_count} </span>
					</p>
				</ListGroup.Item>
			))}
		</>
	)
}
export default C_VehiclesList