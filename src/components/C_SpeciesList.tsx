import React from "react"
import {SpeciesData} from "../types/"
import ListGroup from "react-bootstrap/ListGroup"

interface IProp {
	data: SpeciesData
}

const C_SpeciesList: React.FC<IProp> = ({data}) => {
	return (
		<>

			{data.map((s, index) => (
				<ListGroup.Item
					action
					href={`/species/${s.id}`}
					key={index}>

					<h2 className='h5 mb-3'>{s.name} {!s.homeworld ? '' : `from ${s.homeworld.name}`}</h2>

					<p className="text-muted small mb-0 d-flex justify-content-around align-items-center">
						<span>Films: {s.films_count} </span>
						<span>Characters: {s.people_count} </span>
					</p>
				</ListGroup.Item>
			))}
		</>
	)
}
export default C_SpeciesList