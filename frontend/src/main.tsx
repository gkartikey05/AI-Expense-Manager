import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { DashboardToggleProvider } from "./contexts/DashboardToggleContext.tsx";

createRoot(document.getElementById("root")!).render(
  <DashboardToggleProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DashboardToggleProvider>
);
