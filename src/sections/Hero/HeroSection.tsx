import React from "react";
import style from "./style.module.css";
import Statistics from "@/components/Statistics/Statistics";

function HeroSection() {
	const getMonth = () => {
		return new Intl.DateTimeFormat("es-ES", { month: "long" }).format(new Date());
	};

	return (
		<div className="bigcontainer">
			<h2>Bienvenido,</h2>
			<h1 className={style.h1}>Siete Colores</h1>
			<h3 className={style.h3}>Estadísticas del mes de {getMonth()}</h3>
			<Statistics />
		</div>
	);
}

export default HeroSection;
