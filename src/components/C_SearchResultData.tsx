import React from "react"

interface IProp {
	query: string | null
	from: number
	to: number
	total: number
	resource: string
}

const C_SearchResultData: React.FC<IProp> = ({query, from, to, total, resource}) => {
	return (
		<>
			<p>Showing {from} to {to} of total {total} results for <span
			className='fst-italic fw-bold'>{!query ? `${resource}` : `${query}`}</span></p>
		</>
	)
}
export default C_SearchResultData