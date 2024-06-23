import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import classRoutes from './routes/classRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import studentRoutes from './routes/studentRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'

const app = express()

dotenv.config();
const PORT = process.env.PORT;

//Cors policy
app.use(cors()); 

//Connect Database
connectDB();

//JSON
app.use(express.json())

//Load Routes
app.use(classRoutes)
app.use(teacherRoutes)
app.use(studentRoutes)
app.use(analyticsRoutes)


app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
})

