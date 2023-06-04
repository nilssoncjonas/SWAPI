import React from "react"
import {Species} from "../types/films";
import ListGroup from "react-bootstrap/ListGroup";

interface IProp {
	species: Species[]
}

const Planets:React.FC<IProp> = ({ species }) => {
	return (
		<>
			{species.map((p, index) => (
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