import express from 'express';
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from './product.controller.js';

const router = express.Router();

router.post('/create-Product', createProduct);
router.get('/get-Product/:partNo', getProduct);
router.get('/get-Products-paginated', getAllProduct);
router.put('/update-Product', updateProduct);
router.delete('/delete-Product/:partNo', deleteProduct);


export default router;
