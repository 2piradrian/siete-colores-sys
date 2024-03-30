import React from "react";
import style from "./style.module.css";
import { Budget } from "@/types/types";
import { useRouter } from "next/router";

type Props = {
	budgets: Budget[];
};

export default function BudgetsTable({ budgets }: Props) {
	const router = useRouter();

	return (
		<table className={style.budgetsTable}>
			<tbody>
				<tr>
					<th className={style.tableHeader}>Cliente</th>
					<th className={style.tableHeader}>Fecha</th>
					<th className={style.tableHeader}>Total</th>
				</tr>
				{budgets.map((budget) => {
					const createdAtDate = new Date(budget.date);

					const day = createdAtDate.getDate();
					const month = createdAtDate.getMonth() + 1;
					const year = createdAtDate.getFullYear();

					const formattedDate = `${day}-${month}-${year}`;

					return (
						<tr
							className={style.tableRow}
							key={budget.id}
							onClick={() => {
								router.push(`/budget/${budget.id}`);
							}}>
							<td className={style.tableCell}>{budget.client}</td>
							<td className={style.tableCell}>{formattedDate}</td>
							<td className={style.tableCell}>${budget.total}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}