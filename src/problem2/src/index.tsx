import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SWRConfig } from "swr";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        onErrorRetry: (error) => {
          console.error(error);
        },
      }}
    >
      <App />
    </SWRConfig>
  </StrictMode>
);
