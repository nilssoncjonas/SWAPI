import Resources from "../components/Resources.tsx";

import {useLocation} from "react-router-dom";

const People = () => {
	const {pathname} = useLocation()

	return (
		<>
			<h1>People</h1>
			<Resources path={pathname}/>
		</>
	)
}
export default People