import useBudget from "./useBudget";

function useStatistics() {
	const { budgetList: budgets } = useBudget();

	const budgetsFromThisMonth = budgets.filter((budget) => {
		const budgetDate = new Date(budget.createdAt);
		const today = new Date();
		return (
			budgetDate.getMonth() === today.getMonth() &&
			budgetDate.getFullYear() === today.getFullYear()
		);
	});

	const productsFromThisYear = budgets.filter((budget) => {
		const budgetDate = new Date(budget.createdAt);
		const today = new Date();
		return budgetDate.getFullYear() === today.getFullYear();
	});

	const soldProductsByMonth = budgetsFromThisMonth.flatMap((budget) => budget.products);
	const soldProductsByYear = productsFromThisYear.flatMap((budget) => budget.products);

	const productSalesByYear: Record<string, number> = soldProductsByYear.reduce(
		(salesByProduct: Record<string, number>, product) => {
			if (!salesByProduct[product.code]) {
				salesByProduct[product.code] = 0;
			}
			salesByProduct[product.code] += product.quantity;
			return salesByProduct;
		},
		{}
	);
	const topProductsByYear = Object.entries(productSalesByYear)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([code, sales]) => ({ code, sales }));

	const productSalesByMonth: Record<string, number> = soldProductsByMonth.reduce(
		(salesByProduct: Record<string, number>, product) => {
			if (!salesByProduct[product.code]) {
				salesByProduct[product.code] = 0;
			}
			salesByProduct[product.code] += product.quantity;
			return salesByProduct;
		},
		{}
	);
	const topProductsByMonth = Object.entries(productSalesByMonth)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([code, sales]) => ({ code, sales }));

	const totalProductsSoldByMonth = soldProductsByMonth.reduce(
		(total, product) => total + product.quantity,
		0
	);
	const totalProductsSoldByYear = soldProductsByYear.reduce(
		(total, product) => total + product.quantity,
		0
	);

	const gramsSoldInMonth = soldProductsByMonth.reduce(
		(total, product) => total + product.quantity * product.weight,
		0
	);

	return {
		gramsSoldInMonth,
		topProductsByYear,
		topProductsByMonth,
		totalProductsSoldByMonth,
		totalProductsSoldByYear,
	};
}

export default useStatistics;
