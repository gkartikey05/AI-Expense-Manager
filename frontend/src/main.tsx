import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { DashboardToggleProvider } from "./contexts/DashboardToggleContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyProvider } from "./contexts/CurrencyContext.tsx";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <CurrencyProvider>
      <DashboardToggleProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DashboardToggleProvider>
    </CurrencyProvider>
  </QueryClientProvider>
);
