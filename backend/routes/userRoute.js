import express from 'express';
import { login, getAllUsers, createUser, updateUser, deleteUser, transactiondataAcToUser } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/login', login);
router.get('/',authenticate, getAllUsers);
router.get('/transactiondataAcToUser', authenticate, transactiondataAcToUser);
router.post('/',authenticate,createUser);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;
