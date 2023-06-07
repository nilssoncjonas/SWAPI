import {FilmsMeta, Meta, PaginationData} from "./index"

export type TSingleSpecies = {
	id: number
	name: string
	classification: string
	designation: string
	average_height: string
	average_lifespan: string
	eye_colors: string
	hair_colors: string
	skin_colors: string
	language: string
	created: string
	edited: string
	people: Meta[]
	homeworld: Meta | null
	films: FilmsMeta[]
}
export type TSpecies = {
	id: number
	name: string
	classification: string
	designation: string
	average_height: string
	average_lifespan: string
	eye_colors: string
	hair_colors: string
	skin_colors: string
	language: string
	created: string
	edited: string
	people_count: number
	films_count: number
	homeworld: Meta
}

export type SpeciesData = TSpecies[]

export type SpeciesPaginationData = PaginationData & {
	data: SpeciesData

}