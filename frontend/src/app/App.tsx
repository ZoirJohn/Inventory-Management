import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import Inventories from "@/pages/Inventories";
import DataTable from "@/widgets/DataTable";
import Inventory from "@/widgets/Inventory";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="auth" element={<Auth />} />

			<Route path="/" element={<Home />}>
				<Route index element={<Navigate to="inventories" replace />} />

				<Route path="inventories">
					<Route index element={<Inventories />} />

					<Route path=":inventoryId" element={<Inventory />}>
						<Route index element={<Navigate to="items" replace />} />
						<Route path="items" element={<DataTable />} />
						<Route path="chat" element={<>Chat</>} />
						<Route path="settings" element={<>Inventory Settings</>} />
						<Route path="custom-id" element={<>Custom ID Content</>} />
						<Route path="fields" element={<>Fields Content</>} />
						<Route path="access" element={<>Access Content</>} />
						<Route path="stats" element={<>Stats Content</>} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
