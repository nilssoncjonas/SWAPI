import React, {useEffect, useState} from "react"
import {get} from "../services/SWAPI-client.ts";
import {PaginationData} from "../types";
import AutoAlert from "./AutoAlert.tsx";
import {Image} from "react-bootstrap";
import spinner from '../../public/rebel.svg'

interface IProp {
	data: string
}

const Resources: React.FC<IProp> = ({data}) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const getResource = async (req: string) => {

		setError(null)
		try {
			const responseData: PaginationData = await get(req)
			console.log(responseData.data)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		}
		setLoading(false)
	}

	useEffect(() => {
		setLoading(true)
		getResource(data)
	}, [data])

	return (
		<>
			{loading && (
				<Image src={spinner} className='loading'/>
			)}
			{error && (
				<AutoAlert hideAfter={7} variant='danger' msg={error}>
					<p className='text-center fs-4'> Your request has encountered a disturbance in the Force. Kindly wait a few
						moments and attempt again, as the galaxy aligns to fulfill your inquiry.</p>
				</AutoAlert>
			)}
		</>
	)
}
export default Resources