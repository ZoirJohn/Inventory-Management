import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { useParams } from "react-router-dom";
import useInventory from "@/entities/hooks/useInventory";
import useItems from "@/entities/hooks/useItems";
import { Input } from "@heroui/input";
import { useState, useRef, useMemo, useContext } from "react";
import { Button } from "@heroui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { client } from "@/entities/client";
import getInputType from "@/entities/utils/getInputType";
import { t } from "i18next";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { UserProvider } from "@/shared/UserProvider";

export default function DataTable() {
	const { user } = useContext(UserProvider);
	const { t } = useTranslation();
	const { inventoryId } = useParams();
	const { inventory } = useInventory(inventoryId as string);
	const { items, refetch } = useItems(inventoryId as string);
	const [isUserAddingItem, setIsUserAddingItem] = useState<boolean>(false);
	const tableRef = useRef<HTMLTableElement>(null);

	const { register, handleSubmit, reset } = useForm();
	const onSubmit: SubmitHandler<unknown> = async (data: unknown) => {
		await client.CREATE_ITEM(inventoryId as string, data as object);
		refetch(inventoryId as string);
		reset();
		setIsUserAddingItem(false);
	};
	const onDelete = async (itemId: string) => {
		await client.DELETE_ITEM(itemId);
		refetch(inventoryId as string);
	};
	const columns = useMemo(
		() => [
			...Object.entries(inventory)
				.filter(([key, value]) => key.endsWith("State") && Boolean(value))
				.map((field, i) => ({
					key: i,
					label: field[0].replace("State", "Name"),
				})),
			{ key: "actions", label: "" },
		],
		[inventory],
	);

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
					{columns.map((column) => {
						return (
							<TableColumn key={column.key} className="text-base">
								{inventory[column.label]}
							</TableColumn>
						);
					})}
				</TableHeader>
				<TableBody emptyContent={t("noRowsToDisplay")} items={columns}>
					{items.map((item: TItem) => {
						return (
							<TableRow key={item.id}>
								{columns.map((col) => {
									return <TableCell key={col.label}>{renderCell(item, col, () => onDelete(item.id))}</TableCell>;
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>

			{user && isUserAddingItem && (
				<form id="itemCreator" onSubmit={handleSubmit(onSubmit)} className="gap-2 grid w-full" style={{ gridTemplateColumns: `repeat(${columns.length - 1}, 1fr)` }}>
					{columns.slice(0, columns.length - 1).map((col) => {
						return <Input type={getInputType(col.label)} className="w-full" key={col.key} placeholder={inventory[col.label]} {...register(col.label.replace("Name", ""), { required: !col.label.includes("Bool") })} />;
					})}
				</form>
			)}

			{user && !isUserAddingItem && <Button onClick={() => setIsUserAddingItem(true)}>{t("addItem")}</Button>}
			{user && isUserAddingItem && (
				<div className="flex gap-2">
					<Button type="submit" form="itemCreator" color="primary">
						{t("submit")}
					</Button>
					<Button variant="flat" onClick={() => setIsUserAddingItem(false)}>
						{t("cancel")}
					</Button>
				</div>
			)}
		</div>
	);
}

function renderCell(item: TItem, col: { key: string | number; label: string }, onDelete: () => void) {
	if (col.label.includes("Bool")) {
		return item[col.label.replace("Name", "") as keyof TItem] ? t("yes") : t("no");
	} else if (col.key == "actions") {
		return <DropdownButton onDelete={onDelete} />;
	} else {
		return item[col.label.replace("Name", "") as keyof TItem];
	}
}

function DropdownButton({ onDelete }: { onDelete: () => void }) {
	return (
		<Dropdown>
			<DropdownTrigger className="cursor-pointer">
				<Button className="bg-transparent">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6 dark:fill-white bg-transparent">
						<path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
					</svg>
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Action event example" onAction={() => onDelete()}>
				<DropdownItem key="delete" className="text-danger" color="danger">
					Delete item
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
