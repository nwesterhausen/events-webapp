import debugLib from 'debug';
import express, { Router } from 'express';
import { Knex } from 'knex';
import passport from 'passport';
import MagicLoginStrategy from 'passport-magic-login';
import { PERMISSION_ID } from '../../common/types/shared';
import { sendmail } from '../lib/email';
import { applyUserToSession } from '../lib/session';

const debug = debugLib('eventsapp:auth-magiclink');
const Hostname = process.env.NODE_ENV === 'production' ? 'https://events.nwest.link' : 'http://localhost:3030';

export const CreateMagicLinkAuthRouter = (db: Knex): Router => {
  const router = express.Router();

  // IMPORTANT: ALL OPTIONS ARE REQUIRED!
  const magicLoginOptions = {
    // Used to encrypt the authentication token. Needs to be long, unique and (duh) secret.
    secret: process.env.MAGIC_LINK_SECRET || 'somesecret420',

    // The authentication callback URL
    callbackUrl: '/auth/magiclogin/callback',

    // Called with th e generated magic link so you can send it to the user
    // "destination" is what you POST-ed from the client
    // "href" is your confirmUrl with the confirmation token,
    // for example "/auth/magiclogin/confirm?token=<longtoken>"
    sendMagicLink: async (destination, href, token) => {
      debug(`Sending magic link to ${destination} (${token})`);
      await sendmail({
        to: destination,
        subject: `MagicLogin ${token} on events.nwest.link`,
        body: `<p>Click this link to finish logging in:</p> ${Hostname}${href}`,
      }).catch(console.error);
    },

    // Once the user clicks on the magic link and verifies their login attempt,
    // you have to match their email to a user record in the database.
    // If it doesn't exist yet they are trying to sign up so you have to create a new one.
    // "payload" contains { "destination": "email" }
    // In standard passport fashion, call callback with the error as the first argument (if there was one)
    // and the user data as the second argument!
    verify: (payload, cb) => {
      // Get or create a user with the provided email from the database
      // getOrCreateUserWithEmail(payload.destination)
      const user_email: string = payload.destination;

      new Promise(async (resolve, rej) => {
        // Check for an exact match
        let matchingUser = await db('users').first().where({ email: user_email });
        if (matchingUser) {
          debug(`Matched existing user ${matchingUser.name}`);
          return resolve(cb(null, matchingUser));
        }

        // Create user if we were unable to match them.
        const newUser: { id: number; name: string; email: string } = await db('users').insert(
          {
            name: user_email,
            email: user_email,
          },
          ['id', 'name', 'email']
        );
        const user = newUser[0];
        debug(`Granting permission ${PERMISSION_ID.VIEW_ALL} (VIEW ALL) to ${user.id} (${user.name})`);
        await db('user_permissions').insert({
          user_id: user.id,
          permission_id: PERMISSION_ID.VIEW_ALL,
        });
        return resolve(cb(null, user));
      }).catch(console.error);
    },
  };
  const magicLogin = new MagicLoginStrategy(magicLoginOptions);

  passport.use(magicLogin);

  router.post(
    '/magiclogin',
    (req, res, next) => {
      debug(req.body);
      next();
    },
    magicLogin.send
  );
  router.get('/magiclogin/callback', passport.authenticate('magiclogin', { assignProperty: 'user' }), (req, res, next) => {
    debug(req.user);
    applyUserToSession(req.user, req);
    req.session.save((err) => res.redirect(302, '/'));
  });

  return router;
};
