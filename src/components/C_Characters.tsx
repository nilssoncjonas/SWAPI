import React from "react"
import {TPeople} from "../types"
import ListGroup from "react-bootstrap/ListGroup"

interface IProp {
	people: TPeople[]
}

const C_Characters: React.FC<IProp> = ({people}) => {
	return (
		<>
			{people.map((p, index) => (
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
export default C_Characters