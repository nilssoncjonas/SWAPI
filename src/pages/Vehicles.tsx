import Resources from "../components/Resources.tsx";
import {useLocation} from "react-router-dom";

const Vehicles = () => {
	const {pathname} = useLocation()
	return (
		<>
			<h1>Vehicles</h1>
			<Resources path={pathname}/>
		</>
	)
}
export default Vehicles