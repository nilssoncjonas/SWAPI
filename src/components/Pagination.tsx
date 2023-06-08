import React from "react"
import {
	FilmPaginationData,
	SpeciesPaginationData,
	PlanetsPaginationData,
	PeoplePaginationData,
	StarshipsPaginationData,
	VehiclePaginationData,
} from "../types"
import {Button} from "react-bootstrap"
import {Link} from "react-router-dom"

interface IProp {
	resData: FilmPaginationData | PeoplePaginationData | PlanetsPaginationData | SpeciesPaginationData | StarshipsPaginationData | VehiclePaginationData
}

const Pagination: React.FC<IProp> = ({resData}) => {
	if (resData.links) {
			resData.links.forEach(l => {
			if (l.url !== null) {
				const link = l.url.split('?');
				const url = link[link.length - 1];
				l.url = `?${url}`
			}
		})
	}
	return (
		<>
			{resData.links && (
				<div className="d-flex justify-content-between align-items-center mx-auto">
					{resData.links.map((l, index) => (
						<Link key={index} to={!l.url ? '#' : l.url}>
							<Button variant="warning" key={index} disabled={l.active} className='mx-1'>{l.label}</Button>
						</Link>
					))}
				</div>
			)}
		</>
	)
}
export default Pagination