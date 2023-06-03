import React, {useEffect, useState} from "react";
import Alert from 'react-bootstrap/Alert'

interface Props {
	children: React.ReactNode
	hideAfter: number
	msg: string
	variant: string
}

const AutoAlert: React.FC<Props> = ({children, hideAfter, msg, variant}) => {
	const [hide, setHide] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setHide(true)
		}, hideAfter * 1000)
	}, [hideAfter])

	return (
		<>
			<Alert show={!hide} variant={variant}>
				<p className='text-center text-uppercase'>{msg}</p>
				{children}
			</Alert>
		</>
	)
}
export default AutoAlert