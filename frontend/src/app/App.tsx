import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import Inventory from "@/pages/Inventory";
import DataTable from "@/widgets/DataTable";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />}>
				<Route index element={<Navigate to="inventory" replace />} />
				<Route path="inventory" element={<Inventory />}>
					<Route index element={<Navigate to="items" replace />} />
					<Route path="items" element={<DataTable />} />
					<Route path="chat" element={<>Chat</>} />
					<Route path="settings" element={<>Settings</>} />
					<Route path="custom-id" element={<>Custom ID</>} />
					<Route path="fields" element={<>Fields</>} />
					<Route path="access" element={<>Access</>} />
					<Route path="stats" element={<>Stats</>} />
				</Route>
				<Route path="settings" element={<>Settings</>} />
				<Route path="users" element={<>Users</>} />
			</Route>
			<Route path="auth" element={<Auth />} />
		</Routes>
	);
}

export default App;
