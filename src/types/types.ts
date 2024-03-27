export type BudgetProduct = {
	code: string;
	name: string;
	quantity: number;
	weight: number;
};

export type Budget = {
	id: string;
	price: number;
	client: string;
	createdAt: Date;
	products: BudgetProduct[];
	total: number;
};

export type Product = {
	code: string;
	name: string;
	category: string;
	size: string;
	price: number;
};