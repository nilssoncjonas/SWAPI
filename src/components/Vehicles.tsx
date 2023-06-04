import React from "react"
import {Vehicle} from "../types/films";
import ListGroup from "react-bootstrap/ListGroup";

interface IProp {
	vehicles: Vehicle[]
}

const Planets:React.FC<IProp> = ({ vehicles }) => {
	return (
		<>
			{vehicles.map((p, index) => (
				<ListGroup.Item
					action
					href={''}
					key={index}>
					{p.name}
				</ListGroup.Item>
			))}
		</>
	)
}
export default Planets