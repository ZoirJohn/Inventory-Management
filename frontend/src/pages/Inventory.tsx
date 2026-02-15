import { Tab, Tabs } from "@heroui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const tabs = ["items", "chat", "settings", "custom-id", "fields", "access", "stats"];

export default function Inventory() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const currentTab = pathname.split("/").filter(Boolean).at(-1);
	return (
		<section>
			<div className="container">
				<div className="flex flex-wrap gap-4 mb-2">
					<Tabs aria-label="Inventory Tabs" variant="underlined" selectedKey={currentTab} onSelectionChange={(key) => navigate(key.toString())} className="">
						{tabs.map((tab, _) => {
							return <Tab key={tab} title={tab.toUpperCase()} className="w-auto" />;
						})}
					</Tabs>
				</div>
				<Outlet />
			</div>
		</section>
	);
}
