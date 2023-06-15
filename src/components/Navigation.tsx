import { NavLink, Link } from 'react-router-dom'
// Style
import swapi from '../../public/swapi100.png'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from "react-bootstrap/Image"

const Navigation = () => {
	return (
		<>
			<Navbar bg="dark" variant="dark" expand="md">
				<Container>
					<Navbar.Brand as={Link} to="/">
						<Image src={swapi} fluid/>
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav"/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link as={NavLink} to="/films?page=1">Films</Nav.Link>
							<Nav.Link as={NavLink} to="/people?page=1">People</Nav.Link>
							<Nav.Link as={NavLink} to="/planets?page=1">Planets</Nav.Link>
							<Nav.Link as={NavLink} to="/species?page=1">Species</Nav.Link>
							<Nav.Link as={NavLink} to="/starships?page=1">Starships</Nav.Link>
							<Nav.Link as={NavLink} to="/vehicles?pages=1">Vehicles</Nav.Link>
							<Nav.Link as={NavLink} to="/search">Search</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}
export default Navigation