import React from "react";
import style from "./style.module.css";
import Stats from "./stats";

export default function Statistics() {
	const getMonth = () => {
		return new Intl.DateTimeFormat("es-ES", { month: "long" }).format(new Date());
	};

	return (
		<div className="container" style={{"justifyContent": "center"}}>
			<h2>Bienvenido,</h2>
			<h1 className={style.h1}>Siete Colores</h1>
			<h3 className={style.h3}>Estadísticas del mes de {getMonth()}</h3>
			<Stats />
		</div>
	);
}