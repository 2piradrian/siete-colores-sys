import { categories } from "@/data/categories";

export default function Categories(){
    	
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