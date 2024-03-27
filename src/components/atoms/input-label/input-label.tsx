type Props = {
    htmlFor: string;
    type: "text" | "number";
    name: string;
    id: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}

export default function InputLabel({htmlFor, type, name, id, value, onChange}: Props){
    return(
        <>
            <label htmlFor={htmlFor}>Código</label>
		    <input type={type} name={name} id={id} value={value || ""} onChange={onChange} />
        </>
    )
}