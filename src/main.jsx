import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { router } from './Routes/Routes.jsx';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import "./index.css";
import AuthProvider from "./provider/AuthProvider";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
