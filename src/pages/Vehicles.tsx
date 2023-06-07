import {useEffect, useState} from "react";
import * as SWAPI from "../services/SWAPI-client.ts";
// types
import {VehiclesData, VehiclePaginationData} from "../types";
// components
import AutoAlert from "../components/AutoAlert.tsx";
import InputForm from "../components/InputForm.tsx";
import Pagination from "../components/Pagination.tsx";
import C_VehiclesList from "../components/C_VehiclesList.tsx";
// style
import spinner from "../../public/rebel.svg";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";

const Vehicles = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<VehiclePaginationData>({} as VehiclePaginationData)
	const [vehiclesData, setVehiclesData] = useState<VehiclesData>([])
	const [page, setPage] = useState(1)

	const get = async () => {
		setLoading(true)
		setError(null)
		try {
			const res: VehiclePaginationData = await SWAPI.getVehicles()
			const data: VehiclesData = res.data
			setResData(res)
			setVehiclesData(data)
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	const handlePrevPage = () => {
		setPage(prevValue => prevValue - 1)
	}
	const handleNextPage = () => {
		setPage(prevValue => prevValue + 1)
	}

	useEffect(() => {
		get()
	}, [])
	return (
		<>
			<h1>Vehicles</h1>
			<InputForm />

			{loading && <Image src={spinner} className='loading'/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && vehiclesData && (
				<>
					<p>Showing {resData.from} to {resData.to} of {resData.total} from the Films Resource</p>

					<ListGroup className='mb-3'>
						<C_VehiclesList data={vehiclesData}/>
					</ListGroup>

					<Pagination resData={resData} onPrevPage={handlePrevPage} onNextPage={handleNextPage}/>
				</>
			)}
		</>
	)
}
export default Vehicles