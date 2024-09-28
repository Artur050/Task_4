import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const uri = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(json());

connect(uri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});