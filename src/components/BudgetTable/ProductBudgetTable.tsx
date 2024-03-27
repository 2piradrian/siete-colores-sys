import React from "react";
import style from "./style.module.css";
import { Product } from "@/types/types";

type Props = {
	products: Product[];
	onClick: (id: string) => void;
};

function ProductBudgetTable({ products, onClick }: Props) {
	return (
		<table className={style.productTable}>
			<tbody>
				<tr>
					<th className={style.tableHeader}>Código</th>
					<th className={style.tableHeader}>Nombre</th>
					<th className={style.tableHeader}>Peso</th>
				</tr>
				{products.map((product) => (
					<tr
						className={style.tableRow}
						key={product.code}
						onClick={() => onClick(product.code)}>
						<td className={style.tableCell}>{product.code}</td>
						<td className={style.tableCell}>{product.name}</td>
						<td className={style.tableCell}>{product.weight}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default ProductBudgetTable;
