import AppLayout from "@/layout/AppLayout";
import AllBudgetsSection from "@/sections/AllBudgets/AllBudgetsSection";
import React from "react";

function AllBudgets() {
	return (
		<AppLayout title="Presupuestos">
			<AllBudgetsSection />
		</AppLayout>
	);
}

export default AllBudgets;
