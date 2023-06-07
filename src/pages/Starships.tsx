import React from "react";
import {useLocation} from "react-router-dom";
import InputForm from "../components/InputForm.tsx";

const Starships = () => {
	const {pathname} = useLocation()

	return (
		<>
			<h1>Starships</h1>
			<InputForm />
			{/*<Resources path={pathname}/>*/}
		</>
	)
}
export default Starships