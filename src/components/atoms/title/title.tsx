import React from "react";
import style from "./style.module.css";

type Props = {
	title: string;
};

function Title({ title }: Props) {
	return <h1 className={style.title}>{title}</h1>;
}

export default Title;
