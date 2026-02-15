import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";

type TAuth = "login" | "sign-up";

export default function Auth() {
	const [selected, setSelected] = useState<TAuth>("login");

	return (
		<section className="flex w-full min-h-screen items-center justify-center">
			<Card className="w-80 max-w-full grow-0 basis-auto h-auto">
				<CardBody className="overflow-hidden">
					<Tabs fullWidth aria-label="Tabs form" selectedKey={selected} size="md" onSelectionChange={(value) => setSelected(value as unknown as TAuth)}>
						<Tab key="login" title="Login">
							<form className="flex flex-col gap-4">
								<Input isRequired label="Email" placeholder="Enter your email" type="email" autoComplete="username" />
								<Input isRequired label="Password" placeholder="Enter your password" type="password" autoComplete="new-password" />
								<p className="text-small text-center">
									Need to create an account?{" "}
									<Link size="sm" onPress={() => setSelected("sign-up")}>
										Sign up
									</Link>
								</p>
								<div className="flex justify-end gap-2">
									<Button fullWidth color="primary">
										Login
									</Button>
								</div>
							</form>
						</Tab>
						<Tab key="sign-up" title="Sign up">
							<form className="flex flex-col gap-4 h-[300px]">
								<Input isRequired label="Name" placeholder="Enter your name" type="text" autoComplete="username" />
								<Input isRequired label="Email" placeholder="Enter your email" type="email" autoComplete="email" />
								<Input isRequired label="Password" placeholder="Enter your password" type="password" autoComplete="current-password" />
								<p className="text-small text-center">
									Already have an account?{" "}
									<Link size="sm" onPress={() => setSelected("login")}>
										Login
									</Link>
								</p>
								<div className="flex justify-end gap-2">
									<Button fullWidth color="primary">
										Sign up
									</Button>
								</div>
							</form>
						</Tab>
					</Tabs>
				</CardBody>
			</Card>
		</section>
	);
}
