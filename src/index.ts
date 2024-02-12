import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import quoteRouter from './routes/quotes.js';
import userRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import authenticated from './middleware/auth.js';
import xss from './middleware/xss.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;


const connectionString = process.env.DATABASE_URL!;
mongoose.connect(connectionString);

app.use(express.json());
app.use(cors());
app.use(xss);

app.get('/', (req, res) => {
    res.status(200).send('OK');
  });

app.use('/auth', authRouter);
app.use(authenticated);

app.use('/quotes', quoteRouter);
app.use('/users', userRouter);


app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
 })