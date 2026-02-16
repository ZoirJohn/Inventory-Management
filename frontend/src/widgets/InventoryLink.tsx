import { Card, CardBody, CardHeader } from "@heroui/card";
import { NavLink, useParams } from "react-router-dom";

export default function InventoryLink() {
	const { inventoryId } = useParams();
	console.log(inventoryId);
	return (
		<NavLink to="1">
			<Card className="py-4">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
					<p className="text-tiny uppercase font-bold">Daily Mix</p>
					<small className="text-default-500">12 Tracks</small>
					<h4 className="font-bold text-large">Frontend Radio</h4>
				</CardHeader>
				<CardBody className="overflow-visible py-2">
					<img alt="Card background" className="object-cover rounded-xl" src="https://heroui.com/images/hero-card-complete.jpeg" width={270} height={177} />
				</CardBody>
			</Card>
		</NavLink>
	);
}
