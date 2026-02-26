import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { Selection } from "@heroui/table";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useInventory from "@/entities/hooks/useInventory";

export default function DataTable() {
	const { inventoryId } = useParams();
	const { inventory } = useInventory(inventoryId as string);
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

	const columns = Object.entries(inventory)
		.filter(([key, value]) => key.endsWith("State") && Boolean(value))
		.map((field, i) => {});

	return (
		// <Table aria-label="Items table" selectedKeys={selectedKeys} selectionMode="multiple" onSelectionChange={setSelectedKeys}>
		// 	<TableHeader columns={fields}>{(column) => <TableColumn key={column}>{column}</TableColumn>}</TableHeader>
		// 	<TableBody>{(item) => <TableRow>{() => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}</TableBody>
		// </Table>
		<div>Table</div>
	);
}
