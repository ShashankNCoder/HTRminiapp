import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { WalletProvider } from "./context/WalletContext";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class">
    <WalletProvider>
      <App />
    </WalletProvider>
  </ThemeProvider>
);
