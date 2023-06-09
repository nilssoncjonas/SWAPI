import React from "react"
import {Meta, TPeople} from "../types"
import ListGroup from "react-bootstrap/ListGroup"

interface IProp {
	people: TPeople[] | Meta[]
}

const C_Characters: React.FC<IProp> = ({people}) => {
	return (
		<>
			{people.map((p, index) => (
				<ListGroup.Item
					action
					href={`/people/${p.id}`}
					key={index}>
					{p.name}
				</ListGroup.Item>
			))}
		</>
	)
}
export default C_Characters