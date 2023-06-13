import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import InputForm from "../components/InputForm.tsx"

const Search = () => {
	const [selectedOption, setSelectedOption] = useState<string>('');
	const navigate = useNavigate()

	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(e.currentTarget.value);
	}
	const onSearch = async (query: string) => {
		navigate(`/${selectedOption}/?page=1&search=${query}`)
	}

	return (
		<>
			<h1 className='my-3 text-center'>Search your feelings, you know it to be true!</h1>
			<div className='my-5'>
				<select value={selectedOption} onChange={handleOptionChange} className='d-block mx-auto'>
					<option value="">An option, select you must, a wise decision it would be</option>
					<option value="films">Films 🎬</option>
					<option value="people">People 🧑🏼‍🦱</option>
					<option value="planets">Planets 🌒</option>
					<option value="species">Species 👽</option>
					<option value="starships">Starships 🚀</option>
					<option value="vehicles">Vehicles 🚗</option>
				</select>
			</div>
			{selectedOption && <InputForm onSearch={onSearch}/>}
		</>
	)
}
export default Search