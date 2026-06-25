import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.scss";
import queryClient from "@/lib/queryClient";
import { router } from "@/lib/router";
import { App, ConfigProvider } from "antd";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ConfigProvider
        theme={{
          components: {
            Message: {
              zIndexPopup: 10000,
            },
          },
        }}
      >
        <App>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </App>
      </ConfigProvider>
    </StrictMode>,
  );
}
