import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import dotenv from 'dotenv';
dotenv.config();
let PORT = process.env.PORT || 9800;
import connectDB from './config/db.js';

//assigning object of express
const app = express();

//middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB().then(() => {
// console.log('MongoDB connected successfully');

// Define routes
app.use('/api/users', userRoutes);
// app.use('/api/transactions', transactionRoutes);

// Use error handling middleware
// app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
}).catch((error) => {
console.error('Failed to connect to MongoDB:', error);
process.exit(1); 
});