import { useRouter } from "next/router";
import Link from "next/link";
import style from "./style.module.css";

type Props = {
	icon: JSX.Element;
	state: boolean;
	name: string;
	route: string;
};

function NavItem({ state, icon, name, route }: Props) {
	const router = useRouter();
	return (
		<Link
			href={route}
			className={
				router.pathname == route
					? `${style.active} ${style.route}`
					: `${style.inactive} ${style.route}`
			}>
			<div className={style.icon}>{icon}</div>
			<p style={state ? { opacity: "1", width: "auto" } : { opacity: "0", width: "0px" }}>
				{name}
			</p>
		</Link>
	);
}

export default NavItem;
