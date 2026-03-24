import { client } from "@/entities/client";
import { SalesforceLogo } from "@/shared/assets/salesforcelogo";
import { UserProvider } from "@/shared/UserProvider";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

export default function Profile() {
	const { user } = useContext(UserProvider);
	const { t } = useTranslation();
	const { register, handleSubmit } = useForm({ defaultValues: { FirstName: user?.name.split(" ")[0] || "", LastName: user?.name.split(" ")[1] || "", Email: user?.email || "", Title: "" } });
	const [isSalesforceFormOpen, setIsSalesforceOpen] = useState(false);

	const onSubmit = async (formData: { FirstName: string; LastName: string; Email: string; Title: string }) => {
		try {
			await client.SYNC_WITH_SALESFORCE(formData);
			setIsSalesforceOpen(false);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
			}
		} finally {
		}
	};

	if (!user) return <Navigate to="/" />;
	return (
		<section>
			<div className="container">
				<h1 className="text-3xl my-4">Profile</h1>
				{isSalesforceFormOpen && (
					<form className="flex flex-col gap-4 w-1/2" onSubmit={handleSubmit(onSubmit)}>
						<Input autoComplete="name" label={t("name")} placeholder={t("enterName")} type="text" {...register("FirstName")} id="name" />
						<Input autoComplete="family-name" label={t("lastName")} placeholder={t("enterLastName")} type="text" {...register("LastName")} id="lastname" />
						<Input autoComplete="family-name" label={t("email")} placeholder={t("enterEmail")} type="email" {...register("Email")} id="email" />
						<Input autoComplete="title" label={t("title")} placeholder={t("enterTitle")} type="text" {...register("Title")} id="email" />
						<Button className="bg-primary min-w-1/2 " type="submit">
							Sync with Salesforce
							<SalesforceLogo className="size-15 shrink-0 block" />
						</Button>
					</form>
				)}
				{!isSalesforceFormOpen && (
					<Button className="bg-primary w-3/10" onClick={() => setIsSalesforceOpen(true)}>
						Sync with Salesforce
					</Button>
				)}
			</div>
		</section>
	);
}
