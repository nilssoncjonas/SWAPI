import React from "react"
import {Planet} from "../types";
import ListGroup from "react-bootstrap/ListGroup";

interface IProp {
	planets: Planet[]
}

const Planets: React.FC<IProp> = ({planets}) => {
	return (
		<>
			{planets.map((p, index) => (
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