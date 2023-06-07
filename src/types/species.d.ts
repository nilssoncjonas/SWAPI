import {PageLink} from "./index";

export type SpeciesPerson = {
	id: number
	name: string
}

export type SpeciesHomeworld = {
	id: number
	name: string
}

export type SpeciesFilm = {
	id: number
	title: string
}

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
	people: SpeciesPerson[]
	homeworld: SpeciesHomeworld | null
	films: SpeciesFilm[]
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
	homeworld: SpeciesHomeworld
}

export type SpeciesData = TSpecies[]

export type SpeciesPaginationData = {
	current_page: number
	data: SpeciesData
	first_page_url: string
	from: number
	last_page: number
	last_page_url: string
	links: PageLink[]
	next_page_url: string | null
	path: string
	per_page: number
	prev_page_url: string | null
	to: number
	total: number
}