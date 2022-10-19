import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

export const app = express();
dotenv.config();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public/images')));

const options = {
  dbName: process.env.DB_NAME,
  //   user: process.env.DB_USER,
  //   pass: process.env.DB_PASS,
};

const connection = async () => {
  await mongoose.connect(process.env.DB_CONNECTION as string, options);
  console.log('Connected to databse');
};

connection();

//Agrego los routes

app.listen(process.env.PORT, () => {
  console.log('Server listening on port: ', process.env.PORT);
});
