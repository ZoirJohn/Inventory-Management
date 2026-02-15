import Auth from "@/pages/Auth";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<></>} />
			<Route path="/auth" element={<Auth />} />
		</Routes>
	);
}

export default App;
