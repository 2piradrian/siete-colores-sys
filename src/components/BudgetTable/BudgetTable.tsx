import React from "react";
import style from "./style.module.css";
import { BudgetProduct } from "@/types/types";

type Props = {
	products: BudgetProduct[];
	onClick?: (id: string) => void;
	price: number;
};

function BudgetTable({ products, price, onClick }: Props) {
	return (
		<table className={style.productTable}>
			<tbody>
				<tr>
					<th className={style.tableHeader}>Código</th>
					<th className={style.tableHeader}>Nombre</th>
					<th className={style.tableHeader}>Cant.</th>
					<th className={style.tableHeader}>Precio U.</th>
					<th className={style.tableHeader}>Precio T.</th>
				</tr>
				{products.map((product, index) => {
					return (
						<>
							<tr
								className={style.tableRow}
								key={product.code}
								onClick={onClick ? () => onClick(product.code) : () => {}}>
								<td className={style.tableCell}>{product.code}</td>
								<td className={style.tableCell}>{product.name}</td>
								<td className={style.tableCell}>{product.quantity}</td>
								<td className={style.tableCell}>
									$ {parseFloat((product.weight * price).toFixed(2)).toString()}
								</td>
								<td className={style.tableCell}>
									${" "}
									{parseFloat(
										(product.weight * price * product.quantity).toFixed(2)
									).toString()}
								</td>
							</tr>
						</>
					);
				})}
			</tbody>
		</table>
	);
}

export default BudgetTable;
