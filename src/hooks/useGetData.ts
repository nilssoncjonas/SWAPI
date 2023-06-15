import {useCallback, useEffect, useState} from "react"
import * as SWAPI from '../services/SWAPI-client.ts'

const useGetData = <ResponseType>(initialUrl: string | null = null) => {
	const [resData, setResData] = useState<ResponseType | null>(null)
	const [url, setUrl] = useState<string | null>(initialUrl)
	const [error, setError] = useState<string | null>(null)
	const [isError, setIsError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const execute = () => {
		if (!url) {
			return
		}
		getData(url)
	}

	const getData = useCallback(async (resourceUrl: string) => {
		setResData(null)
		setError(null)
		setIsError(false)
		setIsLoading(true)
		try {
			const res = await SWAPI.get<ResponseType>(resourceUrl)
			setResData(res)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message)
			setIsError(true)
		}
		setIsLoading(false)
	},[])

	useEffect(() => {
		if (!url) {
			return
		}
		getData(url)
	}, [url, getData])

	return {
		resData,
		error,
		execute,
		isLoading,
		isError,
		setUrl,
	}
}

export default useGetData
