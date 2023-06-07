import React from "react"
import {Film} from "../types";
import ListGroup from "react-bootstrap/ListGroup";
import {PeopleFilm} from "../types/peoples";

interface IProp {
	films: Film[] | PeopleFilm[]
}

const Films:React.FC<IProp> = ({ films }) => {
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
export default Films