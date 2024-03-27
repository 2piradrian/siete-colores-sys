import AppLayout from "@/layout/AppLayout";
import BudgetSection from "@/sections/Budget/BudgetSection";
import React from "react";

function Budgets() {
	return (
		<AppLayout title="Presupuestar">
			<BudgetSection />
		</AppLayout>
	);
}

export default Budgets;
