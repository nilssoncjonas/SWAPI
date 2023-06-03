import {Link} from "react-router-dom";
// Style
import {Button} from "react-bootstrap";

const NotFound = () => {
	return (
		<>
			<h1>404 | NotFound</h1>
			<div>
				<p>I Find Your Lack Of Navigation Disturbing</p>
				<Link to="/" >
					<Button variant="secondary">Help me, Obi-Wan Kenobi. You're my only hope.</Button>
				</Link>
			</div>
		</>
	)
}
export default NotFound