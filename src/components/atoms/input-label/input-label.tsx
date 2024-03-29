import style from "./style.module.css"

type Props = {
    id: string;
    type: "text" | "number";
    label: string;
    placeholder: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputLabel({label, type, placeholder, id, value, onChange}: Props){
    return(
        <div className={style.container}>
            <label htmlFor={id}>{label}</label>
		    <input type={type} placeholder={placeholder} name={id} id={id} value={value || ""} onChange={onChange} />
        </div>
    )
}