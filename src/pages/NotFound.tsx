import {Link} from "react-router-dom"
// Style
import {Button} from "react-bootstrap"

const NotFound = () => {
	return (
		<>
			<h1>404 | NotFound</h1>
			<div>
				<h2>I Find Your Lack Of Navigation Disturbing</h2>
				<Link to="/" >
					<Button variant="secondary">Help me, Obi-Wan Kenobi. You're my only hope.</Button>
				</Link>
			</div>
		</>
	)
}
export default NotFound