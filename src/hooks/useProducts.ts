import { Product, ProductForm } from "@/types/types";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

function useProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState(true);

	const instance = axios.create({
		baseURL: "http://localhost:3333/products",
	});

	const fetchProducts = async () => {
		try {
			const response: AxiosResponse<Product[]> = await instance.get("");
			// sort by code
			response.data.sort((a, b) => {
				if (a.code < b.code) {
					return -1;
				}
				if (a.code > b.code) {
					return 1;
				}
				return 0;
			});
			setProducts(response.data || []);
			return response.data || [];
		} catch (error) {
			alert("Error al cargar los productos: " + error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const filterProducts = async () => {
			const data = await fetchProducts();
			const filteredProducts = data?.filter((product) => {
				return (
					product.name.toLowerCase().includes(search.toLowerCase()) ||
					product.code.toLowerCase().includes(search.toLowerCase())
				);
			});
			setProducts(filteredProducts || []);
		};
		filterProducts();
	}, [search]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const getProductById = async (id: string): Promise<Product | null> => {
		try {
			const response: AxiosResponse<Product> = await instance.get(id);
			return response.data;
		} catch (error) {
			alert("Error encontrando el producto con el id: " + id);
			return null;
		}
	};

	const createProduct = async (product: ProductForm): Promise<Product | null> => {
		if (!product.name || !product.code || !product.size || !product.weight || !product.type) {
			alert("Rellena todos los campos");
			return null;
		}
		// already exists
		const exists = products.find((p) => p.code === product.code);
		if (exists) {
			alert("El código ya existe");
			return null;
		}
		try {
			const response: AxiosResponse<Product> = await instance.post("", product);
			await fetchProducts();
			return response.data;
		} catch (error) {
			alert("Error creando el producto: " + error);
			return null;
		}
	};

	const updateProduct = async (id: string, product: ProductForm): Promise<Product | null> => {
		if (!product.name || !product.code || !product.size || !product.weight || !product.type) {
			alert("Rellena todos los campos");
			return null;
		}
		try {
			const response: AxiosResponse<Product> = await instance.put(id, product);
			await fetchProducts();
			return response.data;
		} catch (error) {
			alert("Error actualizando el producto: " + error);
			return null;
		}
	};

	const deleteProduct = async (id: string): Promise<Product | null> => {
		try {
			const response: AxiosResponse<Product> = await instance.delete(id);
			await fetchProducts();
			return response.data || null;
		} catch (error) {
			alert("Error eliminando el producto: " + error);
			return null;
		}
	};

	return {
		setSearch,
		products,
		loading,
		getProductById,
		createProduct,
		updateProduct,
		deleteProduct,
	};
}

export default useProducts;
