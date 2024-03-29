import React, { useState } from "react";
import { Product } from "@/types/types";
import { allProductsTable } from "@/data/tables";
import useProducts from "@/hooks/useProducts";
import SearchForm from "@/components/SearchForm/SearchForm";
import Title from "@/components/Title/Title";
import ProductForm from "@/components/molecules/product-form/product-form";
import ProductTable from "@/components/molecules/product-table/product-table";
import style from "./style.module.css";
import FAButton from "@/components/atoms/fa-button/fa-button";

export default function ProductSection() {
	const { products, setSearch, getProductByCode, updateProduct, createProduct, deleteProduct } = useProducts();

	const [openUpdate, setOpenUpdate] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);

	const [product, setProduct] = useState<Product | null>();

	const handleForm = async (code: string) => {
		setOpenUpdate(true);
		const productDB = await getProductByCode(code);

		if (productDB) {
			setProduct(productDB);
		}
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
			{(openUpdate) && (
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