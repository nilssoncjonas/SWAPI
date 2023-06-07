import React from "react"
import {FilmsData} from "../types"
import ListGroup from "react-bootstrap/ListGroup"

interface IProp {
	films: FilmsData
}

const C_Films:React.FC<IProp> = ({ films }) => {
	return (
		<>
			{films.map((f, index) => (
				<ListGroup.Item
					action
					href={''}
					key={index}>
					{f.title}
				</ListGroup.Item>
			))}
		</>
	)
}
export default C_Films