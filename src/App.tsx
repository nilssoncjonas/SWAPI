import {Routes, Route} from 'react-router-dom'
import Index from './pages/Index.tsx'
import Search from './pages/Search.tsx'
import NotFound from './pages/NotFound.tsx'
import './assets/scss/App.scss'

const App = () => {

	return (
		<>
			<Routes>
				<Route path='/' element={<Index/>}/>
				<Route path='/search' element={<Search/>}/>
				<Route path='*' element={<NotFound/>}/>
			</Routes>
		</>
	)
}

export default App
