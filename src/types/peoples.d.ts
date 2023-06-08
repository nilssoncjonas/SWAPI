import {FilmsMeta, Meta, PaginationData} from "./index"

export type TSinglePeople = {
	id: number
	name: string
	birth_year: string
	eye_color: string
	hair_color: string
	height: string
	mass: string
	skin_color: string
	created: string
	edited: string
	homeworld: {
		id: number
		name: string
	}
	films: FilmsMeta[]
	species: []
	starships: Meta[]
	vehicles: Meta[]
}

export type TPeople = {
	id: number
	name: string
	birth_year: string
	eye_color: string
	hair_color: string
	height: string
	mass: string
	skin_color: string
	created: string
	edited: string
	homeworld: {
		id: number
		name: string
	}
	films_count: number
	species_count: number
	starships_count: number
	vehicles_count: number
}

export type PeoplesData = TPeople[]

export type PeoplePaginationData = PaginationData & {
	data: PeoplesData
}