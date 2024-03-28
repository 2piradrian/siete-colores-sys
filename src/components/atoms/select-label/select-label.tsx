import ProductCategories from "../product-categories/product-categories";
import style from "./style.module.css";

type Props = {
    htmlFor: string;
    label: string;
    name: string;
    id: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function SelectLabel({htmlFor, label, name, id, value, onChange}: Props){
    return(
        <div className={style.container}>
            <label htmlFor={htmlFor}>{label}</label>
		    <select name={name} id={id} value={value || ""} onChange={onChange}>
                <ProductCategories />
            </select>
        </div>
    )
}