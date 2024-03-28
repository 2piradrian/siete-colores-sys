import React, { useState } from "react";
import useProducts from "@/hooks/useProducts";
import SearchForm from "@/components/SearchForm/SearchForm";
import Title from "@/components/Title/Title";
import ProductTable from "@/components/ProductTable/ProductTable";
import style from "./style.module.css";
import ProductForm from "@/components/molecules/product-form/product-form";
import { Product } from "@/types/types";

function ProductSection() {
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
		<>
			<div className="bigcontainer">
				<Title title="Productos" />
				<SearchForm setSearch={setSearch} />
				{products.length > 0 && (
					<ProductTable products={products} onClick={handleForm} isComplete />
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
			<div className={style.createButton} onClick={() => setOpenCreate(true)}>
				+
			</div>
		</>
	);
}

export default ProductSection;
