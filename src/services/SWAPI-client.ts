import axios from 'axios'
import {Film, FilmPaginationData} from "../types";
import {PeoplePaginationData, Person} from "../types/peoples";



const BASE_URL = 'https://swapi.thehiveresistance.com/api'

export const getFilms = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/films`)
		return response.data as FilmPaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}
export const getFilm = async (id: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/films/${id}`)
		return response.data as Film
	} catch (err: any) {
		throw new Error(err)
	}
}
export const getPeople = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/people`)
		return response.data as PeoplePaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}
export const getPerson = async (id: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/people/${id}`)
		return response.data as Person
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