import React from "react"
import {Starship} from "../types/films";
import ListGroup from "react-bootstrap/ListGroup";

interface IProp {
starships: Starship[]
}

const Planets:React.FC<IProp> = ({ starships }) => {
	return (
		<>
			{starships.map((p, index) => (
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