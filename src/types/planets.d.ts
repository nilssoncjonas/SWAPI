import {PageLink} from "./index";

export type PlanetFilm = {
	id: number
	title: string
}

export type PlanetResidents = {
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
}

export type Planet = {
	id: number
	name: string
	rotation_period: string
	orbital_period: string
	diameter: string
	climate: string
	gravity: string
	terrain: string
	surface_water: string
	population: string
	created: string
	edited: string
	residents: PlanetResidents[]
	films: PlanetFilm[]
}

export type Planets = {
	id: number
	name: string
	rotation_period: string
	orbital_period: string
	diameter: string
	climate: string
	gravity: string
	terrain: string
	surface_water: string
	population: string
	created: string
	edited: string
	residents_count: number
	films_count: number
}

export type PlanetsData = Planets[]

export type PlanetsPaginationData = {
	current_page: number
	data: PlanetsData
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