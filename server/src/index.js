import express from 'express';
import mongoose from 'mongoose';
import route from './routes/route';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/changeNetworks', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(cors());

app.use('/api/users', route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
