import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { useParams } from "react-router-dom";
import useInventory from "@/entities/hooks/useInventory";
import useItems from "@/entities/hooks/useItems";
import { Input } from "@heroui/input";
import { useState, useRef } from "react";
import { Button } from "@heroui/button";
import { SubmitHandler, useForm } from "react-hook-form";

export default function DataTable() {
	const { inventoryId } = useParams();
	const { inventory } = useInventory(inventoryId as string);
	const { items } = useItems(inventoryId as string);
	const [isUserAddingItem, setIsUserAddingItem] = useState<boolean>(false);
	const tableRef = useRef<HTMLTableElement>(null);

	const { register, handleSubmit } = useForm();
	const onSubmit: SubmitHandler<unknown> = (data) => {
		console.log(data);
		setIsUserAddingItem(false);
	};

	const columns = Object.entries(inventory)
		.filter(([key, value]) => key.endsWith("State") && Boolean(value))
		.map((field, i) => ({
			key: i,
			label: field[0].replace("State", "Name"),
		}));

	return (
		<div className="flex flex-col items-center gap-4">
			<Table
				aria-label="Items table"
				ref={tableRef}
				classNames={{
					base: "relative",
				}}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.key} className="text-base">
							{inventory[column.label]}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody emptyContent={"No rows to display."} items={items}>
					{(item) => <TableRow key={item}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}
				</TableBody>
			</Table>

			{isUserAddingItem && (
				<form id="itemCreator" onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-2" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
					{columns.map((col) => (
						<Input key={col.key} placeholder={inventory[col.label]} {...register(col.label.replace("Name", ""), { required: true })} />
					))}
				</form>
			)}

			{!isUserAddingItem && <Button onClick={() => setIsUserAddingItem(true)}>Add item</Button>}
			{isUserAddingItem && (
				<div className="flex gap-2">
					<Button type="submit" form="itemCreator" color="primary">
						Submit
					</Button>
					<Button variant="flat" onClick={() => setIsUserAddingItem(false)}>
						Cancel
					</Button>
				</div>
			)}
		</div>
	);
}
