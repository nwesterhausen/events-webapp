import express from 'express';
import { getIteneraries, getItenerariesHead, getIteneraryById } from './itenerary';
import { deleteSetlist, getSetlist, getSetlistById, postSetlist } from './setlists';
const router = express.Router();

router.get('/', function (req, res, next) {
  return res.status(200).json({ message: 'Welcome to Express API template' });
});

// Setlists
router.get('/setlists', getSetlist);
router.get('/setlists/:id', getSetlistById);
router.post('/setlist', postSetlist);
router.delete('/setlist', deleteSetlist);

// Iteneraries
router.get('/iteneraries', getIteneraries);
router.get('/itenerary/:id', getIteneraryById);
router.get('/iteneraries/head', getItenerariesHead);

export default router;
