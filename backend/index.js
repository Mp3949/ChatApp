// const express = require('express') //method-1
import express from 'express'; //method-2 
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import msgRoute from './routes/msgRoutes.js';
import cors from 'cors';
import { app, server } from './socket/socket.js'
import path from "path";

dotenv.config();  // No need for empty object

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware setup
app.use(express.json());  // Move this first as it's more commonly needed
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {  // Fixed typo in variable name
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',  // Make origin configurable
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']  // Explicitly specify allowed methods
};
app.use(cors(corsOptions));
//routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/message", msgRoute)

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
});

server.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})

