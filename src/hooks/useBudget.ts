import { Budget, BudgetProduct, Product } from "@/types/types";
import { useEffect, useState } from "react";
import useProducts from "./useProducts";
import axios, { AxiosResponse } from "axios";

function useBudget() {
	const { products } = useProducts();

	const [budgetList, setBudgetList] = useState<Budget[]>([]);

	const [budget, setBudget] = useState<Budget>({
		id: "",
		client: "",
		price: 0,
		createdAt: new Date(),
		products: [],
		total: 0,
	});

	useEffect(() => {
		const getBudgets = async () => {
			const response: AxiosResponse<Budget[]> = await instance.get("");
			setBudgetList(response.data);
		};
		getBudgets();
	}, []);

	const instance = axios.create({
		baseURL: "http://localhost:3333/budgets",
	});

	const createBudget = async (): Promise<Product | null> => {
		if (budget.products.length === 0 || !budget.price || !budget.client) {
			alert("No se puede crear un presupuesto sin productos, precio o cliente");
			return null;
		}
		try {
			const response: AxiosResponse<Product> = await instance.post("", { budget });
			if (response.data) {
				alert("Presupuesto creado con éxito");
			}
			return response.data;
		} catch (error) {
			alert("Error al crear el presupuesto");
			return null;
		}
	};

	const getBudget = async (id: string): Promise<Budget | null> => {
		try {
			const response: AxiosResponse<Budget> = await instance.get(`/${id}`);
			return response.data;
		} catch (error) {
			alert("Error al obtener el presupuesto");
			return null;
		}
	};

	const deleteBudget = async (id: string): Promise<Budget | null> => {
		try {
			const response: AxiosResponse<Budget> = await instance.delete(`/${id}`);
			alert("Presupuesto eliminado con éxito");
			return response.data;
		} catch (error) {
			alert("Error al eliminar el presupuesto");
			return null;
		}
	};

	const addProduct = (code: string) => {
		const existingProduct = budget.products.find((product) => product.code === code);

		if (existingProduct) {
			// Si el producto ya existe, aumenta su cantidad en 1
			const newProductList = budget.products.map((product) =>
				product.code === code ? { ...product, quantity: product.quantity + 1 } : product
			);
			setBudget({ ...budget, products: newProductList });
		} else {
			// Si el producto no existe, añádelo con cantidad inicial de 1
			const product = products.find((product) => product.code === code);

			const quantityProduct = {
				code: product!.code,
				name: product!.name,
				weight: product!.weight,
				quantity: 1,
			};
			setBudget({ ...budget, products: [...budget.products, { ...quantityProduct }] });
		}
	};

	const subtractProduct = (code: string) => {
		const newProductList = budget.products
			.map((product) => {
				if (product.code === code) {
					// Restar 1 a la cantidad si es mayor a 1
					if (product.quantity >= 1) {
						return { ...product, quantity: product.quantity - 1 };
					}
				}
				return product;
			})
			.filter((product: BudgetProduct) => product.quantity > 0);

		setBudget({ ...budget, products: newProductList });
	};

	const getTotal = () => {
		let total = 0;
		budget.products.map((product) => {
			total += product.weight * budget.price * product.quantity;
		});
		budget.total = parseFloat(total.toFixed(2));
		return total.toFixed(2);
	};

	const setPriceAndClient = (price: number, client: string) => {
		setBudget({ ...budget, price, client });
	};

	return {
		products,
		budget,
		addProduct,
		subtractProduct,
		getTotal,
		setPriceAndClient,
		createBudget,
		budgetList,
		getBudget,
		deleteBudget,
	};
}

export default useBudget;
