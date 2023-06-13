import {useEffect, useRef, useState} from "react";
import { useLocation, useNavigate} from "react-router-dom";
// Style
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

interface IProp {
	onSearch: (query: string, page?: number) => void
}

const InputForm:React.FC<IProp>= ({onSearch}) => {

	const [searchInput, setSearchInput] = useState('')
	const searchInputRef = useRef<HTMLInputElement>(null)
	const {pathname} = useLocation()
	const navigate = useNavigate()
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!searchInput.trim().length) {
			//TODO add error management
			return console.error('WHY YOU DO THAT!?')
		}
		onSearch(searchInput)
	}
	const restore = () => {
		setSearchInput('')
		if (pathname.split('/').length - 1 === 2) {
			const path = pathname.split('/')
			path.splice(2)
			const url = path.join('/')
			navigate(url)
		} else {
			navigate(pathname)
		}
	}
	useEffect(() => {
		searchInputRef.current?.focus()
	}, [])
	return (
		<>
			<Form className='mb-4' onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						ref={searchInputRef}
						type="text"
						placeholder="Enter your search query"
						required
						onChange={e => setSearchInput(e.target.value)}
						value={searchInput}
					/>
					</Form.Group>
				<div className="d-flex justify-content-center">
					<Button variant="warning" type="submit" disabled={!searchInput.trim().length}>Search</Button>
					<Button variant="danger" type="button" className='mx-3' onClick={() => restore()} >Restore</Button>
				</div>
			</Form>
		</>
	)
}
export default InputForm