import { Product } from "@/types/types";
import style from "./style.module.css";
import React from "react";

function ProductCard({ id, code, name, type, size, weight }: Product) {
	return (
		<tr className={style.container}>
			<td className={style.id}>{code}</td>
			<td className={style.name}>{name}</td>
			<td className={style.type}>{type}</td>
			<td className={style.weight}>Peso : {weight} gramos</td>
		</tr>
	);
}

export default ProductCard;
