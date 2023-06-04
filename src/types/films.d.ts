export type Character = {
	id: number
	name: string
}

export type Planet = {
	id: number
	name: string
}

export type Starship = {
	id: number
	name: string
}

export type Vehicle = {
	id: number
	name: string
}

export type Species = {
	id: number
	name: string
}

export type Film = {
	id: number
	title: string
	episode_id: string
	opening_crawl: string
	director: string
	producer: string
	release_date: string
	created: string
	edited: string
	characters: Character[]
	planets: Planet[]
	starships: Starship[]
	vehicles: Vehicle[]
	species: Species[]
}

export type FilmData = Film[]

export type PageLink = {
	url: string | null
	label: string
	active: boolean
}

export type FilmPaginationData = {
	current_page: number
	data: FilmData
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