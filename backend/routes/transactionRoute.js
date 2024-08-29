import express from 'express';
import { getAllTransaction, createTransaction, updateTransaction, deleteUser } from '../controllers/transactionController.js';
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router();


router.get('/', authenticate, getAllTransaction);             //getall transaction
router.post('/', authenticate, createTransaction);            //create transaction
router.put('/update', authenticate, updateTransaction);   //update transaction
router.delete('/delete/:id', authenticate, deleteUser);       //delete transaction

export default router;
