import { useState } from "react";
import style from "./style.module.css";
import InputLabel from "@/components/atoms/input-label/input-label";
import MainButton from "@/components/atoms/main-button/main-button";
import useProducts from "@/hooks/useProducts";

function PercentSection() {
	const [percent, setPercent] = useState<number>(0);
	const { updatePrices } = useProducts();

	const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const percentData = Object.fromEntries(new FormData(e.currentTarget));

		if (!percentData.oldPrice || !percentData.newPrice) {
			return alert("Debes llenar todos los campos");
		}

		const oldPrice = Number(percentData.oldPrice);
		const newPrice = Number(percentData.newPrice);

		const percent = ((newPrice - oldPrice) / oldPrice) * 100;

		const roundedPercent = parseFloat(percent.toFixed(2));

		setPercent(roundedPercent);
	};

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const percentData = Object.fromEntries(new FormData(e.currentTarget));

		if (!percentData.serie || !percentData.percent) {
			return alert("Debes llenar todos los campos");
		}

		const serie = String(percentData.serie);
		const percent = Number(percentData.percent);

		updatePrices(serie, percent);
	};

	return (
		<div className="container" style={{"justifyContent": "center"}}>
			<h2 className={style.title}>😿 Porcentaje de aumento 😿</h2>
			<form className={style.form} onSubmit={handleCalculate}>
				<InputLabel label="Precio Anterior" type="number" placeholder="1500.00" id="oldPrice" />
				<InputLabel label="Precio Nuevo" type="number" placeholder="3000.50" id="newPrice" />
				<MainButton text="Calcular" type="submit"/>
			</form>
			<p className={style.total}>📈 Porcentaje: {percent.toFixed(2)}% 📈</p>
			<hr className={style.hr} />
			<h2 className={style.title}>🤑 Aumentar precios 🤑</h2>
			<form className={style.form} onSubmit={handleUpdate}>
				<InputLabel label="Serie" type="text" placeholder="A" id="serie" />
				<InputLabel label="Porcentaje" type="number" placeholder="15" id="percent" />
				<MainButton text="Actualizar" type="submit"/>
			</form>
		</div>
	);
}

export default PercentSection;
