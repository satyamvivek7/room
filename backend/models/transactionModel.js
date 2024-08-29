import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true
        },
        payAmount: {
            type: Number,
            required: true,
            min: [0, 'Amount must be a non-negative number']
        },
        description: {
            type: String,
            required: false
        },
        createddt: {
            type: Date,
            required: true,
            default: Date.now
        },
        createdby: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: false,
    }
);


const Transaction = mongoose.model('transaction', transactionSchema,'transaction');

export default Transaction 