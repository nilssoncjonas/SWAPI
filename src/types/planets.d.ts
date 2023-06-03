export type PlanetFilm = {
	id: number
	title: string
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
	residents: any[] // TODO Update to type residents
	films: PlanetFilm[]
}

export type PlanetsData = {
	data: Planet[]
}
