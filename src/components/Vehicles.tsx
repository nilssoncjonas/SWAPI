import React from "react"
import {Vehicle} from "../types";
import ListGroup from "react-bootstrap/ListGroup";
import {Button} from "react-bootstrap";

interface IProp {
	vehicles: Vehicle[]
}

const Planets: React.FC<IProp> = ({vehicles}) => {
	return (
		<>
			{vehicles.map((v, index) => (
				<ListGroup.Item
					action
					href={''}
					key={index}>
					{v.name}
					<Button className='float-end'>read more</Button>
				</ListGroup.Item>
			))}
		</>
	)
}
export default Planets