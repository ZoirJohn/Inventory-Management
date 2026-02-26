import { Outlet } from "react-router-dom";

import Navigation from "@/widgets/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
