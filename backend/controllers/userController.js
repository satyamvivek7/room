import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
import authToken from '../utils/authTokenFunction.js';
import bcrypt from 'bcryptjs';
import { statusCode }  from '../utils/statusCode.js';


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

export const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!(name && password)) {
            return res.status(statusCode.BAD_REQUEST.code).json({ message: 'Please send all required data' });
        }

        console.log('data',req.body);

        // Find user by name
        const users = await User.find({ name });
        console.log('users',users);

        if (users.length === 0) {
            return res.status(statusCode.BAD_REQUEST.code).json({ message: "Invalid username" });
        }

        // Assuming only one user per name
        const user = users[0];
        console.log('user',user);

        // Check password
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // Generate JWT tokens
            const tokens = await authToken(user); // Ensure this function is defined elsewhere
            console.log('tokens',tokens);
            const options = {
                httpOnly: true,
                sameSite: 'None', // Ensure sameSite is set correctly
                secure: true
            };

            return res.cookie('token', tokens, options) // Typically the refresh token is stored in cookies
                .status(statusCode.SUCCESS.code)
                .header('Authorization', `Bearer ${tokens}`)
                .json({
                    message: 'Logged in',
                    username: user.name,
                    Token: tokens
                });
        } else {
            return res.status(statusCode.BAD_REQUEST.code).json({ message: "Incorrect password" });
        }
    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ message: err.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        console.log('1')
        const users = await User.find();
        console.log('users', users);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    console.log('body create',req.body);

    let { title,name,age,role,submitedAmount,monthName,password } = req.body;

    if (!(title && name && age && role && submitedAmount && monthName && password)){
        return res.status(400).json({message: 'Please send all required data'});
    }

    let createddt = new Date();
    let createdby = 1;
    let salt = 10;

    const checkUsers = await User.find({ name });
    if (checkUsers.length > 0){
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        title: title ,
        name: name,
        age: age,
        role: role,
        password: hashedPassword,
        submitedAmount: submitedAmount,
        monthName: monthName,
        createddt: createddt ,
        createdby: createdby
    });
    console.log('user',user);
    try {
        const newUser = await user.save();
        console.log('newUser', newUser);
        res.status(201).json({
            message:'user created successfully ',
            data: newUser
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
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
