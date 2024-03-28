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

	const getProductByCode = async (code: string): Promise<Product | null> => {
		try {
			const response: AxiosResponse<Product> = await instance.get("/products/get-by-code?code=" + code);
			return response.data;
		} catch (error) {
			alert("Error encontrando el producto con el código: " + code);
			return null;
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
			await instance.post("/products/create", product, { headers: {"authorization": env.SECRET}});
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
			alert("Rellena todos los campos");
			return null;
		}
		try {
			await instance.put("/products/update", product);

			updateList()
			// return response.data; // We need it ? Try to remove it : Promise<Product | null>
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
		getProductByCode,
		createProduct,
		updateProduct,
		deleteProduct,
	};
}

export default useProducts;
