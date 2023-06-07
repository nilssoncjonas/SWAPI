import {Meta, PaginationData} from "./index"

export type TFilms = {
	id: number
	title: string
	episode_id: string
	opening_crawl: string
	director: string
	producer: string
	release_date: string
	created: string
	edited: string
	characters_count: number | null
	planets_count: number | null
	starships_count: number | null
	vehicles_count: number | null
	species_count: number | null
}

export type TSingleFilm = {
	id: number
	title: string
	episode_id: string
	opening_crawl: string
	director: string
	producer: string
	release_date: string
	created: string
	edited: string
	characters: Meta[]
	planets: Meta[]
	starships: Meta[]
	vehicles: Meta[]
	species: Meta[]
}

export type FilmsData = TFilms[]

export type FilmPaginationData = PaginationData & {
	data: FilmsData
}

export type FilmsMeta = {
	id: number
	title: string
}