import Categories from "../atoms/product-categories/categories";
import style from "./style.module.css";

type Props = {
	setOpen: (isOpen: boolean) => void;
};

function CreateInputs({ setOpen }: Props) {
	return (
		<>
			<label htmlFor="code">Código</label>
			<input type="text" name="code" id="code" placeholder="A999" />
			<label htmlFor="name">Nombre</label>
			<input type="text" name="name" id="name" placeholder="CARA DE LEON" />
			<label htmlFor="type">Categoria</label>
			<select name="type" id="type" placeholder="Artesanos">
				<Categories />
			</select>
			<label htmlFor="size">Tamaño</label>
			<input type="text" name="size" id="size" placeholder="55mm x 89mm" />
			<label htmlFor="price">Precio</label>
			<input type="number" name="price" id="price" placeholder="45" />
			<div className={style.buttonContainer}>
				<button type="submit">Crear</button>
				<button type="button" onClick={() => setOpen(false)}>
					Cancelar
				</button>
			</div>
		</>
	);
}

export default CreateInputs;
