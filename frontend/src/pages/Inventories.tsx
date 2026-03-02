import { NavLink, Outlet } from "react-router-dom";

import useInventories from "@/entities/hooks/useInventories";
import Inventory from "@/widgets/InventoryLink";

export default function Inventories() {
	const { inventories } = useInventories();

	return (
		<section>
			<div className="container flex">
				<div className="flex gap-4 items-center flex-wrap">
					{inventories.map(({ title, description, id, creatorName, createdAt }) => (
						<Inventory key={id} createdAt={createdAt} creatorName={creatorName} description={description} id={id} title={title} />
					))}
					<NavLink className="size-12 bg-gray-300 flex items-center justify-center text-3xl! text-black" to="/create">
						+
					</NavLink>
				</div>
				<Outlet />
			</div>
		</section>
	);
}
