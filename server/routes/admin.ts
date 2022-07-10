import express from 'express';
import { deletePermission, postPermission } from './permissions';
import { postUserData } from './restore';
import { deleteUser, getUsers } from './users';
const router = express.Router();

router.get('/', function (req, res, next) {
  return res.status(200).json({ message: 'Welcome to Express API Admin' });
});

router.get('/users', getUsers);
router.delete('/user', deleteUser);

router.post('/permissions', postPermission);
router.delete('/permissions', deletePermission);

router.post('/restore/users', postUserData);

export default router;
