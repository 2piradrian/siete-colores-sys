import { instance } from "@/adapters/instance";
import { Product } from "@/types/types";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

function useProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState(true);

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

	const getProductByCode = async (id: string): Promise<Product | null> => {
		try {
			const response: AxiosResponse<Product> = await instance.get(id);
			return response.data;
		} catch (error) {
			alert("Error encontrando el producto con el id: " + id);
			return null;
		}
	};

	const createProduct = async (product: Product): Promise<Product | null> => {
		if (!product.name || !product.code || !product.size || !product.category) {
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

	const updateProduct = async (product: Product): Promise<Product | null> => {
		if (!product.name || !product.code || !product.size || !product.category) {
			alert("Rellena todos los campos");
			return null;
		}
		try {
			const response: AxiosResponse<Product> = await instance.put("", product);
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
		getProductByCode,
		createProduct,
		updateProduct,
		deleteProduct,
	};
}

export default useProducts;
