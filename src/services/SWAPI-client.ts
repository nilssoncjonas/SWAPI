import axios from 'axios'
import {
	TSingleFilm,
	TSinglePeople,
	TSinglePlanet,
	TSingleSpecies,
	TSingleStarships,
	TSingleVehicles,
	FilmPaginationData,
	PeoplePaginationData,
	PlanetsPaginationData,
	SpeciesPaginationData,
	StarshipsPaginationData,
	VehiclePaginationData,
} from "../types";


const BASE_URL = 'https://swapi.thehiveresistance.com/api'

export const getFilms = async (page: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/films?page=${page}`)
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
export const getPeople = async (page: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/people?page=${page}`)
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
export const getPlanets = async (page: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/planets?page=${page}`)
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
export const getSpecies = async (page: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/species?page=${page}`)
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

export const getStarships = async (page: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/starships?page=${page}`)
		return response.data as StarshipsPaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}
export const getSingleStarships = async (id: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/starships/${id}`)
		return response.data as TSingleStarships

	} catch (err: any) {
		throw new Error(err)
	}
}
export const getVehicles = async (page: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/vehicles?page=${page}`)
		return response.data as VehiclePaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}
export const getSingleVehicles = async (id: number) => {
	try {
		const response = await axios.get(`${BASE_URL}/vehicles/${id}`)
		return response.data as TSingleVehicles
	} catch (err: any) {
		throw new Error(err)
	}
}
export const searchFilms = async (query: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/films/?search=${query}`)
		return response.data as FilmPaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}

export const searchPeople = async (query: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/people/?search=${query}`)
		return response.data as PeoplePaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}

export const searchPlanets = async (query: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/planets/?search=${query}`)
		return response.data as PlanetsPaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}

export const searchSpecies = async (query: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/species/?search=${query}`)
		return response.data as SpeciesPaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}

export const searchStarships = async (query: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/starships/?search=${query}`)
		return response.data as StarshipsPaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}

export const searchVehicles = async (query: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/vehicles/?search=${query}`)
		return response.data as VehiclePaginationData
	} catch (err: any) {
		throw new Error(err)
	}
}