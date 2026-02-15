import Navigation from "@/widgets/Navigation";
import { Outlet } from "react-router-dom";

export default function Home() {
	return (
		<>
			<Navigation />
			<Outlet />
		</>
	);
}
