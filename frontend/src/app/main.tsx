import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@/styles/globals.css";
// import { Provider } from "@/provider";
import { HeroUIProvider } from "@heroui/system";


ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<HeroUIProvider disableAnimation>
				<App />
			</HeroUIProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
