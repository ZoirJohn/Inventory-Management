import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { useParams } from "react-router-dom";
import useInventory from "@/entities/hooks/useInventory";
import useItems from "@/entities/hooks/useItems";
import { Input } from "@heroui/input";
import { useState, useRef } from "react";
import { Button } from "@heroui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { client } from "@/entities/client";
import getInputType from "@/entities/utils/getInputType";

export default function DataTable() {
	const { inventoryId } = useParams();
	const { inventory } = useInventory(inventoryId as string);
	const { items, clear } = useItems(inventoryId as string);
	const [isUserAddingItem, setIsUserAddingItem] = useState<boolean>(false);
	const tableRef = useRef<HTMLTableElement>(null);

	const { register, handleSubmit } = useForm();
	const onSubmit: SubmitHandler<unknown> = async (data: unknown) => {
		await client.CREATE_ITEMS(inventoryId as string, data as object);
		clear();
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
					{items.map((item: TItem) => {
						return (
							<TableRow key={item.id}>
								{columns.map((col) => {
									return <TableCell key={col.label}>{!col.label.includes("Bool") ? item[col.label.replace("Name", "") as keyof TItem] : item[col.label.replace("Name", "") as keyof TItem] ? "Yes" : "No"}</TableCell>;
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>

			{isUserAddingItem && (
				<form id="itemCreator" onSubmit={handleSubmit(onSubmit)} className="gap-2 grid w-full" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
					{columns.map((col) => (
						<Input type={getInputType(col.label)} key={col.key} placeholder={inventory[col.label]} {...register(col.label.replace("Name", ""), { required: !col.label.includes("Bool") })} />
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
