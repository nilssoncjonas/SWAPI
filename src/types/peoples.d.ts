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
	films: PeopleFilm[]
	species: any[] // TODO Update to type species
	starships: PeopleStarship[]
	vehicles: PeopleVehicle[]
}

export type PeoplesData = {
	data: People[]
}
