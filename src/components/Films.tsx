import React from "react"
import {Film} from "../types";
import ListGroup from "react-bootstrap/ListGroup";
import {Button} from "react-bootstrap";

interface IProp {
	films: Film[]
}

const Films:React.FC<IProp> = ({ films }) => {
	return (
		<>
			{films.map((f, index) => (
				<ListGroup.Item
					action
					href={''}
					key={index}>
					{f.name}
					<Button className='float-end'>read more</Button>
				</ListGroup.Item>
			))}
		</>
	)
}
export default Films