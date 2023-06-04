import Resources from "../components/Resources.tsx";
import {useLocation} from "react-router-dom";

const Starships = () => {
	const {pathname} = useLocation()

	return (
		<>
			<h1>Starships</h1>
			<Resources path={pathname}/>
		</>
	)
}
export default Starships