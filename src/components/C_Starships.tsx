import React from "react"
import {StarshipsData} from "../types"
import ListGroup from "react-bootstrap/ListGroup"

interface IProp {
	starships: StarshipsData
}

const C_Starships: React.FC<IProp> = ({starships}) => {
	return (
		<>
			{starships.map((s, index) => (
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
export default C_Starships