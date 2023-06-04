import Resources from "../components/Resources.tsx";
import {useLocation} from "react-router-dom";

const Planets = () => {
	const {pathname} = useLocation()

	return (
		<>
			<h1>Planets</h1>
			<Resources path={pathname}/>
		</>
	)
}
export default Planets