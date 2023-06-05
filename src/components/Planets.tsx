import React from "react"
import {Planet} from "../types";
import ListGroup from "react-bootstrap/ListGroup";
import {Button} from "react-bootstrap";

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
					<Button className='float-end'>read more</Button>
				</ListGroup.Item>
			))}
		</>
	)
}
export default Planets