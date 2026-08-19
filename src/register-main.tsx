import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TenantRegistration from "./components/TenantRegistration";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TenantRegistration />
  </StrictMode>,
);