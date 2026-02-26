import useInventories from "@/entities/hooks/useInventories";
import Inventory from "@/widgets/InventoryLink";
import { NavLink, Outlet } from "react-router-dom";

export default function Inventories() {
	const { inventories } = useInventories();
	return (
		<section className="pt-10">
			<div className="container flex">
				<div className="flex gap-4 items-center flex-wrap">
					{inventories.map(({ title, description, id, creatorName, createdAt }) => (
							<Inventory title={title} description={description} id={id} key={id} creatorName={creatorName} createdAt={createdAt} />
					))}
					<NavLink to="/create" className="size-12 bg-gray-300 flex items-center justify-center text-3xl! text-black">
						+
					</NavLink>
				</div>
				<Outlet />
			</div>
		</section>
	);
}
