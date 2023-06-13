import React from "react"

interface IProp {
query: string | null
}

const C_zeroResults:React.FC<IProp> = ({query  }) => {
	return (
		<>
			<p>Didn't find anything for <span className='fst-italic fw-bold'>{query}</span>,
				<span className='d-block mt-1 text-center h4'>Mind your keystrokes, young Padawan, for even the strongest Jedi can succumb to the dark side of misspelling...</span>
			</p>

		</>
	)
}
export default C_zeroResults

