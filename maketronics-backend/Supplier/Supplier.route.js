import express from 'express';
import { createSupplier, deleteSupplier, getAllSupplier, getSupplier, updateSupplier } from './Supplier.controller.js';

const router = express.Router();

router.post('/create-Supplier', createSupplier);
router.get('/get-Supplier/:id', getSupplier);
router.get('/get-Suppliers-paginated', getAllSupplier);
router.put('/update-Supplier', updateSupplier);
router.delete('/delete-Supplier/:id', deleteSupplier);


export default router;
