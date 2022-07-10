import express from 'express';
import { deletePermission, postPermission } from './permissions';
import { getUsers } from './users';
const router = express.Router();

router.get('/', function (req, res, next) {
  return res.status(200).json({ message: 'Welcome to Express API Admin' });
});

router.get('/users', getUsers);

router.post('/permissions', postPermission);
router.delete('/permissions', deletePermission);

export default router;
