import AllBudgetsTable from "@/components/molecules/budgets-table/budgets-table";
import Title from "@/components/Title/Title";
import useBudget from "@/hooks/useBudget";

function AllBudgetsSection() {
	const { budgetList } = useBudget();

	return (
		<div className="container">
			<Title title="Lista de presupuestos" />
			<AllBudgetsTable budgets={budgetList} />
		</div>
	);
}

export default AllBudgetsSection;
