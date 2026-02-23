import { Card, CardBody, CardHeader } from "@heroui/card";
import { NavLink } from "react-router-dom";

export default function InventoryLink({ title, id }: { title: string; id: string }) {
	return (
		<NavLink to={id}>
			<Card className="py-4">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
					<p className="text-tiny uppercase font-bold">{title}</p>
					<small className="text-default-500">12 Tracks</small>
				</CardHeader>
				<CardBody className="overflow-visible py-2"></CardBody>
			</Card>
		</NavLink>
	);
}
