import React from "react";
import style from "./style.module.css";

type Props = {
	setSearch: (search: string) => void;
};

function SearchForm({ setSearch }: Props) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const searchData = Object.fromEntries(new FormData(e.currentTarget));
		setSearch(searchData.search as string);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input className={style.input} type="text" placeholder="Buscar" name="search" />
		</form>
	);
}

export default SearchForm;
