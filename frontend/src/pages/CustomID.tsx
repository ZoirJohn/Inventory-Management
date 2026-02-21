import { random20Bit, random32Bit, random6Digit, random9Digit } from "@/entities/utils/createCustomId";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useRef, useState } from "react";

export default function CustomID() {
	const sequenceRef = useRef(1);

	const elements: { key: RandomID; label: string }[] = [
		{ key: "fixed", label: "Fixed" },
		{ key: "20-bit-number", label: "20-bit random number" },
		{ key: "32-bit-number", label: "32-bit random number" },
		{ key: "6-digit-number", label: "6-digit random number" },
		{ key: "9-digit-number", label: "9-digit random number" },
		{ key: "guid", label: "GUID" },
	];

	const generators: Record<RandomID, () => string> = {
		"20-bit-number": () => String(random20Bit()),
		"32-bit-number": () => String(random32Bit()),
		"6-digit-number": () => String(random6Digit()),
		"9-digit-number": () => String(random9Digit()),
		fixed: () => "",
		guid: () => crypto.randomUUID(),
		sequence: () => String(sequenceRef.current++),
		"date-time": () => new Date().toISOString(),
	};

	const [selects, setSelects] = useState<{ key: RandomID; value: string }[]>([]);

	return (
		<section>
			<div className="flex flex-col items-start gap-2 container">
				{selects.map((select, idx) => (
					<label className="flex w-1/2 items-center gap-4" key={idx}>
						<Select
							selectedKeys={[select.key]}
							onSelectionChange={(keys) => {
								const key = Array.from(keys)[0] as RandomID;

								setSelects((prev) => {
									const copy = [...prev];
									copy[idx] = {
										key,
										value: generators[key](),
									};
									return copy;
								});
							}}
							className="max-w-xs"
						>
							{elements.map((element) => (
								<SelectItem key={element.key}>{element.label}</SelectItem>
							))}
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
								value: generators["20-bit-number"](),
							},
						])
					}
				>
					Add
				</Button>
			</div>
		</section>
	);
}
