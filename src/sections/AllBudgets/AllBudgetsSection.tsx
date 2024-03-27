import AllBudgetsTable from "@/components/AllBudgetsTable/AllBudgetsTable";
import Title from "@/components/Title/Title";
import useBudget from "@/hooks/useBudget";

function AllBudgetsSection() {
	const { budgetList } = useBudget();

	return (
		<div className="bigcontainer">
			<Title title="Lista de presupuestos" />
			<AllBudgetsTable budgets={budgetList} />
		</div>
	);
}

export default AllBudgetsSection;
