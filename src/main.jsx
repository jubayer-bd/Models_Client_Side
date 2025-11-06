import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/AuthProvider.jsx";
import { router } from "./router/routes.jsx";
import { Toaster } from "react-hot-toast"; // ✅ import Toaster

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-center" // ✅ toast appears on top
        reverseOrder={false}
      />
    </AuthProvider>
  </StrictMode>
);
