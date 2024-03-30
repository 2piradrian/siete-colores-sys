import React from "react";
import InputLabel from "@/components/atoms/input-label/input-label";

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
			<InputLabel id="search" label="Buscar producto" placeholder="Sandalia" type="text" />
		</form>
	);
}

export default SearchForm;
