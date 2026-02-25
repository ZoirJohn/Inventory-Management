import { Card, CardBody, CardHeader } from "@heroui/card";
import { NavLink } from "react-router-dom";

export default function InventoryLink({ title, id, description }: { title: string; id: string; description: string }) {
	return (
		<NavLink to={id}>
			<Card className="w-[400px]">
				<CardHeader className="flex gap-3">
					<h3 className="text-md">{title}</h3>
				</CardHeader>
				<CardBody>
					<p className="text-default-700">{description}</p>
				</CardBody>
			</Card>
		</NavLink>
	);
}
