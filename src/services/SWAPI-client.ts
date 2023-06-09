import axios from 'axios'

export const BASE_URL = 'https://swapi.thehiveresistance.com/api/'
export const get = async <T>(query: string) => {
	try {
		const response = await axios.get<T>(`${BASE_URL}${query}`)
		return response.data
	} catch (err: any) {
		throw new Error(err)
	}
}