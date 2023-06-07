import {FilmsMeta, Meta, PaginationData} from "./index"

export type TVehicles = {
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
export type TSingleVehicles = {
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
	pilots: Meta[]
	films: FilmsMeta[]
}

export type VehiclesData = TVehicles[]

export type VehiclePaginationData = PaginationData & {
	data: VehiclesData
}