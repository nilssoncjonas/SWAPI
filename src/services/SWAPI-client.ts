import axios from 'axios'
import {
	TSingleFilm,	TSinglePeople, TSinglePlanet, TSingleSpecies,
	FilmPaginationData,	PeoplePaginationData, PlanetsPaginationData, SpeciesPaginationData
} from "../types";




const BASE_URL = 'https://swapi.thehiveresistance.com/api'

export const getFilms = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/films`)
		return response.data as FilmPaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}
export const getSingleFilm = async (id: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/films/${id}`)
		return response.data as TSingleFilm
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
export const getSinglePeople = async (id: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/people/${id}`)
		return response.data as TSinglePeople
	} catch (err: any) {
		throw new Error(err)
	}
}
export const getPlanets = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/planets`)
		return response.data as PlanetsPaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}
export const getSinglePlanets = async (id: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/planets/${id}`)
		return response.data as TSinglePlanet

	} catch (err: any) {
		throw new Error(err)
	}
}
export const getSpecies = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/species`)
		return response.data as SpeciesPaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}
export const getSingleSpecies = async (id: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/species/${id}`)
		return response.data as TSingleSpecies

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