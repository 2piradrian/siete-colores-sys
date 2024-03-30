export type BudgetProduct = {
	code: string;
	name: string;
	quantity: number;
	price: number;
	quantityPrice: number;
};

export type Budget = {
	id: string;
	price: number;
	client: string;
	date: Date;
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