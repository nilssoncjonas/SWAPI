import {Link} from "react-router-dom"
// Style
import vader from '../assets/img/darth-vader.webp'
import {Button} from "react-bootstrap"
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
const NotFound = () => {
	return (
		<>
			<h1>404 | NotFound</h1>
			<Container className='text-center'>

				<Image className='mb-4 w-25' src={vader}/>
				<h2>I Find Your Lack Of Navigation Disturbing</h2>
				<Link to="/" >
					<Button variant="danger">Help me, Obi-Wan Kenobi. You're my only hope.</Button>
				</Link>
			</Container>
		</>
	)
}
export default NotFound