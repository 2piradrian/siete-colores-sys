import React from "react";
import style from "./style.module.css";
import { BudgetProduct } from "@/types/types";
import useBudget from "@/hooks/useBudget";
import { useRouter } from "next/router";
import BudgetTable from "../molecules/budget-table/budget-table";

type Props = {
	id: string | string[] | undefined;
	products: BudgetProduct[];
	total: number;
};

function TableToPrint({ id, products, total }: Props) {
	const router = useRouter();

	const { deleteBudget } = useBudget();

	const handlePrint = () => {
		window.print();
	};
	const handleDelete = () => {
		deleteBudget(id as string);
		router.replace("/allbudgets");
	};

	return (
		<div className={style.tableContainer}>
			<h1>Presupuesto: Siete Colores</h1>
			<h4>Documento no válido como factura</h4>
			<div className={style.tablediv}>
				<BudgetTable products={products} />
			</div>
			<p className={style.total}>Total: $ {total}</p>
			<div className={style.button} onClick={handleDelete}>
				Borrar
			</div>
			<div className={style.button} onClick={handlePrint}>
				Imprimir
			</div>
		</div>
	);
}

export default TableToPrint;
