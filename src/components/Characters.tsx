import React from "react"
import {Character} from "../types";
import ListGroup from "react-bootstrap/ListGroup";
import {Button} from "react-bootstrap";

interface IProp {
	people: Character[]
}

const Characters: React.FC<IProp> = ({people}) => {
	console.log(people)
	return (
		<>
			{people.map((p, index) => (
				<ListGroup.Item
					action
					href={''}
					key={index}>
					{p.name}
					<Button className='float-end'>read more</Button>
				</ListGroup.Item>
			))}
		</>
	)
}
export default Characters