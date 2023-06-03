export type VehicleFilm = {
	id: number
	title: string
}

export type Vehicle = {
	id: number
	name: string
	model: string
	vehicle_class: string
	manufacturer: string
	length: string
	cost_in_credits: string
	crew: string
	passengers: string
	max_atmosphering_speed: string
	cargo_capacity: string
	consumables: string
	created: string
	edited: string
	pilots: any[] // TODO Update to type pilots
	films: VehicleFilm[]
}

export type VehiclesData = {
	data: Vehicle[]
}
