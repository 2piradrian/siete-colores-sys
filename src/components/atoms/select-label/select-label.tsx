import ProductCategories from "../product-categories/product-categories";
import style from "./style.module.css";

type Props = {
    id: string;
    label: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function SelectLabel({label, id, value, onChange}: Props){
    return(
        <div className={style.container}>
            <label htmlFor={id}>{label}</label>
		    <select name={id} id={id} value={value || ""} onChange={onChange}>
                <ProductCategories />
            </select>
        </div>
    )
}