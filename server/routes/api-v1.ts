import express from 'express';
import { getItineraries, getItinerariesHead, getItineraryById } from './itinerary';
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
router.get('/itineraries', getItineraries);
router.get('/itinerary/:id', getItineraryById);
router.get('/itineraries/head', getItinerariesHead);

export default router;
