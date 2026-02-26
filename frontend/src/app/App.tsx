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
import { UserProvider } from "@/shared/UserProvider";
import useUser from "@/entities/hooks/useUser";

function App() {
  const { user } = useUser();
  const { i18n } = useTranslation();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const language = localStorage.getItem("lang");

    if (theme == "dark") document.getElementById("root")?.classList.add("dark");
    if (language) i18n.changeLanguage(localStorage.getItem("lang") || "en");
  }, []);

  return (
    <UserProvider.Provider value={{ user }}>
      <Routes>
        <Route element={<Auth />} path="auth" />
        <Route element={<Home />} path="/">
          <Route index element={<Navigate replace to="inventories" />} />
          <Route element={<CreateInventory />} path="create" />

          <Route path="inventories">
            <Route index element={<Inventories />} />

            <Route element={<Inventory />} path=":inventoryId">
              <Route index element={<Navigate replace to="items" />} />
              <Route element={<DataTable />} path="items" />
              <Route element={<>Chat</>} path="chat" />
              <Route element={<>Inventory Settings</>} path="settings" />
              <Route element={<CustomID />} path="custom-id" />
              <Route element={<>Fields Content</>} path="fields" />
              <Route element={<>Access Content</>} path="access" />
              <Route element={<>Stats Content</>} path="stats" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </UserProvider.Provider>
  );
}

export default App;
