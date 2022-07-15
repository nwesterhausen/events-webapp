import express, { Router } from 'express';
import { Knex } from 'knex';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import debugLib from 'debug';
import { applyUserToSession } from '../lib/session';
import { PERMISSION_ID } from '../../common/types/shared';

const debug = debugLib('eventsapp:oauth-google');
const CallbackURL =
  process.env.NODE_ENV === 'production' ? 'https://events.nwest.link/auth/google/callback' : 'http://localhost:3030/auth/google/callback';

export const CreateGoogleOauthRouter = (db: Knex): Router => {
  const router = express.Router();

  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: process.env['GOOGLE_CLIENT_ID'] || '',
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || '',
        callbackURL: CallbackURL,
      },
      function (accessToken, refreshToken, profile, cb) {
        new Promise(async (resolve, rej) => {
          // Check for an exact match
          let matchingUser = await db('users').first().where({ googleId: profile.id });
          if (matchingUser) {
            debug(`Matched existing user ${matchingUser.name}`);
            if (matchingUser.email === '') {
              // If our found user doesn't have an email set, lets try to fill it from google.
              matchingUser.email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '';
              await db('users').where({ googleId: profile.id }).update({
                email: matchingUser.email,
              });
            }
            return resolve(cb(null, matchingUser));
          }
          if (profile.emails && profile.emails.length > 0) {
            // Check for an email match
            matchingUser = await db('users').first().where({ email: profile.emails[0].value });
            if (matchingUser) {
              debug(`Matched existing user ${matchingUser.name}`);
              if (matchingUser.googleId === null) {
                matchingUser.googleId = profile.id;
                const _x: { id: number; googleId: string }[] | number = await db('users').where({ email: profile.emails[0].value }).update(
                  {
                    googleId: profile.id,
                  },
                  ['id', 'googleId']
                );
                if ((_x as []).length > 0) {
                  debug(`Updated user googleId ${_x[0].googleId}`);
                } else if ((_x as number) === 1) {
                  debug(`Updated user googleId (affected ${_x} rows)`);
                } else {
                  debug(`Failure to udpate user's googleId`);
                }
              }
              return resolve(cb(null, matchingUser));
            }
          }
          // Create user if we were unable to match them.
          const newUser: { id: number; name: string; email: string } = await db('users').insert(
            {
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '',
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
      }
    )
  );

  router.get('/google', passport.authenticate('google', { assignProperty: 'user', scope: ['profile', 'email'] }));
  router.get('/google/callback', passport.authenticate('google', { assignProperty: 'user' }), (req, res, next) => {
    debug(req.user);
    applyUserToSession(req.user, req);
    req.session.save((err) => res.redirect(302, '/'));
  });

  return router;
};
