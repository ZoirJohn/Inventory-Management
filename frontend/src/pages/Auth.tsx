import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Input } from "@heroui/input";
import { useTranslation } from "react-i18next";
import { Facebook, Google } from "@/widgets/OAuthButtons";
import { SubmitHandler, useForm } from "react-hook-form";
import { client } from "@/entities/client";
import { Alert } from "@heroui/alert";
import { Link } from "@heroui/link";

type TAuth = "login" | "sign-up";

export default function Auth() {
	const [selected, setSelected] = useState<TAuth>("login");
	const { t } = useTranslation();
	const [success, setSuccess] = useState<string>("");
	const [error, setError] = useState<string>("");
	const { register, handleSubmit, reset } = useForm();

	const login: SubmitHandler<TLoginForm> = async (data) => {
		try {
			const res = await client.LOGIN(data);

			if (res) {
				setSuccess("Logged in successfully");
				reset();
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);				
				throw new Error(error.message);
			}
		}
	};
	const signup: SubmitHandler<TLoginForm> = async (data) => {
		try {
			const res = await client.REGISTER(data);

			if (res) {
				setSuccess("Registered successfully");
				reset();
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
				throw new Error(error.message);
			}
		}
	};
	return (
		<section className="flex w-full min-h-screen items-center justify-center">
			<Card className="w-80 max-w-full grow-0 basis-auto h-auto">
				<CardBody className="overflow-hidden">
					<Tabs fullWidth aria-label="Tabs form" className="flex-nowrap!" selectedKey={selected} size="md" onSelectionChange={(value) => setSelected(value as unknown as TAuth)}>
						<Tab key="login" title={t("login")}>
							<form className="flex flex-col gap-4" onSubmit={handleSubmit(login)}>
								<Input isRequired autoComplete="username" label={t("email")} placeholder={t("enterEmail")} type="email" {...register("email")} />
								<Input isRequired autoComplete="current-password" label={t("password")} placeholder={t("enterPassword")} type="password" {...register("password")} />
								<p className="text-small text-center ">
									{t("needAccount")}{" "}
									<Link size="sm" className="cursor-pointer" onPress={() => setSelected("sign-up")}>
										{t("signUp")}
									</Link>
								</p>
								<div className="flex flex-col gap-2">
									<Button fullWidth color="primary" type="submit">
										{t("login")}
									</Button>
									<Google />
									<Facebook />
								</div>
							</form>
						</Tab>
						<Tab key="sign-up" title={t("signUp")}>
							<form className="flex flex-col gap-4" onSubmit={handleSubmit(signup)}>
								<Input isRequired autoComplete="name" label={t("name")} placeholder={t("enterName")} type="text" {...register("name")} />
								<Input isRequired autoComplete="email" label={t("email")} placeholder={t("enterEmail")} type="email" {...register("email")} />
								<Input isRequired autoComplete="current-password" label={t("password")} placeholder={t("enterPassword")} type="password" {...register("password")} />
								<p className="text-small text-center">
									{t("haveAccount")}{" "}
									<Link size="sm" onPress={() => setSelected("login")} className="cursor-pointer">
										{t("login")}
									</Link>
								</p>
								<div className="flex flex-col gap-2">
									<Button fullWidth color="primary" type="submit">
										{t("signUp")}
									</Button>
									<Google />
									<Facebook />
								</div>
							</form>
						</Tab>
					</Tabs>
				</CardBody>
			</Card>
			{error && <Alert className="absolute bottom-5 right-5 w-80 bg-danger-50!" color="danger" description={error} title={"Error"} />}
			{success && <Alert className="absolute bottom-5 right-5 w-80 bg-success-50!" color="success" description={success} title={"Success"} />}
		</section>
	);
}
