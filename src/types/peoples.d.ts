import {PageLink} from "./index";

export type PeopleFilm = {
	id: number
	title: string
}

export type PeopleStarship = {
	id: number
	name: string
}

export type PeopleVehicle = {
	id: number
	name: string
}

export type Person = {
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
	films: PeopleFilm[]
	species: [] | null
	starships: PeopleStarship[]
	vehicles: PeopleVehicle[]
}

export type People = {
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

export type PeoplesData = People[]

export type PeoplePaginationData = {
	current_page: number
	data: PeoplesData
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