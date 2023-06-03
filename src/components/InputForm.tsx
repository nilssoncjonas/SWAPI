import {useState} from "react";
// Style
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const InputForm = () => {

	const [searchInput, setSearchInput] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!searchInput.trim().length) {
			//TODO add error management
			return console.error('WHY YOU DO THAT!?')
		}

	}
	return (
		<>
			<Form className='mb-4' onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your search query"
						required
						onChange={e => setSearchInput(e.target.value)}
						value={searchInput}

					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button variant="success" type="submit" disabled={!searchInput.trim().length}>Search</Button>
				</div>
			</Form>
		</>
	)
}
export default InputForm