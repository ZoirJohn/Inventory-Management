import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { customId } from "@/entities/utils/createCustomId";

export default function CustomID() {
	const { t } = useTranslation();
	const elements: { key: TRandomID; label: string }[] = [
		{ key: "fixed", label: t("fixed") },
		{ key: "20-bit-number", label: t("twentyBitRandom") },
		{ key: "32-bit-number", label: t("thirtyTwoBitRandom") },
		{ key: "6-digit-number", label: t("sixDigitRandom") },
		{ key: "9-digit-number", label: t("nineDigitRandom") },
		{ key: "guid", label: t("guid") },
		{ key: "sequence", label: t("sequence") },
		{ key: "date-time", label: t("date") },
	];

	const [selects, setSelects] = useState<{ key: TRandomID; value: string }[]>([]);
	return (
		<section>
			<div className="flex flex-col items-start gap-2 container">
				{selects.map((select, idx) => (
					<label key={idx} className="flex items-center gap-4 w-1/2">
						<Select
							aria-label="select-box"
							className="max-w-xs"
							selectedKeys={[select.key]}
							onSelectionChange={(keys) => {
								const key = Array.from(keys)[0] as TRandomID;
								setSelects((prev) => {
									if (key) {
										const copy = [...prev];
										copy[idx] = {
											key,
											value: String(customId[key]()),
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
							value={select.value}
							onChange={(e) => {
								const value = e.target.value;
								setSelects((prev) => {
									const copy = [...prev];

									copy[idx].value = value;
									return copy;
								});
							}}
						/>
					</label>
				))}

				<Button
					onClick={() =>
						setSelects((prev) => [
							...prev,
							{
								key: "20-bit-number",
								value: String(customId["20-bit-number"]()),
							},
						])
					}
				>
					{t("add")}
				</Button>
			</div>
		</section>
	);
}
