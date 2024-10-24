import express from 'express';
import { createClient, deleteClient, getAllClient, getClient, updateClient } from './Client.controller.js';

const router = express.Router();

router.post('/create-Client', createClient);
router.get('/get-Client/:id', getClient);
router.get('/get-Clients-paginated', getAllClient);
router.put('/update-Client', updateClient);
router.delete('/delete-Client/:id', deleteClient);


export default router;
