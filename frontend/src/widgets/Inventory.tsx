import { Tab, Tabs } from "@heroui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const tabs = ["items", "custom-id"];

export default function Inventory() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const currentTab = pathname.split("/").filter(Boolean).at(-1);

	return (
		<div className="container flex flex-col gap-4">
			<Tabs aria-label="Inventory Tabs" id="inventory-tab" selectedKey={currentTab} variant="underlined" onSelectionChange={(key) => navigate(key.toString())}>
				{tabs.map((tab, _) => {
					return <Tab key={tab} className="w-auto" title={t(tab).toUpperCase()} />;
				})}
			</Tabs>
			<Outlet />
		</div>
	);
}
