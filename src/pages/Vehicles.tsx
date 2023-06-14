import {useCallback, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as SWAPI from "../services/SWAPI-client.ts";
// types
import {VehiclesData, VehiclePaginationData} from "../types";
// components
import AutoAlert from "../components/AutoAlert.tsx";
import C_Loading from "../components/C_Loading.tsx";
import C_SearchResultData from "../components/C_SearchResultData.tsx";
import C_VehiclesList from "../components/C_VehiclesList.tsx";
import C_zeroResults from "../components/C_zeroResults.tsx";
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

	const get = useCallback(async (page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<VehiclePaginationData>(`vehicles/?page=${page}`)
			const data: VehiclesData = res.data
			setResData(res)
			setVehiclesData(data)
			setSearchParams({page: res.current_page.toString()})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}, [setSearchParams])

	const searchReq = useCallback(async (query: string, page = 1) => {
		setLoading(true)
		setError(null)
		try {
			const res = await SWAPI.get<VehiclePaginationData>(`vehicles/?search=${query}&page=${page}`)
			setSearchParams({search: query, page: res.current_page.toString()})
			setResData(res)
			setVehiclesData(res.data)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}, [setSearchParams])

	useEffect(() => {
		if (query && page) {
			searchReq(query, Number(page))
		} else {
			get(Number(page))
		}
	}, [query, page, get, searchReq])

	return (
		<>
			<h1>Vehicles</h1>
			<InputForm onSearch={searchReq}/>

			{loading && <C_Loading/>}

			{error && <AutoAlert hideAfter={10} variant='danger' msg={error}/>}

			{resData && vehiclesData && (
				<>
					{resData.to === null && vehiclesData.length === 0 && <C_zeroResults query={query}/>}
					{vehiclesData.length > 0 && (
						<C_SearchResultData query={query} from={resData.from} to={resData.to} total={resData.total}
																resource={'Vehicles'}/>
					)}
					<ListGroup className='mb-3'>
						<C_VehiclesList data={vehiclesData}/>
					</ListGroup>

					{resData.first_page_url && <Pagination resData={resData}/>}
				</>
			)}
		</>
	)
}
export default Vehicles