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
	// TODO Update to type residents
	residents: any[]
	films: PlanetFilm[]
}

export type PlanetsData = Planet[]

