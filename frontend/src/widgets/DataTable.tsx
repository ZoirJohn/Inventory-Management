import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { Selection } from "@heroui/table";
import { useState } from "react";

const rows = [{}];

const columns = [{}];

export default function DataTable() {
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

	return (
		<Table aria-label="Table with items" selectedKeys={selectedKeys} selectionMode="multiple" onSelectionChange={setSelectedKeys} className="[&>div]:p-2 sm:[&>div]:p-4 [&_td]:px-1 [&_th]:px-1 sm:[&_td]:px-3 sm:[&_th]:px-3">
			<TableHeader columns={columns}>{() => <TableColumn key={1}>{""}</TableColumn>}</TableHeader>
			<TableBody items={rows} className="border">
				{(item) => <TableRow key={2}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}
			</TableBody>
		</Table>
	);
}
