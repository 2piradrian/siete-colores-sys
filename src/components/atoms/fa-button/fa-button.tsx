import style from "./style.module.css";

type Props = {
    onClick: () => void;
    content: string;
}

export default function FAButton({content, onClick}: Props){
    return (
        <div className={style.container} onClick={onClick}>
			{content}
		</div>
    )
}