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
	const [product, setProduct] = useState<Product | undefined>(undefined);

	useEffect(() => {
		const fetchProduct = async () => {
			const fetchedProduct = await getProductByCode(code);
			if (fetchedProduct !== null) {
				setProduct(fetchedProduct);
			}
		};

		fetchProduct();
	}, [getProductByCode, code]);

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
					<p>
						¡Atención, para llevar un mejor control, es preferible que crees un producto
						nuevo en lugar de editar los existentes!
					</p>
				</div>
				<div className={style.inputs}>
					{product && <CreateInputs product={product} setOpen={setOpen} />}
				</div>
			</form>
		</div>
	);
}

export default CreateForm;
