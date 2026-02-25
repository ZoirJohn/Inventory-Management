import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useTranslation } from "react-i18next";
import { Facebook, Google } from "@/widgets/OAuthButtons";

type TAuth = "login" | "sign-up";

export default function Auth() {
	const [selected, setSelected] = useState<TAuth>("login");
	const { t } = useTranslation();
	return (
		<section className="flex w-full min-h-screen items-center justify-center">
			<Card className="w-80 max-w-full grow-0 basis-auto h-auto">
				<CardBody className="overflow-hidden">
					<Tabs fullWidth aria-label="Tabs form" selectedKey={selected} size="md" className="flex-nowrap!" onSelectionChange={(value) => setSelected(value as unknown as TAuth)}>
						<Tab key="login" title={t("login")}>
							<form className="flex flex-col gap-4">
								<Input isRequired label={t("email")} placeholder={t("enterEmail")} type="email" autoComplete="username" />
								<Input isRequired label={t("password")} placeholder={t("enterPassword")} type="password" autoComplete="new-password" />
								<p className="text-small text-center">
									{t("needAccount")}{" "}
									<Link size="sm" onPress={() => setSelected("sign-up")}>
										{t("signUp")}
									</Link>
								</p>
								<div className="flex flex-col gap-2">
									<Button fullWidth color="primary">
										{t("login")}
									</Button>
									<Google />
									<Facebook />
								</div>
							</form>
						</Tab>
						<Tab key="sign-up" title={t("signUp")}>
							<form className="flex flex-col gap-4">
								<Input isRequired label={t("name")} placeholder={t("enterName")} type="text" autoComplete="username" />
								<Input isRequired label={t("email")} placeholder={t("enterEmail")} type="email" autoComplete="email" />
								<Input isRequired label={t("password")} placeholder={t("enterPassword")} type="password" autoComplete="current-password" />
								<p className="text-small text-center">
									{t("haveAccount")}{" "}
									<Link size="sm" onPress={() => setSelected("login")}>
										{t("login")}
									</Link>
								</p>
								<div className="flex flex-col gap-2">
									<Button fullWidth color="primary">
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
		</section>
	);
}
