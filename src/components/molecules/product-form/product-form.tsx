import { useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import InputLabel from "@/components/atoms/input-label/input-label";
import SelectLabel from "@/components/atoms/select-label/select-label";
import style from "./style.module.css"
import { Product } from "@/types/types";

type Props = {
    empty: boolean;
    setOpen: (open: boolean) => void;
}

export default function ProductForm({ empty, setOpen }: Props) {
    const [formData, setFormData] = useState<Product>({code: "", name: "", category: "", size: "", price: 0});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    return (
        <div className={style.container}>
            <form className={style.form}>
                <h2>{empty ? "Crear producto" : "Actualizar producto"}</h2>
                {/*  */}
                <InputLabel 
                    id="code" 
                    name="code" 
                    htmlFor="code" 
                    label="Código" 
                    placeholder="A236" 
                    type="text" 
                    value={formData.code} 
                    onChange={handleChange} 
                    />
                <InputLabel 
                    id="name" 
                    name="name" 
                    htmlFor="name" 
                    label="Nombre" 
                    placeholder="LETRA CURSIVA" 
                    type="text" 
                    value={formData.name} 
                    onChange={handleChange} 
                    />
                <SelectLabel 
                    id="type" 
                    name="type" 
                    htmlFor="type" 
                    label="Categoría" 
                    value={formData.category} 
                    onChange={handleChange} 
                    />
                <InputLabel 
                    id="size" 
                    name="size" 
                    htmlFor="size" 
                    placeholder="15mm x 15mm" 
                    label="Tamaño" 
                    type="text" 
                    value={formData.size} 
                    onChange={handleChange} 
                    />
                <InputLabel 
                    id="price" 
                    name="price" 
                    htmlFor="price" 
                    placeholder="3090.00" 
                    label="Precio" 
                    type="number" 
                    value={formData.price.toString()} 
                    onChange={handleChange} 
                    />
                {/*  */}
                <div className={style.buttonContainer}>
				    <button type="submit">Actualizar</button>
				    <button type="button" onClick={() => setOpen(false)}>Cancelar</button>
			    </div>
			    <div 
                    className={style.delete}
				    onClick={() => {
					    //deleteProduct(product!.id);
					    setOpen(false);
                        }
                    }
                >
				    <MdOutlineDeleteForever />
			    </div>
            </form>
        </div>
    )
}