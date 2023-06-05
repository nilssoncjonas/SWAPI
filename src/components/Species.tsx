import React from "react"
import {Species} from "../types";
import ListGroup from "react-bootstrap/ListGroup";
import {Button} from "react-bootstrap";

interface IProp {
	species: Species[]
}

const Planets: React.FC<IProp> = ({species}) => {
	return (
		<>
			{species.map((s, index) => (
				<ListGroup.Item
					action
					href={''}
					key={index}>
					{s.name}
					<Button className='float-end'>read more</Button>
				</ListGroup.Item>
			))}
		</>
	)
}
export default Planets