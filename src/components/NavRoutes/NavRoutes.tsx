import NavItem from "../NavItem/NavItem";
import { AiFillHome } from "react-icons/ai";
import { FaBook, FaBookMedical, FaPercent } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import style from "./style.module.css";

type Props = {
	state: boolean;
};

function NavRoutes({ state }: Props) {
	return (
		<div className={style.routes}>
			<NavItem icon={<AiFillHome />} name="Home" route="/" state={state} />
			<NavItem icon={<FaSearch />} name="Productos" route="/products" state={state} />
			<NavItem icon={<FaBookMedical />} name="Presupuestar" route="/budgets" state={state} />
			<NavItem icon={<FaBook />} name="Presupuestos" route="/allbudgets" state={state} />
			<NavItem icon={<FaPercent />} name="Porcentaje" route="/percent" state={state} />
		</div>
	);
}

export default NavRoutes;
