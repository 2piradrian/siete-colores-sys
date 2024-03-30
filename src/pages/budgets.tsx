import AppLayout from "@/layout/AppLayout";
import BudgetEditor from "@/components/organisms/budget-editor/budget-editor";
import React from "react";

export default function Budgets() {
	return (
		<AppLayout title="Presupuestar">
			<BudgetEditor />
		</AppLayout>
	);
}