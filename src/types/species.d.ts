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

export type Species = {
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
	homeworld: SpeciesHomeworld
	films: SpeciesFilm[]
}

export type SpeciesData = {
	data: Species[]
}
