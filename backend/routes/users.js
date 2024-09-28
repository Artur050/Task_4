import { Router } from 'express';
import User from '../models/User.js';
const router = Router();

router.get('/', async (req, res) => {
  console.log('Get api/users called');
  
  const users = await User.find();
  res.json(users);
});

router.put('/block/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'blocked' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/unblock/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'active' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;