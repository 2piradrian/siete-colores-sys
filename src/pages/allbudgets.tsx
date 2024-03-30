import AppLayout from "@/layout/AppLayout";
import BudgetList from "@/components/organism/budget-list/budget-list";
import React from "react";

function AllBudgets() {
	return (
		<AppLayout title="Presupuestos">
			<BudgetList />
		</AppLayout>
	);
}

export default AllBudgets;
