import express from "express";
import { createBill, createInvoice, getAllInvoice, getBillDetailsByInvoiceId, getInvoiceDetailsByInvoiceId } from "./Invoice.controller.js";

const router = express.Router();

router.post("/create-new-invoice", createInvoice);
router.post("/add-part-details", createBill);
router.get("/get-invoice-details/:id", getInvoiceDetailsByInvoiceId);
router.get("/get-part-details/:id", getBillDetailsByInvoiceId);
router.get("/get-all-invoice", getAllInvoice);

export default router;
