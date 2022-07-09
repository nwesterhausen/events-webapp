import express, { Router } from 'express';
import { getAccount } from './account';
const router = express.Router();

router.get('/me', getAccount);

export default router;
