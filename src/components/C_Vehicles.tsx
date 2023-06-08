import React from "react"
import {Meta, VehiclesData} from "../types"
import ListGroup from "react-bootstrap/ListGroup"

interface IProp {
	vehicles: VehiclesData | Meta[]
}

const C_Vehicles: React.FC<IProp> = ({vehicles}) => {
	return (
		<>
			{vehicles.map((v, index) => (
				<ListGroup.Item
					action
					href={''}
					key={index}>
					{v.name}
				</ListGroup.Item>
			))}
		</>
	)
}
export default C_Vehicles