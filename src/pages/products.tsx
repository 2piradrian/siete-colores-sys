import ProductList from "@/components/organism/product-list/product-list";
import AppLayout from "@/layout/AppLayout";
import React from "react";

function Products() {
	return (
		<AppLayout title="Productos">
			<ProductList />
		</AppLayout>
	);
}

export default Products;
