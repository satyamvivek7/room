import express from 'express';
import { getAllTransaction, createTransaction, updateUser, deleteUser } from '../controllers/transactionController.js';
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router();


router.get('/', authenticate, getAllTransaction);
router.post('/', authenticate, createTransaction);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;
