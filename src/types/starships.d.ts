import {FilmsMeta, Meta, PaginationData} from "./index"

export type TSingleStarships = {
	id: number
	name: string
	model: string
	starship_class: string
	manufacturer: string
	cost_in_credits: string
	length: string
	crew: string
	passengers: string
	max_atmosphering_speed: string
	hyperdrive_rating: string
	MGLT: string
	cargo_capacity: string
	consumables: string
	created: string
	edited: string
	pilots: Meta[]
	films: FilmsMeta[]
}
export type TStarships = {
	id: number
	name: string
	model: string
	starship_class: string
	manufacturer: string
	cost_in_credits: string
	length: string
	crew: string
	passengers: string
	max_atmosphering_speed: string
	hyperdrive_rating: string
	MGLT: string
	cargo_capacity: string
	consumables: string
	created: string
	edited: string
	pilots_count: number
	films_count: number
}

export type StarshipsData = TStarships[]

export type StarshipsPaginationData = PaginationData & {
	data: StarshipsData
}