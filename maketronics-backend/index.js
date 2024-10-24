import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import Supplier from "./Supplier/Supplier.route.js";
import cookieParser from 'cookie-parser';
import Client from "./Client/Client.route.js";
import Product from "./Product/product.route.js";
import Login from "./User/user.route.js";
import { verifyToken } from './middlewares/authMiddleware.js';
import Leads from "./Lead/Lead.route.js";
import Order from "./OrderTracking/Order.route.js";
import Invoice from "./InvoiceCreation/Invoice.route.js";

dotenv.config();
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // React app origin
    credentials: true, // Allow credentials (cookies) to be sent
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

 app.use('/api/v1/supplier', verifyToken, Supplier);
 app.use('/api/v1/client', verifyToken, Client);
 app.use('/api/v1/product', verifyToken, Product);
 app.use('/api/v1/leads', verifyToken, Leads);
 app.use('/api/v1/order', verifyToken, Order);
 app.use('/api/v1/invoice', verifyToken, Invoice);
 app.use('/api/v1/login',  Login);
 



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


