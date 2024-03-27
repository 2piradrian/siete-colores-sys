import { categories } from "@/data/categories";

export default function ProductCategories(){
    	
	return (
        <>
            {
				categories.map((category: string) => (
					<option key={category}>{category}</option>
				))
			}
        </>
    )
}