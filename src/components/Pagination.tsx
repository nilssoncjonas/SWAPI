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

interface IProp {
	onChangeUrl: (url: string) => void
	resData: FilmPaginationData | PeoplePaginationData | PlanetsPaginationData | SpeciesPaginationData | StarshipsPaginationData | VehiclePaginationData
}

const Pagination: React.FC<IProp> = ({resData, onChangeUrl}) => {
	const firstPageUrl = resData.first_page_url.split('?')
	const lastPageUrl = resData.last_page_url.split('?')

	if (resData.links) {
		resData.links.forEach(l => {
			if (l.url !== null) {
				const link = l.url.split('?');
				const url = link[link.length - 1];
				l.url = `${url}`
			}
		})
	}
	return (
		<>
				{resData.links && (
					<div className="d-flex flex-wrap justify-content-between align-items-center mx-auto mb-2">
						{resData.links.map((l, index) => (
								<Button onClick={() => onChangeUrl(!l.url ? '#' : l.url )} variant="warning" key={index} disabled={!l.url ? !l.active : l.active} className='mx-1 mb-2'>{l.label}</Button>
						))}
					</div>
				)}
			<div className="d-flex justify-content-between align-items-center mx-auto">
					<Button onClick={() => onChangeUrl(`${firstPageUrl[firstPageUrl.length -1]}`)}>First Page</Button>
					<Button onClick={() => onChangeUrl(`${lastPageUrl[lastPageUrl.length -1]}`)}>Last Page</Button>
			</div>
		</>
	)
}
export default Pagination