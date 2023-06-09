import React from "react"
import {FilmsData, FilmsMeta} from "../types"
import ListGroup from "react-bootstrap/ListGroup"

interface IProp {
	films: FilmsData | FilmsMeta[]
}

const C_Films:React.FC<IProp> = ({ films }) => {
	return (
		<>
			{films.map((f, index) => (
				<ListGroup.Item
					action
					href={`/films/${f.id}`}
					key={index}>
					{f.title}
				</ListGroup.Item>
			))}
		</>
	)
}
export default C_Films