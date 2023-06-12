import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts";
// types
import {VehiclesData, VehiclePaginationData} from "../types";
// components
import AutoAlert from "../components/AutoAlert.tsx";
import C_Loading from "../components/C_Loading.tsx";
import C_SearchResultData from "../components/C_SearchResultData.tsx";
import C_VehiclesList from "../components/C_VehiclesList.tsx";
import InputForm from "../components/InputForm.tsx";
import Pagination from "../components/Pagination.tsx";
// style
import ListGroup from "react-bootstrap/ListGroup";

const Vehicles = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [resData, setResData] = useState<VehiclePaginationData>({} as VehiclePaginationData)
	const [vehiclesData, setVehiclesData] = useState<VehiclesData>([])

	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('search')
	const page = searchParams.get('page')
	const get = async (page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<VehiclePaginationData>(`vehicles/?pages=${page}`)
			const data: VehiclesData = res.data
			setResData(res)
			setVehiclesData(data)
			setSearchParams({page: page.toString()})
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	const searchReq = async (query: string) => {
		const res = await SWAPI.get<VehiclePaginationData>(`vehicles/?pages=1&search=${query}`)
		setSearchParams({search: query, page: '1'})
		setResData(res)
		setVehiclesData(res.data)
	}

	useEffect(() => {
		if (query) {
			searchReq(query)
		} else if (page) {
			get(Number(page))
		} else
			get()
	}, [query, page])

	return (
		<>
			<h1>Vehicles</h1>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && vehiclesData && (
				<>
					{vehiclesData.length === 0 && (
						<p>Didin't find anything for <span className='fst-italic fw-bold'>{query}</span>, I sense a disturbance in
							your typing!</p>
					)}
					{vehiclesData.length > 0 && (
						<C_SearchResultData query={query} from={resData.from} to={resData.to} total={resData.total} resource={'Vehicles'}/>
					)}
					<ListGroup className='mb-3'>
						<C_VehiclesList data={vehiclesData}/>
					</ListGroup>

					<Pagination resData={resData}/>
				</>
			)}
		</>
	)
}
export default Vehicles