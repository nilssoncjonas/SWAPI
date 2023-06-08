import {useEffect, useRef, useState} from "react";
// Style
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'



interface IProp {
	onSearch: (query: string) => void
}

const InputForm:React.FC<IProp>= ({onSearch}) => {

	const [searchInput, setSearchInput] = useState('')
	const searchInputRef = useRef<HTMLInputElement>(null)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!searchInput.trim().length) {
			//TODO add error management
			return console.error('WHY YOU DO THAT!?')
		}
		onSearch(searchInput)
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
				</div>
			</Form>
		</>
	)
}
export default InputForm