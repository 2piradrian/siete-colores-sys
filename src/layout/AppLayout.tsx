import Sidebar from "@/components/molecules/sidebar/sidebar";
import Head from "next/head";

type Props = {
	title: string;
	children: React.ReactNode;
};

export default function AppLayout({ children, title }: Props) {
	return (
		<>
			<Head>
				<title>{"Siete Colores | " + title}</title>
				<meta name="description" content="System" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Sidebar />
			<main>{children}</main>
		</>
	);
}
