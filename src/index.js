import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Index from "./pages/Index";
import Content from "./pages/Content";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/content",
    element: <Content />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <div className="w-full bg-primary">
        <RouterProvider router={router} />
      </div>
    </RecoilRoot>
  </React.StrictMode>
);
