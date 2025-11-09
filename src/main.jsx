import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import { router } from './Routes/Routes.jsx';
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./provider/AuthProvider";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
