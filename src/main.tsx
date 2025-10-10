import ReactDOM from "react-dom/client";
import "./index.css";
import { Page } from "./page";

// Unregister any existing service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Page />
);
