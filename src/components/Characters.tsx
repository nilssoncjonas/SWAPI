import React from "react"
import {Character} from "../types/films";
import ListGroup from "react-bootstrap/ListGroup";

interface IProp {
	people: Character[]
}

const Characters:React.FC<IProp> = ({ people }) => {
	return (
		<>
			{people.map((p, index) => (
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
export default Characters