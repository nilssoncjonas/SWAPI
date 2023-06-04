import {FilmData} from "./films";
import {PeoplesData} from "./peoples";
import {PlanetsData} from "./planets";
import {SpeciesData} from "./species";
import {StarshipsData} from "./starships";
import {VehiclesData} from "./vehicles";

export type PageLink = {
	url: string | null
	label: string
	active: boolean
}

export type PaginationData = {
	current_page: number
	data: FilmData | PeoplesData | PlanetsData | SpeciesData | StarshipsData | VehiclesData
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
