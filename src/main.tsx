import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles.css";
import App from "./App";
import Clients from "./pages/Clients";
import EmailValidation from "./pages/EmailValidation";
import Enterprise from "./pages/Enterprise";
import ProductsFamilies from "./pages/ProductsFamilies";
import Suppliers from "./pages/Suppliers";
import NotFoundPage from "./pages/NotFoundPage";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Users from "./pages/Users";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/confirmar/:token", element: <EmailValidation /> },
  { path: "/clientes", element: <Clients /> },
  { path: "/fornecedores", element: <Suppliers /> },
  { path: "/familias-produtos", element: <ProductsFamilies /> },
  { path: "/produtos", element: <Products /> },
  { path: "/servicos", element: <Services /> },
  { path: "/usuarios", element: <Users /> },
  { path: "/empresa", element: <Enterprise /> },
  { path: "*", element: <NotFoundPage /> },
]);

const queryClient = new QueryClient;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
