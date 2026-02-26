import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { Selection } from "@heroui/table";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useInventory from "@/entities/hooks/useInventory";
import useItems from "@/entities/hooks/useItems";

export default function DataTable() {
	const { inventoryId } = useParams();
	const { inventory } = useInventory(inventoryId as string);
	const { items } = useItems(inventoryId as string);
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

	const columns = Object.entries(inventory)
		.filter(([key, value]) => key.endsWith("State") && Boolean(value))
		.map((field, i) => {
			return { key: i, label: field[0].replace("State", "Name") };
		});
	const rows = items.map((field, i) => {
		console.log(field);
		return { id: i };
	});
	return (
		<Table aria-label="Items table" selectedKeys={selectedKeys} selectionMode="multiple" onSelectionChange={setSelectedKeys}>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.key} className="text-base">
						{inventory[column.label]}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={"No rows to display."} items={rows}>
				{(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}
			</TableBody>
		</Table>
	);
}
