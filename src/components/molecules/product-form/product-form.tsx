import { useState } from "react";
import { Product } from "@/types/types";
import { categories } from "@/data/categories";
import { MdOutlineDeleteForever } from "react-icons/md";
import InputLabel from "@/components/atoms/input-label/input-label";
import SelectLabel from "@/components/atoms/select-label/select-label";
import style from "./style.module.css"
import MainButton from "@/components/atoms/main-button/main-button";

type Props = {
    empty: boolean;
    product: Product | null | undefined
    setOpen: (open: boolean) => void;
    onSubmit: (product: Product) => Promise<boolean>;
    onDelete: (code: string) => void;
}

export default function ProductForm({ empty, product, setOpen, onSubmit, onDelete }: Props) {
    const [formData, setFormData] = useState<Product>({
        code: product?.code || "", 
        name: product?.name || "", 
        category: product?.category || categories[0], 
        size: product?.size || "",
        price: product?.price || 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData).then((bool) => {if (bool) setOpen(false)});
    }

    const handleDelete = () => {
        onDelete(formData.code);
        setOpen(false);
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>
                <h2>{empty ? "Crear producto" : "Actualizar producto"}</h2>
                {/*  */}
                <InputLabel 
                    id="code" 
                    label="Código" 
                    placeholder="A236" 
                    type="text" 
                    value={formData.code} 
                    onChange={handleChange} 
                    />
                <InputLabel 
                    id="name" 
                    label="Nombre" 
                    placeholder="LETRA CURSIVA" 
                    type="text" 
                    value={formData.name} 
                    onChange={handleChange} 
                    />
                <SelectLabel 
                    id="category" 
                    label="Categoría" 
                    value={formData.category} 
                    onChange={handleChange} 
                    />
                <InputLabel 
                    id="size" 
                    placeholder="15mm x 15mm" 
                    label="Tamaño" 
                    type="text" 
                    value={formData.size} 
                    onChange={handleChange} 
                    />
                <InputLabel 
                    id="price" 
                    placeholder="3090.50" 
                    label="Precio" 
                    type="number" 
                    value={formData.price.toString()} 
                    onChange={handleChange} 
                    />
                {/*  */}
                <div className={style.buttonContainer}>
                    <MainButton text={empty? "Crear" : "Actualizar"} type="submit"/>
                    <MainButton text="Cancelar" type="button" onClick={() => setOpen(false)}/>
			    </div>
                {!empty &&
                    <div className={style.delete} onClick={handleDelete}>
				        <MdOutlineDeleteForever />
			        </div>
                }   
            </form>
        </div>
    )
}