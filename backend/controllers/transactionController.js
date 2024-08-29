import Transaction from '../models/transactionModel.js';
import dotenv from 'dotenv';
dotenv.config();
import { statusCode } from '../utils/statusCode.js';
import User from '../models/userModel.js';


// // data to send
// const responseBody = {
//     key: razorpayapikey
// };

// console.log(responseBody, 'responseBody');

// // Encrypt the whole response body
// const encryptedBody = encrypt(JSON.stringify(responseBody), secretKey);

// console.log(encryptedBody, 'encryptedBody');




// //encrypted data
// let encryptedData = req.body.encryptedBody;
// console.log('encryptedData', encryptedData);

// //decrypt body data and parse
// encryptedData = decrypt(encryptedData, secretKey);
// const parsedData = JSON.parse(encryptedData);
// console.log('parsedData', parsedData);


// Get all users
export const getAllTransaction = async (req, res) => {
    try {
        console.log('1')
        const transaction = await Transaction.find();
        console.log('transaction', transaction);
        res.status(statusCode.SUCCESS.code).json({
            message : 'Transaction data',
            data: transaction
        });
    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ message: err.message });
    }
};

// Create a new user
export const createTransaction = async (req, res) => {
    console.log('createTransaction', req.body);
    let name = req.user.name;
    let user = await User.findOne({ name: name });
    console.log('user', user);
    let id = user._id;
    console.log('id',id)
    try {
    let {payAmount, category, description } = req.body;
    
    if (!( payAmount && category && description )) {
        return res.status(statusCode.BAD_REQUEST.code).json({ message: 'Please send all required data' });
    }

    let createddt = new Date();
    let createdby = 1;

    const checkUsers = await Transaction.find({ id });
        console.log('checkUsers', checkUsers);
    const transaction = new Transaction({
        id: id,
        payAmount: payAmount,
        category: category,
        description: description,
        createddt: createddt,
        createdby: createdby
    });
    console.log('transaction', transaction);
        const newTransaction = await transaction.save();
        console.log('newTransaction', newTransaction);
        res.status(statusCode.CREATED.code).json({
            message: 'Expanse Added',
            data: newTransaction
        });
    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ message: err.message });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
