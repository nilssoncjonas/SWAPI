import {Routes, Route} from 'react-router-dom'
// Pages
import Index from './pages/Index.tsx'
import Search from './pages/Search.tsx'
import NotFound from './pages/NotFound.tsx'
// Components
import Navigation from "./components/Navigation.tsx";
// Style
import Container from "react-bootstrap/Container";
import './assets/scss/App.scss'

const App = () => {

	return (
		<>
			<Navigation/>
			<Container py-3>

				<Routes>
					<Route path='/' element={<Index/>}/>
					<Route path='/search' element={<Search/>}/>
					<Route path='*' element={<NotFound/>}/>
				</Routes>
			</Container>
		</>
	)
}

export default App
