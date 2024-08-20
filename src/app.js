import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});

export const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '16kb'}));
app.use(express.static(process.env.PUBLIC_DIR));
app.use(cookieParser());

//routes imports
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

//routes declaration
app.use('/products',productRouter);
app.use('/users',userRouter);
 
