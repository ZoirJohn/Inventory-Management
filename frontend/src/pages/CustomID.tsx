import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useCustomID from "@/entities/hooks/useCustomID";
import { createCustomId } from "@/entities/utils/createCustomId";
import { client } from "@/entities/client";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";

const example:Record<TRandomID,string> = {
	"20-bit": String(createCustomId["20-bit"]()),
	"32-bit": String(createCustomId["32-bit"]()),
	"6-digit": String(createCustomId["6-digit"]()),
	"9-digit": String(createCustomId["9-digit"]()),
	guid: String(createCustomId.guid()),
	sequence: "1",
	date: new Date().toISOString(),
}

export default function CustomID() {
	const { t } = useTranslation();
	const { inventoryId } = useParams();
	const { customId } = useCustomID(inventoryId as string);
	const elements: { key: TRandomID; label: string }[] = [
		{ key: "20-bit", label: t("twentyBitRandom") },
		{ key: "32-bit", label: t("thirtyTwoBitRandom") },
		{ key: "6-digit", label: t("sixDigitRandom") },
		{ key: "9-digit", label: t("nineDigitRandom") },
		{ key: "guid", label: t("guid") },
		{ key: "sequence", label: t("sequence") },
		{ key: "date", label: t("date") },
	];
	const [selects, setSelects] = useState<IdField[]>([]);
	const preview = selects.map((selected) => {
		return example[selected.type];
	});
	const handleSave = async () => {
		const formattedIdFormat = selects.map((select, index) => ({
			type: select.type,
			order: index + 1,
			value: "",
		}));
		await client.CREATE_CUSTOM_ID(inventoryId as string, formattedIdFormat);
	};
	useEffect(() => {
		setSelects(customId);
	}, [customId]);
	return (
		<section>
			<div className="flex flex-col items-start gap-2 container">
				{selects.map((select, idx) => {
					return (
						<label key={idx} className="flex items-center gap-4 w-1/2">
							<Select
								aria-label="select-box"
								className="max-w-xs"
								selectedKeys={[select.type!]}
								onSelectionChange={(keys) => {
									const key = Array.from(keys)[0] as TRandomID;

									setSelects((prev) => {
										if (key) {
											const copy = [...prev];

											copy[idx] = {
												...copy[idx],
												type: key,
											};

											return copy;
										}

										return prev;
									});
								}}
							>
								{elements.map((element) => {
									return (
										<SelectItem key={element.key} aria-label="select-item">
											{element.label}
										</SelectItem>
									);
								})}
							</Select>

							<Input
								type="text"
								value={example[select.type]}
								onChange={() => {
									setSelects((prev) => {
										const copy = [...prev];

										return copy;
									});
								}}
							/>
							<Dropdown>
								<DropdownTrigger>
									<Button variant="bordered">
										<svg className="w-6 dark:fill-white bg-transparent" viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
											<path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
										</svg>
									</Button>
								</DropdownTrigger>
								<DropdownMenu aria-label="Static Actions">
									<DropdownItem
										key="delete"
										className="text-danger"
										color="danger"
										onClick={() =>
											setSelects((prev) =>
												prev.filter((prevSelect) => {
													return prevSelect.id!==select.id;
												}),
											)
										}
									>
										Delete file
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</label>
					);
				})}
				<div className="flex gap-2 py-4">
					<Button onClick={() => setSelects((prev) => [...prev, { type: "20-bit", value: "", order: prev.length }])}>{t("add")}</Button>
					<Button className="bg-primary" hidden={!selects.length} onClick={handleSave}>
						{t("save")}
					</Button>
				</div>
				<p className="text-lg!">{selects.length ? "ITEM-" + preview.join("-") : false}</p>
			</div>
		</section>
	);
}
