import express from 'express';
import { login, logout, getAllUsers, createUser, updateUser, deleteUser, transactiondataAcToUser } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router();


router.get('/',authenticate, getAllUsers);              //get all user
router.post('/', authenticate, createUser);             //create user
router.post('/login', login);                           //login
router.post('/logout', logout);                         //logout
router.put('/update/:id', authenticate, updateUser);    //update user
router.delete('/delete/:id', authenticate, deleteUser); //delete user
router.get('/transactiondataAcToUser', authenticate, transactiondataAcToUser); //data of transaction w.r.t user


export default router;
