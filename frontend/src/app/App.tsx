import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Auth from "@/pages/Auth";
import CustomID from "@/pages/CustomID";
import Home from "@/pages/Home";
import Inventories from "@/pages/Inventories";
import CreateInventory from "@/widgets/CreateInventory";
import DataTable from "@/widgets/DataTable";
import Inventory from "@/widgets/Inventory";
import Users from "@/pages/Users";
import useUser from "@/entities/hooks/useUser";
import { UserProvider } from "@/shared/UserProvider";
import Profile from "@/pages/Profile";

function App() {
	const { i18n } = useTranslation();
	const { user, refetch } = useUser();
	useEffect(() => {
		const theme = localStorage.getItem("theme");
		const language = localStorage.getItem("lang");

		if (theme == "dark") document.getElementById("root")?.classList.add("dark");
		if (language) i18n.changeLanguage(localStorage.getItem("lang") || "en");
	}, []);
	const value = { user, refetch };
	return (
		<UserProvider.Provider value={value}>
			<Routes>
				<Route element={<Auth />} path="auth" />
				<Route element={<Home />} path="/">
					<Route index element={<Navigate replace to="inventories" />} />
					<Route element={<Users />} path="users" />
					<Route element={<Profile />} path="profile" />
					<Route element={<CreateInventory />} path="create" />

					<Route path="inventories">
						<Route index element={<Inventories />} />

						<Route element={<Inventory />} path=":inventoryId">
							<Route index element={<Navigate replace to="items" />} />
							<Route element={<DataTable />} path="items" />
							<Route element={<CustomID />} path="custom-id" />
						</Route>
					</Route>
				</Route>
			</Routes>
		</UserProvider.Provider>
	);
}

export default App;
