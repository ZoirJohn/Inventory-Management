import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { Alert } from "@heroui/alert";
import { client } from "@/entities/client";
import { UserProvider } from "@/shared/UserProvider";

const MAX_CUSTOM_FIELDS = 3;

export default function CreateInventory() {
	const [amount, setAmount] = useState<number>(1);
	const { user } = useContext(UserProvider);
	const {
		register,
		handleSubmit,
		reset,
		formState: { disabled },
	} = useForm<TInventory>();
	const { t } = useTranslation();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const onSubmit: SubmitHandler<TInventory> = async (data) => {
		client
			.CREATE_INVENTORY(data)
			.then(() => {setSuccess("Inventory created successfully");reset()})
			.catch((e) => setError(e.message));
	};

	useEffect(() => {
		if (!error) return;
		const timer = setTimeout(() => setError(""), 5000);
		return () => clearTimeout(timer);
	}, [error]);
	useEffect(() => {
		if (!success) return;
		const timer = setTimeout(() => setSuccess(""), 5000);
		return () => clearTimeout(timer);
	}, [success]);
	if (!user) return <Navigate to="/" />;
	function handleAddFields() {
		if (amount < MAX_CUSTOM_FIELDS) setAmount((prev) => prev + 1);
	}

	function handleRemoveFields() {
		if (amount < MAX_CUSTOM_FIELDS) setAmount((prev) => prev - 1);
	}
	return (
		<>
			<div className="flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-64px)] container">
				<h1 className="text-4xl">{t("createInventory")}</h1>

				<form className="relative flex flex-col gap-2 min-w-lg max-w-2xl " onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-2">
						<Input {...register("title")} required placeholder={t("title")} />
						<Input {...register("description")} required placeholder={t("description")} />
					</div>
					<div className="flex gap-2">
						{new Array(amount).fill(0).map((_, i) => (
							<div className="flex flex-col flex-1 gap-2" key={`customFieldWrapper-${i}`}>
								<Input {...register(`customString${i + 1}Name`)} placeholder={t("string")} />
								<Input {...register(`customText${i + 1}Name`)} placeholder={t("text")} />
								<Input {...register(`customInt${i + 1}Name`)} placeholder={t("integer")} />
								<Input {...register(`customLink${i + 1}Name`)} placeholder={t("link")} />
								<Input {...register(`customBool${i + 1}Name`)} placeholder={t("boolean")} />
							</div>
						))}
					</div>
					{amount < MAX_CUSTOM_FIELDS && (
						<button type="button" className="top-1/2 -right-30 absolute bg-gray-600 size-10! text-2xl! -translate-y-1/2 cursor-pointer" onClick={handleAddFields}>
							+
						</button>
					)}
					{amount != 1 && (
						<button type="button" className="top-1/2 -right-50 absolute bg-gray-600 size-10! text-2xl! -translate-y-1/2 cursor-pointer" onClick={handleRemoveFields}>
							-
						</button>
					)}

					<div className="flex">
						<Button className="bg-primary text-white" type="submit" disabled={disabled}>
							{t("submit")}
						</Button>
					</div>
				</form>
			</div>
			{error && <Alert className="right-5 bottom-5 absolute bg-danger-50! w-80" color="danger" description={error} title={"Error"} />}
			{success && <Alert className="right-5 bottom-5 absolute bg-success-50! w-80" color="success" description={success} title={"Success"} />}
		</>
	);
}
