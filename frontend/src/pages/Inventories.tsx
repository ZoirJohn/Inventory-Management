import Inventory from "@/widgets/InventoryLink";
import { Outlet } from "react-router-dom";

export default function Inventories() {
	return (
		<section>
			<div className="container flex">
				<Inventory />
				<Outlet />
			</div>
		</section>
	);
}
