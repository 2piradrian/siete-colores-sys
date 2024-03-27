import { useState } from "react";
import style from "./style.module.css";

function PercentSection() {
	const [percent, setPercent] = useState<number>(0);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

	return (
		<div className="bigcontainer">
			<h2 className={style.title}>😿 Porcentaje de aumento 😿</h2>
			<form className={style.form} onSubmit={handleSubmit}>
				<input
					type="number"
					placeholder="Precio Anterior"
					name="oldPrice"
					className={style.input}
				/>
				<input
					type="number"
					placeholder="Precio Nuevo"
					name="newPrice"
					className={style.input}
				/>
				<button type="submit" className={style.button}>
					Calcular
				</button>
			</form>
			<p className={style.total}>📈 Porcentaje: {percent.toFixed(2)}% 📈</p>
		</div>
	);
}

export default PercentSection;
