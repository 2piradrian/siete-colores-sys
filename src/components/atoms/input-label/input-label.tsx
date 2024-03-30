import { useState } from "react";
import style from "./style.module.css"

type Props = {
    id: string;
    type: "text" | "number";
    label: string;
    placeholder: string;
    value?: string | undefined;
}

export default function InputLabel({label, type, placeholder, id, value}: Props){
    const [self, setSelf] = useState<string | undefined>("" || value)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelf(e.target.value);
    }

    return(
        <div className={style.container}>
            <label htmlFor={id}>{label}</label>
		    <input type={type} placeholder={placeholder} name={id} id={id} value={value || self} onChange={handleChange} />
        </div>
    )
}