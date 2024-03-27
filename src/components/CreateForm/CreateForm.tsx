import React, { FormEvent, useEffect, useState } from "react";
import style from "./style.module.css";
import { Product } from "@/types/types";
import CreateInputs from "./CreateInputs";

type Props = {
	code: string;
	setOpen: (open: boolean) => void;
	getProductByCode: (id: string) => Promise<Product | null>;
	createProduct: (product: Product) => Promise<Product | null>;
};

function CreateForm({ code, setOpen, getProductByCode, createProduct }: Props) {

	const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setOpen(false);

		const productData = Object.fromEntries(new FormData(e.currentTarget));
		createProduct({
			code: productData.code.toString(),
			name: productData.name.toString(),
			category: productData.type.toString(),
			size: productData.size.toString(),
			price: parseFloat(productData.price.toString()),
		});
	};

	return (
		<div className={style.container}>
			<form className={style.form} onSubmit={handleUpdate}>
				<div className={style.title}>
					<h2>Crear producto</h2>
				</div>
				<div className={style.inputs}>
					<CreateInputs setOpen={setOpen} />
				</div>
			</form>
		</div>
	);
}

export default CreateForm;
