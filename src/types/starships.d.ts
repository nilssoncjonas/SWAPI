export type StarshipFilm = {
	id: number
	title: string
}

export type Starship = {
	id: number
	name: string
	model: string
	starship_class: string
	manufacturer: string
	cost_in_credits: string
	length: string
	crew: string
	passengers: string
	max_atmosphering_speed: string
	hyperdrive_rating: string
	MGLT: string
	cargo_capacity: string
	consumables: string
	created: string
	edited: string
	pilots: any[] // TODO Update to type pilots
	films: StarshipFilm[]
}

export type StarshipsData = {
	data: Starship[]
}
