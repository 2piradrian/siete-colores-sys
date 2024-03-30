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

export type Statistics = {
	monthQuantity: number;
    yearQuantity: number;
    mostSelledOnMonth: string;
    mostSelledOnYear: string;
    monthTop: {code: string, quantity: number}[];
    yearTop: {code: string, quantity: number}[];
}