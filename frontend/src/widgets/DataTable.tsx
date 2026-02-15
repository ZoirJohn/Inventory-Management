import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { Selection } from "@heroui/table";
import { useState } from "react";

const rows = [
	{
		key: "1",
		name: "Tony Reichert",
		role: "CEO",
		status: "Active",
	},
	{
		key: "2",
		name: "Zoey Lang",
		role: "Technical Lead",
		status: "Paused",
	},
	{
		key: "3",
		name: "Jane Fisher",
		role: "Senior Developer",
		status: "Active",
	},
	{
		key: "4",
		name: "William Howard",
		role: "Community Manager",
		status: "Vacation",
	},
];

const columns = [
	{
		key: "name",
		label: "NAME",
	},
	{
		key: "role",
		label: "ROLE",
	},
	{
		key: "",
		label: "",
	},
];

export default function DataTable() {
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

	return (
		<Table aria-label="Table with items" selectedKeys={selectedKeys} selectionMode="multiple" onSelectionChange={setSelectedKeys} className="[&>div]:p-2 sm:[&>div]:p-4 [&_td]:px-1 [&_th]:px-1 sm:[&_td]:px-3 sm:[&_th]:px-3">
			<TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
			<TableBody items={rows} className="border">
				{(item) => <TableRow key={item.key}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}
			</TableBody>
		</Table>
	);
}
