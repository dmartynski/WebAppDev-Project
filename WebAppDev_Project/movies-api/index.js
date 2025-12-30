import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler';
import authenticate from './authenticate';
import moviesRouter from './api/movies';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:3000',  
}));

app.use(express.json());
app.use('/api/movies', authenticate, moviesRouter); 
app.use('/api/users', usersRouter);

app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});