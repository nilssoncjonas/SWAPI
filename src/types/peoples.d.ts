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
	// TODO
	films: PeopleFilm[]
	// TODO Update to type species
	species?: any[]
	// TODO
	starships: PeopleStarship[]
	// TODO
	vehicles: PeopleVehicle[]
}

export type PeoplesData = People[]

