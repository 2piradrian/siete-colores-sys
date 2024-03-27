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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}

    return (
        <div className={style.container}>
            <form className={style.form}>
                <h2>{empty ? "Crear producto" : "Actualizar producto"}</h2>
                {/*  */}
                <InputLabel htmlFor="code" label="Código" placeholder="A236" type="text" name="code" id="code" value="" onChange={handleChange} />
                <InputLabel htmlFor="name" label="Nombre" placeholder="LETRA CURSIVA" type="text" name="name" id="name" value="" onChange={handleChange} />
                <SelectLabel htmlFor="type" label="Categoría" name="type" id="type" value="" onChange={handleChange} />
                <InputLabel htmlFor="size" placeholder="15mm x 15mm" label="Tamaño" type="text" name="size" id="size" value="" onChange={handleChange} />
                <InputLabel htmlFor="price" placeholder="3090.00" label="Precio" type="number" name="price" id="price" value="" onChange={handleChange} />
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