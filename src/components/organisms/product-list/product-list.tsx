import React, { useState } from "react";
import { Product } from "@/types/types";
import { allProductsTable } from "@/data/tables";
import useProducts from "@/hooks/useProducts";
import SearchForm from "@/components/molecules/search-form/search-form";
import Title from "@/components/atoms/title/title";
import ProductForm from "@/components/molecules/product-form/product-form";
import ProductTable from "@/components/molecules/product-table/product-table";
import FAButton from "@/components/atoms/fa-button/fa-button";
import style from "./style.module.css";

export default function ProductList() {
	const { products, setSearch, updateProduct, createProduct, deleteProduct } = useProducts();

	const [openUpdate, setOpenUpdate] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);

	const [product, setProduct] = useState<Product | null>();

	const handleForm = async (code: string) => {
		setOpenUpdate(true);
		const product = products.filter((product) => product.code === code)[0];
		setProduct(product);
	};

	return (
		<section className="container">
			<div className={style.container}>
				<Title title="Productos" />
				<SearchForm setSearch={setSearch} />
				{products.length > 0 && (
					<ProductTable products={products} onClick={handleForm} table={allProductsTable} />
				)}
			</div>
			{openUpdate && (
				<ProductForm 
					empty={false} 
					product={product} 
					setOpen={setOpenUpdate} 
					onSubmit={updateProduct} 
					onDelete={deleteProduct} />
			)}
			{openCreate && (
				<ProductForm 
					empty 
					product={null} 
					setOpen={setOpenCreate} 
					onSubmit={createProduct} 
					onDelete={deleteProduct} />
			)}
			<FAButton content="+" onClick={() => setOpenCreate(true)} />
		</section>
	);
}