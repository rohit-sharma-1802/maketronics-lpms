import express from "express";
import { addPartToOrder, addStatusForPart, createNewOrder, editPartInOrder, getAllOrder, getOrderByOrderNo, getPartStatus } from "./Order.controller.js";

const router = express.Router();

router.post("/create-order", createNewOrder);
router.post("/add-part", addPartToOrder);
router.put("/edit-part", editPartInOrder);
router.post("/add-status", addStatusForPart);
router.get("/get-status/:orderId/:partNo", getPartStatus);
router.get("/get-all-order", getAllOrder);
router.get("/get-all-orders/:orderId", getOrderByOrderNo);

export default router;