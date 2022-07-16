import debugLib from 'debug';
import express, { RequestHandler } from 'express';
import { getAccount, putAccount } from './account';

const debug = debugLib('eventsapp:auth');

const LogoutHandler: RequestHandler = (req, res) => {
  if (req.session.user) {
    debug(`destroying session for user ${req.session.user}`);
    req.session.destroy(() => {
      debug('Session destroyed');
    });
  }
  res.redirect(302, '/');
};

const router = express.Router();

router.get('/me', getAccount);
router.put('/me', putAccount);
router.get('/logout', LogoutHandler);

export default router;
