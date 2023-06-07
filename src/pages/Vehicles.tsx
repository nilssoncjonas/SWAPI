import Resources from "../components/Resources.tsx";
import {useLocation} from "react-router-dom";
import InputForm from "../components/InputForm.tsx";
import React from "react";

const Vehicles = () => {
	const {pathname} = useLocation()
	return (
		<>
			<h1>Vehicles</h1>
			<InputForm />
			{/*<Resources path={pathname}/>*/}
		</>
	)
}
export default Vehicles