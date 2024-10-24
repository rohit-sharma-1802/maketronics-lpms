import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Pages/Login.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddProduct from './Pages/Product/AddProduct.js';
import ViewProduct from './Pages/Product/ViewProduct.js';
import App from './App.js';
import EditProduct from './Pages/Product/EditProduct.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import PreviewProduct from './Pages/Product/PreviewProduct.js';
import AddClient from './Pages/Client/AddClient.js';
import EditClient from './Pages/Client/EditClient.js';
import AddSupplier from './Pages/Supplier/AddSupplier.js';
import EditSupplier from './Pages/Supplier/EditSupplier.js';
import AllClientTable from './Pages/Client/AllClientTable.js';
import AllSupplierTable from './Pages/Supplier/AllSupplierTable.js';
import CreateLead from './Pages/Lead/CreateLead.js';
import FillQuoteDetails from './Pages/Lead/FillQuoteDetails.js';
import ViewLead from './Pages/Lead/ViewLead.js';
import EditLead from './Pages/Lead/EditLead.js';
import ViewAllLeads from './Pages/Lead/ViewAllLead.js';
import CreateOrder from './Pages/OrderTrack/CreateOrder.js';
import ViewOrder  from './Pages/OrderTrack/ViewOrder.js';
import CreateInvoice from './Pages/OrderInvoice/CreateInvoice.js';
import ViewInvoice from './Pages/OrderInvoice/ViewInvoice.js';
import ViewAllOrders from './Pages/OrderTrack/ViewAllOrder.js';
import ViewAllInvoice from './Pages/OrderInvoice/ViewAllInvoice.js';
import EditQuoteDetails from './Pages/Lead/EditQuoteDetails.js';
import AddQuoteDetails from './Pages/Lead/AddQuoteDetails.js';

const router = createBrowserRouter([
  {
    path:"/",
    element: <ProtectedRoute><App /></ProtectedRoute>
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Product/Add",
    element: <ProtectedRoute><AddProduct /></ProtectedRoute>
  },
  {
    path: "/Product/View",
    element: <ProtectedRoute><ViewProduct /></ProtectedRoute>
  },
  {
    path: "/Product/Edit/:id",
    element: <ProtectedRoute><EditProduct /></ProtectedRoute>
  },
  {
    path: "Product/View/:id",
    element: <ProtectedRoute><PreviewProduct /></ProtectedRoute>
  },
  {
    path: "/Client/Add",
    element: <ProtectedRoute><AddClient /></ProtectedRoute>
  },
  {
    path: "/Client/Edit/:id",
    element: <ProtectedRoute><EditClient /></ProtectedRoute>
  },
  {
    path: "/records/clients/",
    element: <ProtectedRoute><AllClientTable /></ProtectedRoute>
  },
  {
    path: "/Supplier/Edit/:id",
    element: <ProtectedRoute><EditSupplier /></ProtectedRoute>
  },
  {
    path: "/Supplier/Add",
    element: <ProtectedRoute><AddSupplier /></ProtectedRoute>
  },
  {
    path: "/records/suppliers/",
    element: <ProtectedRoute><AllSupplierTable /></ProtectedRoute>
  },
  {
    path: "/leads/add-new",
    element: <ProtectedRoute><CreateLead /></ProtectedRoute>
  },
  {
    path: "/fill-Quote/:id",
    element: <ProtectedRoute><AddQuoteDetails /></ProtectedRoute>
  },
  {
    path: "/edit-quote/:id",
    element: <ProtectedRoute><EditQuoteDetails /></ProtectedRoute>
  },
  {
    path: "/view-lead-details/:id",
    element: <ProtectedRoute><ViewLead /></ProtectedRoute>
  },
  {
    path: "/edit-lead-details/:id",
    element: <ProtectedRoute><EditLead /></ProtectedRoute>
  },
  {
    path: "/leads/view-all",
    element: <ProtectedRoute><ViewAllLeads /></ProtectedRoute>
  },
  {
    path: "/orders/create-new",
    element: <ProtectedRoute><CreateOrder /></ProtectedRoute>
  },
  {
    path: "/orders/view-order/:id",
    element: <ProtectedRoute><ViewOrder /></ProtectedRoute>
  },
  {
    path: "/orders/view-all",
    element: <ProtectedRoute><ViewAllOrders /></ProtectedRoute>
  },
  {
    path: "/invoice/create-new",
    element: <ProtectedRoute><CreateInvoice /></ProtectedRoute>
  },
  {
    path: "/invoice/view/:id",
    element: <ProtectedRoute><ViewInvoice /></ProtectedRoute>
  },
  {
    path: "/invoice/view-all",
    element: <ProtectedRoute><ViewAllInvoice /></ProtectedRoute>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
