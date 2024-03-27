import React, { FormEvent, useEffect, useState } from "react";
import style from "./style.module.css";
import { Product } from "@/types/types";
import UpdateInputs from "./UpdateInputs";

type Props = {
	code: string;
	setOpen: (open: boolean) => void;
	getProductByCode: (id: string) => Promise<Product | null>;
	updateProduct: (product: Product) => void;
	deleteProduct: (id: string) => void;
};

function UpdateForm({ code, setOpen, getProductByCode, updateProduct, deleteProduct }: Props) {
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
		for (const key in productData) {
			if (productData[key] === "") {
				return alert("Por favor, rellena todos los campos");
			}
		}

		updateProduct({
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
					<h2>Actualizar producto</h2>
					<p>
						¡Atención, para llevar un mejor control, es preferible que crees un producto
						nuevo en lugar de editar los existentes!
					</p>
				</div>
				<div className={style.inputs}>
					{product && (
						<UpdateInputs
							product={product}
							setOpen={setOpen}
							deleteProduct={deleteProduct}
						/>
					)}
				</div>
			</form>
		</div>
	);
}

export default UpdateForm;
