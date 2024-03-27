import TableToPrint from "@/components/TableToPrint/TableToPrint";
import useBudget from "@/hooks/useBudget";
import { Budget } from "@/types/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Budget() {
	const { getBudget } = useBudget();
	const [budget, setBudget] = useState<Budget | null>({} as Budget);

	// id from url params
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
		<TableToPrint
			id={id}
			products={budget?.products}
			price={budget?.price}
			total={budget?.total}
		/>
	) : (
		<div>Cargando...</div>
	);
}

export default Budget;
