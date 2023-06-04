import React, {useEffect, useState} from "react"
import {PaginationData} from "../types";
import AutoAlert from "./AutoAlert.tsx";
import {Image} from "react-bootstrap";
import spinner from '../../public/rebel.svg'
import * as SWAPI from "../services/SWAPI-client.ts";
import RenderResource from "./RenderResource.tsx";

interface IProp {
	path: string
}

const Resources: React.FC<IProp> = ({path}) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [resData, setResData] = useState<PaginationData>()

	const getResource = async (req: string) => {
		setLoading(true)
		setError(null)
		try {
			const res: PaginationData = await SWAPI.get(req)
			// TODO send back to page or component for  for render
			setResData(res)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		}
		setLoading(false)
	}

	useEffect(() => {
		getResource(path)
	}, [path])


	return (
		<>
			{resData && <RenderResource res={resData}/> }

			{loading && <Image src={spinner} className='loading'/>}

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