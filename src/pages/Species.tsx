import Resources from "../components/Resources.tsx";
import {useLocation} from "react-router-dom";

const Species = () => {
	const {pathname} = useLocation()

	return (
		<>
			<h1>Species</h1>
			<Resources path={pathname}/>
		</>
	)
}
export default Species