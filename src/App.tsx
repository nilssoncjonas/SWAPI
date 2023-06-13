import {Routes, Route} from 'react-router-dom'
// Pages
import Index from './pages/Index.tsx'
import Search from './pages/Search.tsx'
import NotFound from './pages/NotFound.tsx'

import Films from "./pages/Films.tsx";
import SingleFilm from "./pages/SingleFilm.tsx";

import People from "./pages/People.tsx";
import SinglePeople from "./pages/SinglePeople.tsx";

import Planets from "./pages/Planets.tsx";
import SinglePlanets from './pages/SinglePlanets.tsx'

import Species from "./pages/Species.tsx";
import SingleSpecies from "./pages/SingleSpecies.tsx";

import Starships from "./pages/Starships.tsx";
import SingleStarships from "./pages/SingleStarships.tsx";

import Vehicles from "./pages/Vehicles.tsx";
import SingleVehicles from "./pages/SingleVehicles.tsx";
// Components
import Navigation from "./components/Navigation.tsx";
// Style
import Container from "react-bootstrap/Container";
import './assets/scss/App.scss'
import './assets/scss/Intro.scss'


const App = () => {

	return (
		<>
			<Navigation/>
			<Container className='mb-5'>

				<Routes>
					<Route path='/' element={<Index/>}/>

					<Route path='/films'>
						<Route path='' element={<Films/>}/>
						<Route path=':id' element={<SingleFilm/>}/>
					</Route>

					<Route path='/people'>
						<Route path='' element={<People/>}/>
						<Route path=':id' element={<SinglePeople/>}/>
					</Route>

					<Route path='/planets'>
						<Route path='' element={<Planets/>}/>
						<Route path=':id' element={<SinglePlanets/>}/>
					</Route>

					<Route path='/species'>
						<Route path='' element={<Species/>}/>
						<Route path=':id' element={<SingleSpecies/>}/>
					</Route>

					<Route path='/starships'>
						<Route path='' element={<Starships/>}/>
						<Route path=':id' element={<SingleStarships/>}/>
					</Route>

					<Route path='/vehicles'>
						<Route path='' element={<Vehicles/>}/>
						<Route path=':id' element={<SingleVehicles/>}/>
					</Route>

					<Route path='/search' element={<Search/>}/>

					<Route path='*' element={<NotFound/>}/>
				</Routes>
			</Container>
		</>
	)
}

export default App
