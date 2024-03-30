import useProducts from "./useProducts";
import { Budget } from "@/types/types";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { instance } from "@/adapters/instance";
import { env } from "@/adapters/env";

export default function useBudget() {
	const { products } = useProducts();

	const [budgetList, setBudgetList] = useState<Budget[]>([]);
	const [budget, setBudget] = useState<Budget>({
		id: "",
		client: "",
		price: 0,
		date: new Date(),
		products: [],
		total: 0,
	});

	useEffect(() => {
		fetchBudgets().then((data) => setBudgetList(data || []));
	}, []);

	const fetchBudgets = async () => {
		try {
			const response: AxiosResponse<Budget[]> = await instance.get("/budgets/get-all", {headers: {"authorization": env.SECRET}});
			
			return response.data || [];
		} 
		catch (error) {
			alert("Error al cargar los presupuestos: " + error);
		}
	};

	const createBudget = async () => {
		try {
			if (budget.products.length === 0 || !budget.client) {
				throw new Error("No se puede crear un presupuesto sin productos o cliente");
			}

			await instance.post("/budgets/create", { products: budget.products, client: budget.client }, {headers: {"authorization": env.SECRET}});
			
			alert("Presupuesto creado con éxito");
			
		} 
		catch (error) {
			alert("Error al crear el presupuesto: " + error);
		}
	};

	const getBudget = async (id: string) => {
		try {
			const response: AxiosResponse<Budget> = await instance.get("/budgets/get-by-id", {params: { id }, headers: {"authorization": env.SECRET}});

			return response.data;
		} 
		catch (error) {
			alert("Error al obtener el presupuesto: " + error);
		}
	};

	const deleteBudget = async (id: string) => {
		try {
			const response: AxiosResponse<Budget> = await instance.delete(`/${id}`);
			alert("Presupuesto eliminado con éxito");

			return response.data;
		} 
		catch (error) {
			alert("Error al eliminar el presupuesto" + error);
		}
	};

	const addProduct = (code: string) => {
		const existingProduct = budget.products.find((product) => product.code === code);

		if (existingProduct) {
			// Si el producto ya existe, aumenta su cantidad en 1
			const newProductList = budget.products.map((product) => {
				const newQuantity = product.quantity + 1;

				return product.code === code ? { 
					...product, 
					quantity: newQuantity,
					quantityPrice: (newQuantity) * (product.price) 
				} : product
			});

			setBudget({ ...budget, products: newProductList });
		} 
		else {
			// Si el producto no existe, añádelo con cantidad inicial de 1
			const product = products.find((product) => product.code === code);

			if (!product) {
				alert("Producto no encontrado");
				return;
			}

			const quantityProduct = {
				code: product.code,
				name: product.name,
				quantity: 1,
				price: product.price,
				quantityPrice: product.price,
			};

			setBudget({ ...budget, products: [...budget.products, { ...quantityProduct }] });
		}
	};

	const subtractProduct = (code: string) => {
		const existingProduct = budget.products.find((product) => product.code === code);

		if (!existingProduct) {
			alert("Producto no encontrado");
			return;
		}

		if (existingProduct.quantity === 1) {
			const newProductList = budget.products.filter((product) => product.code !== code);
			setBudget({ ...budget, products: newProductList });
		} 
		else {
			const newProductList = budget.products.map((product) => {
				const newQuantity = product.quantity - 1;

				return product.code === code ? { 
					...product, 
					quantity: newQuantity,
					quantityPrice: (newQuantity) * (product.price) 
				} : product
			});

			setBudget({ ...budget, products: newProductList });
		}
	};

	const getTotal = () => {
		let total = 0;
		budget.products.map((product) => {
			total += product.quantityPrice;
		});
		budget.total = parseFloat(total.toFixed(2));

		return total.toFixed(2);
	};

	const setClientOnBudget = (client: string) => {
		setBudget({ ...budget, client });
	};

	return {
		products,
		budget,
		addProduct,
		subtractProduct,
		getTotal,
		setClientOnBudget,
		createBudget,
		budgetList,
		getBudget,
		deleteBudget,
	};
}
