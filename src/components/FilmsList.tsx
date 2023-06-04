import React from "react"
import {FilmData} from "../types/films";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

interface IProp {
data: FilmData
}

const FilmsList:React.FC<IProp> = ({ data }) => {
	return (
		<>
			{data.map((data, index) => (
			<ListGroup.Item
				action
				href={''}
				key={index}>
				<h2 className='h3 mb-3'>Episode: {data.episode_id} - {data.title}</h2>
				<p className="text-muted small mb-0 d-flex justify-content-between align-items-center">
					Release date: {data.release_date}
				</p>
			</ListGroup.Item>
		))}
		</>
	)
}
export default FilmsList