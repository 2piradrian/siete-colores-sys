import React, { useRef, useEffect } from "react";
import { budgetProductsTable, reducedProductsTable } from "@/data/tables";
import useBudget from "@/hooks/useBudget";
import Title from "@/components/atoms/title/title";
import InputLabel from "@/components/atoms/input-label/input-label";
import MainButton from "@/components/atoms/main-button/main-button";
import ProductTable from "@/components/molecules/product-table/product-table";
import style from "./style.module.css";

export default function BudgetEditor() {
	const { products, budget, addProduct, subtractProduct, getTotal, setClientOnBudget, createBudget } = useBudget();

	const budgetTableRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (budgetTableRef.current) {
			budgetTableRef.current.scrollTop = budgetTableRef.current.scrollHeight;
		}
	}, [budget.products]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const client = Object.fromEntries(new FormData(e.currentTarget)).client as string;

		if (client === "") {
			alert("Debe ingresar un cliente");
			return;
		}

		setClientOnBudget(client);
		alert("Datos cargados correctamente");
	};

	return (
		<section className="container">
			<Title title="Nuevo Presupuesto" />
			<form onSubmit={handleSubmit}>
				<div className={style.preform}>
					<InputLabel id="price" type="text" label="Cliente" placeholder="Cotillon" />
					<MainButton text="Cargar datos" type="submit" />
				</div>
			</form>
			<p className={style.total}>Total: $ {getTotal()}</p>
			<div className={style.tableContainer}>
				<div className={style.table}>
					<ProductTable products={products} table={reducedProductsTable} onClick={(code: string) => addProduct(code)} />
				</div>
				<div className={style.table} ref={budgetTableRef}>
					<ProductTable products={budget.products} table={budgetProductsTable} onClick={(code: string) => subtractProduct(code)} />
				</div>
			</div>
			<div
				className={style.createButton}
				onClick={() => {
					createBudget();
				}}>
				+
			</div>
		</section>
	);
}