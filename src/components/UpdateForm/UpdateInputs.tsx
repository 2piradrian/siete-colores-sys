import { Product, ProductForm } from "@/types/types";
import { useState } from "react";
import style from "./style.module.css";
import { MdOutlineDeleteForever } from "react-icons/md";

type Props = {
	product: Product | undefined;
	setOpen: (isOpen: boolean) => void;
	deleteProduct: (id: string) => void;
};

function UpdateInputs({ product, setOpen, deleteProduct }: Props) {
	const [formData, setFormData] = useState<ProductForm>({
		code: product!.code,
		name: product!.name,
		type: product!.type,
		size: product!.size,
		weight: product!.weight,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

	return (
		<>
			<label htmlFor="code">Código</label>
			<input
				type="text"
				name="code"
				id="code"
				value={formData.code}
				onChange={handleInputChange}
			/>
			<label htmlFor="name">Nombre</label>
			<input
				type="text"
				name="name"
				id="name"
				value={formData.name}
				onChange={handleInputChange}
			/>
			<label htmlFor="type">Tipo (Categoria)</label>
			<select name="type" id="type" value={formData.type} onChange={handleInputChange}>
				<option>Animales</option>
				<option>Artesanos</option>
				<option>Bautismo</option>
				<option>Comunión</option>
				<option>Contramoldes</option>
				<option>Deportes</option>
				<option>Formas</option>
				<option>Halloween</option>
				<option>Letras y números</option>
				<option>Marcos</option>
				<option>Navidad</option>
				<option>Pascuas</option>
				<option>Personajes</option>
				<option>Plantas</option>
				<option>Profesiones</option>
				<option>Scrapers</option>
				<option>Sellos</option>
				<option>Texturizadores</option>
				<option>Toppers</option>
				<option>Transportes</option>
				<option>Varios</option>
			</select>
			<label htmlFor="size">Tamaño</label>
			<input
				type="text"
				name="size"
				id="size"
				value={formData.size}
				onChange={handleInputChange}
			/>
			<label htmlFor="weight">Peso</label>
			<input
				type="text"
				name="weight"
				id="weight"
				value={formData.weight}
				onChange={handleInputChange}
			/>
			<div className={style.buttonContainer}>
				<button type="submit">Actualizar</button>
				<button type="button" onClick={() => setOpen(false)}>
					Cancelar
				</button>
			</div>
			<div
				className={style.delete}
				onClick={() => {
					deleteProduct(product!.id);
					setOpen(false);
				}}>
				<MdOutlineDeleteForever />
			</div>
		</>
	);
}

export default UpdateInputs;
