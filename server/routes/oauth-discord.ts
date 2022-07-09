import express, { RequestHandler, Router } from 'express';
import { Knex } from 'knex';
import passport from 'passport';
import DiscordStrategy from 'passport-discord';
import debugLib from 'debug';
import { applyUserToSession, PERMISSION_ID } from '../lib/session';

const debug = debugLib('eventsapp:oauth-discord');
const CallbackURL =
  process.env.NODE_ENV === 'production' ? 'https://events.nwest.link/auth/discord/callback' : 'http://localhost:3030/auth/discord/callback';
const scopes = ['identify', 'email'];

export const CreateDiscordOauthRouter = (db: Knex): Router => {
  const router = express.Router();

  passport.use(
    new DiscordStrategy.Strategy(
      {
        clientID: process.env['DISCORD_CLIENT_ID'] || '',
        clientSecret: process.env['DISCORD_CLIENT_SECRET'] || '',
        callbackURL: CallbackURL,
        scope: scopes,
      },
      function (accessToken, refreshToken, profile, cb) {
        new Promise(async (resolve, rej) => {
          // Check for an exact match
          let matchingUser = await db('users').first().where({ discordId: profile.id });
          if (matchingUser) {
            debug(`Matched existing user ${matchingUser.name}`);
            if (matchingUser.email === '') {
              // If our found user doesn't have an email set, lets try to fill it from discord.
              matchingUser.email = profile.email ? profile.email : '';
              await db('users').where({ discordId: profile.id }).update({
                email: matchingUser.email,
              });
            }
            return resolve(cb(null, matchingUser));
          }
          if (profile.email) {
            // Check for an email match
            matchingUser = await db('users').first().where({ email: profile.email });
            if (matchingUser) {
              debug(`Matched existing user ${matchingUser.name}`);
              if (matchingUser.discordId === null) {
                matchingUser.discordId = profile.id;
                const _x: { id: number; discordId: string }[] | number = await db('users').where({ email: profile.email }).update(
                  {
                    discordId: profile.id,
                  },
                  ['id', 'discordId']
                );
                if ((_x as []).length > 0) {
                  debug(`Updated user discordId ${_x[0].discordId}`);
                } else if ((_x as number) === 1) {
                  debug(`Updated user discordId (affected ${_x} rows)`);
                } else {
                  debug(`Failure to update user's discordId`);
                }
              }
              return resolve(cb(null, matchingUser));
            }
          }
          // Create user if we were unable to match them.
          const newUser: { id: number; name: string; email: string } = await db('users').insert(
            {
              discordId: profile.id,
              name: profile.username,
              email: profile.email ? profile.email : '',
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

  router.get('/discord', passport.authenticate('discord'));
  router.get('/discord/callback', passport.authenticate('discord', { assignProperty: 'user' }), (req, res, next) => {
    debug(req.user);
    applyUserToSession(req.user, req);
    req.session.save((err) => res.redirect(302, '/'));
  });

  return router;
};
