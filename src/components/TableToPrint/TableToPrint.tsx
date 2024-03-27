import React from "react";
import style from "./style.module.css";
import BudgetTable from "../BudgetTable/BudgetTable";
import { BudgetProduct } from "@/types/types";
import useBudget from "@/hooks/useBudget";
import { useRouter } from "next/router";

type Props = {
	id: string | string[] | undefined;
	products: BudgetProduct[];
	price: number;
	total: number;
};

function TableToPrint({ id, products, price, total }: Props) {
	const router = useRouter();

	const { deleteBudget } = useBudget();

	const handlePrint = () => {
		window.print();
	};
	const handleDelete = () => {
		deleteBudget(id as string);
		router.replace("/allbudgets");
		router.reload();
	};

	return (
		<div className={style.tableContainer}>
			<h1>Presupuesto: Siete Colores</h1>
			<h4>Documento no válido como factura</h4>
			<div className={style.tablediv}>
				<BudgetTable products={products} price={price} />
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
