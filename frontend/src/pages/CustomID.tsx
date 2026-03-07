import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useCustomID from "@/entities/hooks/useCustomID";
import { createCustomId } from "@/entities/utils/createCustomId";
import { client } from "@/entities/client";

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
