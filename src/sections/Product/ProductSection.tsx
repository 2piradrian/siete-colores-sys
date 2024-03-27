import React, { useState } from "react";
import useProducts from "@/hooks/useProducts";
import SearchForm from "@/components/SearchForm/SearchForm";
import Title from "@/components/Title/Title";
import ProductTable from "@/components/ProductTable/ProductTable";
import UpdateForm from "@/components/UpdateForm/UpdateForm";
import CreateForm from "@/components/CreateForm/CreateForm";
import style from "./style.module.css";

function ProductSection() {
	const { products, setSearch, getProductByCode, updateProduct, createProduct, deleteProduct } = useProducts();

	const [openUpdate, setOpenUpdate] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	const [code, setCode] = useState("");

	const handleForm = (code: string) => {
		setOpenUpdate(true);
		setCode(code);
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
					code={code}
					setOpen={setOpenUpdate}
					getProductByCode={getProductByCode}
					updateProduct={updateProduct}
					deleteProduct={deleteProduct}
				/>
			)}
			{openCreate && (
				<CreateForm
					code={code}
					setOpen={setOpenCreate}
					getProductByCode={getProductByCode}
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
