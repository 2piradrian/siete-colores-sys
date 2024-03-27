import React from "react";
import style from "./style.module.css";
import { Product } from "@/types/types";

type Props = {
	products: Product[];
	isComplete: boolean;
	onClick: (id: string) => void;
};

function ProductTable({ products, isComplete, onClick }: Props) {
	return (
		<table className={style.productTable}>
			<tbody>
				<tr>
					<th className={style.tableHeader}>Código</th>
					<th className={style.tableHeader}>Nombre</th>
					{isComplete && <th className={style.tableHeader}>Tipo (Categoria)</th>}
					{isComplete && <th className={style.tableHeader}>Peso</th>}
				</tr>
				{products.map((product) => (
					<tr
						className={style.tableRow}
						key={product.id}
						onClick={() => onClick(product.id)}>
						<td className={style.tableCell}>{product.code}</td>
						<td className={style.tableCell}>{product.name}</td>
						{isComplete && <td className={style.tableCell}>{product.type}</td>}
						{isComplete && <td className={style.tableCell}>{product.weight}</td>}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default ProductTable;
