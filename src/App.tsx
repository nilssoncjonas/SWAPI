import {Routes, Route} from 'react-router-dom'
// Pages
import Index from './pages/Index.tsx'
import Films from "./pages/Films.tsx";
import SingleFilm from "./pages/Film.tsx";
import NotFound from './pages/NotFound.tsx'
import People from "./pages/People.tsx";
import Planets from "./pages/Planets.tsx";
import Search from './pages/Search.tsx'
import Species from "./pages/Species.tsx";
import Starships from "./pages/Starships.tsx";
import Vehicles from "./pages/Vehicles.tsx";
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
			<Container>

				<Routes>
					<Route path='/' element={<Index/>}/>
					<Route path='/films' element={<Films/>}/>
					<Route path='/films/:id' element={<SingleFilm/>}/>
					<Route path='/people' element={<People/>}/>
					<Route path='/planets' element={<Planets/>}/>
					<Route path='/species' element={<Species/>}/>
					<Route path='/starships' element={<Starships/>}/>
					<Route path='/vehicles' element={<Vehicles/>}/>
					<Route path='/search' element={<Search/>}/>
					<Route path='*' element={<NotFound/>}/>
				</Routes>
			</Container>
		</>
	)
}

export default App
