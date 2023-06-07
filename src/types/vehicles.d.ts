import {Meta, PaginationData} from "./index"

export type TVehicle = {
	id: number
	name: string
	model: string
	vehicle_class: string
	manufacturer: string
	length: string
	cost_in_credits: string
	crew: string
	passengers: string
	max_atmosphering_speed: string
	cargo_capacity: string
	consumables: string
	created: string
	edited: string
	pilots_count: number
	films_count: number
}
export type TSingleVehicle = {
	id: number
	name: string
	model: string
	vehicle_class: string
	manufacturer: string
	length: string
	cost_in_credits: string
	crew: string
	passengers: string
	max_atmosphering_speed: string
	cargo_capacity: string
	consumables: string
	created: string
	edited: string
	pilots_count: Meta[]
	films_count: Meta[]
}

export type VehiclesData = TVehicle[]

export type VehiclePaginationData = PaginationData & {
	data: VehiclesData
}