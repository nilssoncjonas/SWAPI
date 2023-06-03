import axios from 'axios'


const BASE_URL = 'https://swapi.thehiveresistance.com/api/'

/**
 * Execute an HTTP GET request to an endpoint.
 *
 * @param {string} endpoint Endpoint to HTTP GET
 * @returns Promise
 */
export const get = async <PaginationData>(endpoint: string) => {
	console.log('endpoint:', endpoint)
	try {
		const response = await axios.get(`${BASE_URL}${endpoint}`)
		return response.data as PaginationData

	} catch (err: any) {
		throw new Error(err)
	}
}

/**
 * TODO Replace 'any' with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const search = async (query: string, page: number) => {
	return get<any>(`/search?query=${query}&tags=story&page=${page}`)
}