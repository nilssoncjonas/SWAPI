import React from "react"
import {Meta, SpeciesData} from "../types"
import ListGroup from "react-bootstrap/ListGroup"

interface IProp {
	species: SpeciesData | Meta[]
}

const C_Species: React.FC<IProp> = ({species}) => {
	return (
		<>
			{species.map((s, index) => (
				<ListGroup.Item
					action
					href={`/species/${s.id}`}
					key={index}>
					{s.name}
				</ListGroup.Item>
			))}
		</>
	)
}
export default C_Species