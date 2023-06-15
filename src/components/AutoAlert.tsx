import React, {useEffect, useState} from "react"
import Alert from 'react-bootstrap/Alert'

interface Props {
	hideAfter: number
	msg: string | null
	variant: string
}

const AutoAlert: React.FC<Props> = ({hideAfter, msg, variant}) => {
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
				<p className='text-center fs-4'> Your request has encountered a disturbance in the Force. Kindly wait a few
					moments and attempt again, as the galaxy aligns to fulfill your inquiry.</p>
			</Alert>
		</>
	)
}
export default AutoAlert