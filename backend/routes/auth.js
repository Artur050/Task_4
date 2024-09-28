import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import User from '../models/User.js';
const router = Router();

router.post('/register', async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const hashedPassword = await hash(password, 10);
  try {
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.status === 'blocked') return res.status(403).json({ message: 'User is blocked' });

  const validPassword = await compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

  const token = sign({ id: user._id, email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });
  res.json({ token, user: {name: user.name} });
});

export default router;