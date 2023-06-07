export * from "./films"
export * from "./peoples"
export * from "./planets"
export * from "./species"
export * from "./starships"
export * from "./vehicles"

export type PageLink = {
	url: string | null
	label: string
	active: boolean
}

export type PaginationData = {
	current_page: number
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

export type Meta = {
	id: number
	name: string
}

