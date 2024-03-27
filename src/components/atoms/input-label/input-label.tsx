import style from "./style.module.css"

type Props = {
    htmlFor: string;
    label: string;
    type: "text" | "number";
    placeholder: string;
    name: string;
    id: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}

export default function InputLabel({htmlFor, label, type, placeholder, name, id, value, onChange}: Props){
    return(
        <div className={style.container}>
            <label htmlFor={htmlFor}>{label}</label>
		    <input type={type} placeholder={placeholder} name={name} id={id} value={value || ""} onChange={onChange} />
        </div>
    )
}