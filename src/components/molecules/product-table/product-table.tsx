import React from "react";
import style from "./style.module.css";
import { Product } from "@/types/types";

type Props = {
	products: Product[];
    table: string[][];
	onClick: (code: string) => void;
};

export default function ProductTable({ products, table, onClick }: Props) {
	return (
		<table className={style.table}>
			<tbody>
				<tr>
                    {table[0].map((header) => (
                        <th className={style.tableHeader}>{header}</th>
                    ))}
				</tr>
				{products.map((product) => (
					<tr
						className={style.tableRow}
						key={product.code}
						onClick={() => onClick(product.code)}>
                        {table[1].map((content) => (
                            <td className={style.tableCell}>{product[content as keyof Product]}</td>
                        ))}
					</tr>
				))}
			</tbody>
		</table>
	);
}