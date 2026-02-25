import { Tab, Tabs } from "@heroui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const tabs = ["items", "chat", "settings", "custom-id", "fields", "access", "stats"];

export default function Inventory() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const currentTab = pathname.split("/").filter(Boolean).at(-1);
	return (
		<div className="container flex flex-col gap-4">
			<Tabs aria-label="Inventory Tabs" id="inventory-tab" variant="underlined" selectedKey={currentTab} onSelectionChange={(key) => navigate(key.toString())}>
				{tabs.map((tab, _) => {
					return <Tab key={tab} title={t(tab).toUpperCase()} className="w-auto" />;
				})}
			</Tabs>
			<Outlet />
		</div>
	);
}
