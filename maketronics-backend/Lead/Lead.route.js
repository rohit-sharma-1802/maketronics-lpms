import express from "express";
import { addLeadMessage, createLead, createLeadQuote, getAllLeadDetails, getAllLeadMessage, getLeadDetails, getQuoteDetails, updateLeadBadge, updateLeadDetails, updateSupplierQuoteDetails } from "./Lead.controller.js";

const router = express.Router();

router.post("/create-lead", createLead);
router.post("/create-lead-quote", createLeadQuote);
router.get("/get-lead-details/:id", getLeadDetails);
router.get("/get-quote-details/:id", getQuoteDetails);
router.get("/get-all-leads", getAllLeadDetails);
router.put("/update-badge", updateLeadBadge);
router.put("/update-lead-details", updateLeadDetails);
router.put("/update-quote-details", updateSupplierQuoteDetails);
router.post("/add-lead-comment", addLeadMessage);
router.get("/get-lead-comment/:id", getAllLeadMessage);

export default router;