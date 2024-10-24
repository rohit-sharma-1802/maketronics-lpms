import express from 'express';
import { login } from './user.controller.js';

const router = express.Router();

router.post('/', login);



export default router;
