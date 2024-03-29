import React, { useRef, useEffect } from "react";
import BudgetTable from "@/components/BudgetTable/BudgetTable";
import Title from "@/components/Title/Title";
import useBudget from "@/hooks/useBudget";
import style from "./style.module.css";
import InputLabel from "@/components/atoms/input-label/input-label";
import MainButton from "@/components/atoms/main-button/main-button";
import ProductTable from "@/components/molecules/product-table/product-table";
import { reducedProductsTable } from "@/data/tables";

function BudgetSection() {
	const { products, budget, addProduct, subtractProduct, getTotal, setPriceAndClient, createBudget } = useBudget();

	const budgetTableRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (budgetTableRef.current) {
			budgetTableRef.current.scrollTop = budgetTableRef.current.scrollHeight;
		}
	}, [budget.products]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const BudgetData = Object.fromEntries(new FormData(e.currentTarget));
		if (!BudgetData.client || !BudgetData.price) {
			return alert("Debes llenar todos los campos");
		}
		setPriceAndClient(Number(BudgetData.price), BudgetData.client.toString());
		alert("Datos cargados correctamente");
	};

	return (
		<section className="container">
			<Title title="Nuevo Presupuesto" />
			<form onSubmit={handleSubmit}>
				<div className={style.preform}>
					<InputLabel id="price" type="text" label="Cliente" placeholder="Cotillon" value="" onChange={()=>{}} />
					<MainButton text="Cargar datos" type="submit" onClick={()=>{}} />
				</div>
			</form>
			<p className={style.total}>Total: $ {getTotal()}</p>
			<div className={style.tableContainer}>
				<div className={style.table}>
					<ProductTable products={products} table={reducedProductsTable} onClick={(code: string) => addProduct(code)} />
				</div>
				<div className={style.table} ref={budgetTableRef}>
					<ProductTable products={budget.products} table={reducedProductsTable} onClick={(code: string) => subtractProduct(code)} />
					{/* <BudgetTable
						products={budget.products}
						price={budget.price}
						onClick={(code: string) => subtractProduct(code)}
					/> */}
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

export default BudgetSection;
