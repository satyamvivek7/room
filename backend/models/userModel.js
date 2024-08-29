import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: false,
            default: 0,
            min: [0, 'Age must be a non-negative number']
        },
        role: {
            type: String,
            required: true,
        },
        submitedAmount: {
            type: Number,
            required: false,
            default: 0,
            min: [0, 'Amount must be a non-negative number']
        },
        monthName: {
            type: String,
            required: false,
            enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
        password: {
            type: String,
            required: true,
        },
        createddt: {
            type: Date,
            required: true,
            default: Date.now 
        },
        createdby: {
            type: Number,
            required: true,
        },
        updateddt: {
            type: Date,
            required : false
        },
        updatedby: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: false,
    }
);


const User = mongoose.model('user', userSchema,'user');

export default User