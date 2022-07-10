import express from 'express';
import { getUsers } from './users';
const router = express.Router();

router.get('/', function (req, res, next) {
  return res.status(200).json({ message: 'Welcome to Express API Admin' });
});

router.get('/users', getUsers);

export default router;
