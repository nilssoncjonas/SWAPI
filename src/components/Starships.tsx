import React from "react"
import {Starship} from "../types";
import ListGroup from "react-bootstrap/ListGroup";
import {Button} from "react-bootstrap";

interface IProp {
	starships: Starship[]
}

const Planets: React.FC<IProp> = ({starships}) => {
	return (
		<>
			{starships.map((s, index) => (
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