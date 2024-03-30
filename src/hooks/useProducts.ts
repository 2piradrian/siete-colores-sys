import { env } from "@/adapters/env";
import { instance } from "@/adapters/instance";
import { Product } from "@/types/types";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

function useProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState(true);

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
		fetchProducts().then((data) => setProducts(data || []));
	}, []);

	const fetchProducts = async () => {
		try {
			const response: AxiosResponse<Product[]> = await instance.get("/products/get-all");

			return response.data || [];
		} 
		catch (error) {
			alert("Error al cargar los productos: " + error);
		} 
		finally {
			setLoading(false);
		}
	};

	const updateList = async () => {
		const data = await fetchProducts();
		setProducts(data || []);
	}

	const getProductByCode = async (code: string) => {
		try {
			const response: AxiosResponse<Product> = await instance.get("/products/get-by-code", {params: {code}});
			return response.data;
		} 
		catch (error) {
			alert("Error encontrando el producto con el código: " + code);
		}
	};

	const createProduct = async (product: Product) => {
		try {
			if (!product.name || !product.code || !product.size || !product.category || !product.price) {
				throw new Error("Rellena todos los campos");
			}
			if (products.find((p) => p.code === product.code)) {
				throw new Error("El código ya existe");
			}
			await instance.post("/products/create", product, {headers: {"authorization": env.SECRET}});
			updateList()
			return true;
		} 
		catch (error) {
			alert("Error creando el producto: " + error);
			return false;
		}
	};

	const updateProduct = async (product: Product) => {
		if (!product.name || !product.code || !product.size || !product.category || !product.price) {
			throw new Error("Rellena todos los campos");
		}
		try {
			await instance.put("/products/update", product, {headers: {"authorization": env.SECRET}});
			updateList()
			return true;
		} 
		catch (error) {
			alert("Error actualizando el producto: " + error);
			return false;
		}
	};

	const deleteProduct = async (id: string) => {
		try {
			const response: AxiosResponse<Product> = await instance.delete(id);
			await fetchProducts();
			
			return response.data || null;
		} 
		catch (error) {
			alert("Error eliminando el producto: " + error);
			return null;
		}
	};

	return {
		setSearch,
		products,
		loading,
		getProductByCode,
		createProduct,
		updateProduct,
		deleteProduct,
	};
}

export default useProducts;
