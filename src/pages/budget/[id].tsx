import PrintTable from "@/components/molecules/print-table/print-table";
import useBudget from "@/hooks/useBudget";
import { Budget } from "@/types/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Budget() {
	const { getBudget } = useBudget();
	const [budget, setBudget] = useState<Budget | undefined>({} as Budget);

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		const getAsyncBudget = async (id: string) => {
			const budgetFromDatabase = await getBudget(id);
			return budgetFromDatabase;
		};

		if (id) {
			getAsyncBudget(id as string).then((budget) => {
				setBudget(budget);
			});
		}
	}, [id]);

	return budget?.products ? (
		<>
		<head>
			<title key="title">{"Siete Colores | Presupuesto"}</title>
		</head>
		<PrintTable
			id={id}
			products={budget?.products}
			total={budget?.total}
			/>
		</>
	) : (
		<div>Cargando...</div>
	);
}

export default Budget;
