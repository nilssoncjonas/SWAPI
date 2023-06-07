import React from "react"
import {PlanetsData} from "../types"
import ListGroup from "react-bootstrap/ListGroup"

interface IProp {
	planets: PlanetsData
}

const C_Planets: React.FC<IProp> = ({planets}) => {
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
export default C_Planets