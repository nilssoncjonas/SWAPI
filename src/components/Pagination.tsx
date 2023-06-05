import React from "react"
import {FilmPaginationData, PageLink} from "../types";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

interface IProp {
	resData: FilmPaginationData
	url: PageLink[]
	onPrevPage: () => void
	onNextPage: () => void
}

const Pagination: React.FC<IProp> = ({resData, url, onNextPage, onPrevPage}) => {
	console.log('url i component', url)
	return (
		<>
			<div className="d-flex justify-content-between align-items-center">
				<div className="prev">
					<Button
						disabled={resData.current_page === 1}
						onClick={() => onPrevPage()}
						variant="primary">First Page</Button>
				</div>
				{resData.links && (
					<>
						{resData.links.map((l, index) => (
							<Link to={!l.url ? '#' : l.url}>
							<Button variant="warning" key={index} disabled={!l.active}>{l.label} </Button>
							</Link>
						))}
					</>

				)}
				<div className="next">
					<Button
						disabled={resData.current_page >= resData.last_page}
						onClick={() => onNextPage()}
						variant="primary">Last Page</Button>
				</div>
			</div>
		</>
	)
}
export default Pagination