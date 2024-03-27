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

/* From backend */
export type Product = {
	id: string;
	code: string;
	name: string;
	type: string;
	size: string;
	weight: number;
};

/* To edit backend */
export type ProductForm = {
	code: string;
	name: string;
	type: string;
	size: string;
	weight: number;
};
