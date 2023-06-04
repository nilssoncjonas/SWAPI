import React from "react"
import {PaginationData} from "../types";
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

interface IProp {
res: PaginationData
}

const RenderResource:React.FC<IProp> = ({ res }) => {

	return (
		<>
			<div id="data__result">
				<p>Showing HITS search results for QUERY...</p>
				<ListGroup className='mb-3'>
					{res.data.map((data, index) => (
						<ListGroup.Item
							action
							href={''}
							key={index}
						>
							<h2 className='h3 mb-3'>TITLE</h2>
							<p className="text-muted small mb-0">POINTS points by AUTHOR at CREATED_AT</p>
						</ListGroup.Item>
					))}
				</ListGroup>

				<div className="d-flex justify-content-between align-items-center">
					<div className="prev">
						<Button
							variant='primary'>Previous Page</Button>
					</div>
					<div className="page">PAGE</div>
					<div className="next">
						<Button
							variant='primary'>Next Page</Button>
					</div>
				</div>
			</div>
		</>
	)
}
export default RenderResource