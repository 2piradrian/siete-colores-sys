import React, { useState } from "react";
import useProducts from "@/hooks/useProducts";
import SearchForm from "@/components/SearchForm/SearchForm";
import Title from "@/components/Title/Title";
import ProductTable from "@/components/ProductTable/ProductTable";
import style from "./style.module.css";
import UpdateForm from "@/components/UpdateForm/UpdateForm";
import CreateForm from "@/components/CreateForm/CreateForm";

function ProductSection() {
	const { products, setSearch, getProductById, updateProduct, createProduct, deleteProduct } =
		useProducts();

	const [openUpdate, setOpenUpdate] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	const [id, setId] = useState("");

	const handleForm = (id: string) => {
		setOpenUpdate(true);
		setId(id);
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
			{openUpdate && (
				<UpdateForm
					id={id}
					setOpen={setOpenUpdate}
					getProductById={getProductById}
					updateProduct={updateProduct}
					deleteProduct={deleteProduct}
				/>
			)}
			{openCreate && (
				<CreateForm
					id={id}
					setOpen={setOpenCreate}
					getProductById={getProductById}
					createProduct={createProduct}
				/>
			)}
			<div className={style.createButton} onClick={() => setOpenCreate(true)}>
				+
			</div>
		</>
	);
}

export default ProductSection;
