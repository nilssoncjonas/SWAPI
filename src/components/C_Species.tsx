import React from "react"
import {Species} from "../types";
import ListGroup from "react-bootstrap/ListGroup";

interface IProp {
	species: Species[]
}

const C_Species: React.FC<IProp> = ({species}) => {
	return (
		<>
			{species.map((s, index) => (
				<ListGroup.Item
					action
					href={''}
					key={index}>
					{s.name}
				</ListGroup.Item>
			))}
		</>
	)
}
export default C_Species