import React from "react";
import style from "./style.module.css";
import { Budget } from "@/types/types";
import { useRouter } from "next/router";

type Props = {
	budgets: Budget[];
};

function AllBudgetsTable({ budgets }: Props) {
	const sortedBudgets = budgets.sort((a, b) => {
		const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
		const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
		return dateB.getTime() - dateA.getTime();
	});

	const router = useRouter();

	return (
		<table className={style.budgetsTable}>
			<tbody>
				<tr>
					<th className={style.tableHeader}>Orden</th>
					<th className={style.tableHeader}>Cliente</th>
					<th className={style.tableHeader}>Fecha</th>
					<th className={style.tableHeader}>Cant. Productos</th>
					<th className={style.tableHeader}>Cant. Material</th>
					<th className={style.tableHeader}>Total</th>
				</tr>
				{sortedBudgets.map((budget, index) => {
					const createdAtDate = new Date(budget.createdAt);

					const day = createdAtDate.getDate();
					const month = createdAtDate.getMonth() + 1;
					const year = createdAtDate.getFullYear();

					const formattedDate = `${day}-${month}-${year}`;

					// suma de todas las cantidades de cada producto
					const quantity = budget.products.reduce((acc, product) => {
						return acc + product.quantity;
					}, 0);

					// suma de la cantidad de peso de cada producto
					const weight = budget.products.reduce((acc, product) => {
						return acc + product.weight * product.quantity;
					}, 0);

					return (
						<tr
							className={style.tableRow}
							key={budget.id}
							onClick={() => {
								router.push(`/budget/${budget.id}`);
							}}>
							<td className={style.tableCell}>{index + 1}</td>
							<td className={style.tableCell}>{budget.client}</td>
							<td className={style.tableCell}>{formattedDate}</td>
							<td className={style.tableCell}>{quantity}</td>
							<td className={style.tableCell}>{weight} gr.</td>
							<td className={style.tableCell}>${budget.total}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default AllBudgetsTable;
