import React, { useRef, useEffect } from "react";
import ProductBudgetTable from "@/components/BudgetTable/ProductBudgetTable";
import BudgetTable from "@/components/BudgetTable/BudgetTable";
import Title from "@/components/Title/Title";
import useBudget from "@/hooks/useBudget";
import style from "./style.module.css";
import InputLabel from "@/components/atoms/input-label/input-label";
import MainButton from "@/components/atoms/main-button/main-button";

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
		<div className="bigcontainer">
			<Title title="Nuevo Presupuesto" />
			<form onSubmit={handleSubmit}>
				<div>
					<InputLabel id="price" type="text" label="Cliente" placeholder="Cotillon" value="" onChange={()=>{}} />
					<MainButton text="Cargar datos" type="submit" onClick={()=>{}} />
				</div>
			</form>
			<p className={style.total}>Total: $ {getTotal()}</p>
			<div className="rowbigcontainer">
				<div className={style.tablecontainer}>
					<ProductBudgetTable
						products={products}
						onClick={(code: string) => addProduct(code)}
					/>
				</div>
				<div className={style.tablecontainer} ref={budgetTableRef}>
					<BudgetTable
						products={budget.products}
						price={budget.price}
						onClick={(code: string) => subtractProduct(code)}
					/>
				</div>
			</div>
			<div
				className={style.createButton}
				onClick={() => {
					createBudget();
				}}>
				+
			</div>
		</div>
	);
}

export default BudgetSection;
