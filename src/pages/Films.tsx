
import {useLocation} from "react-router-dom"
// Components
import Resources from "../components/Resources.tsx";


const Films = () => {
	const {pathname} = useLocation()

	// TODO receive data to render



	return (
		<>
			<h1>Films</h1>
			<Resources path={pathname}/>


		</>
	)
}
export default Films