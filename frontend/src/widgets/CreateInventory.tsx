import useUser from "@/entities/hooks/useUser";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CreateInventory() {
	const { user, loading } = useUser();
	const { register, handleSubmit } = useForm<InventoryInput>();
	const { t } = useTranslation();
	const onSubmit: SubmitHandler<InventoryInput> = (data) => console.log(data);

	if (loading) return <h1>{t("loading")}</h1>;
	if (!user.id) return <Navigate to="/" />;
	return (
		<div className="flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-64px)] container">
			<h1 className="text-4xl">{t("createInventory")}</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="flex [&>div]:flex md:[&>div]:flex-row flex-col [&>div]:flex-col [&>div]:items-end gap-4 [&>div]:gap-2 md:gap-6 w-full md:w-2/3">
				<div>
					<Input {...register("title")} placeholder={t("title")} required />
					<Input {...register("description")} placeholder={t("description")} required />
				</div>

				<div>
					<Input {...register("customString1Name")} placeholder={t("string")} />
					<Input {...register("customString2Name")} placeholder={t("string")} />
					<Input {...register("customString3Name")} placeholder={t("string")} />
				</div>
				<div>
					<Input {...register("customText1Name")} placeholder={t("text")} />
					<Input {...register("customText2Name")} placeholder={t("text")} />
					<Input {...register("customText3Name")} placeholder={t("text")} />
				</div>
				<div>
					<Input {...register("customInt1Name")} placeholder={t("integer")} />
					<Input {...register("customInt2Name")} placeholder={t("integer")} />
					<Input {...register("customInt3Name")} placeholder={t("integer")} />
				</div>
				<div>
					<Input {...register("customLink1Name")} placeholder={t("link")} />
					<Input {...register("customLink2Name")} placeholder={t("link")} />
					<Input {...register("customLink3Name")} placeholder={t("link")} />
				</div>
				<div>
					<Input {...register("customBool1Name")} placeholder={t("boolean")} />
					<Input {...register("customBool2Name")} placeholder={t("boolean")} />
					<Input {...register("customBool3Name")} placeholder={t("boolean")} />
				</div>

				<Button type="submit" className="bg-primary text-white grow-0!">
					{t("submit")}
				</Button>
			</form>
		</div>
	);
}
