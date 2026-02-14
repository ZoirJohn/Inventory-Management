import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/system";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<HeroUIProvider>
				<App />
			</HeroUIProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
