import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { router } from './Routes/Routes.jsx';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import "./index.css";
import AuthProvider from "./provider/AuthProvider";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </DarkModeProvider>
  </StrictMode>
);
