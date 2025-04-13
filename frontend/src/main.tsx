import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { DashboardToggleProvider } from "./contexts/DashboardToggleContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <DashboardToggleProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DashboardToggleProvider>
  </QueryClientProvider>
);
