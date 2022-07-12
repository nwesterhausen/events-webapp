import debugLib from 'debug';
import { RequestHandler } from 'express';
import { Knex } from 'knex';
import { buildPermissionReference } from '../lib/session';

const debug = debugLib('eventsapp:account');

export const getAccount: RequestHandler = (req, res) => {
  // Check if the user is logged in
  if (req.session.user) {
    // If there is a session, get the user data from it
    new Promise(async (resolve, reject) => {
      const knex = req.app.get('db') as Knex;
      const user = await knex.first().from('users').where({ email: req.session.user });
      if (!user) {
        debug(`Somehow logged in use doesn't exist!`);
        return resolve(
          res.status(501).json({
            error: 'No user exists to match logged in user.',
          })
        );
      }
      const permissions = await knex.select().from('user_permissions').where({ user_id: user.id });

      return resolve(
        res.status(200).json({
          user_details: user,
          user_permissions: buildPermissionReference(permissions),
        })
      );
    }).catch(console.error);
  } else {
    debug(`rejected unauthorized visit to account page`);
    // If they aren't logged in return nothing as 403 FORBIDDEN
    return res.status(403).json({});
  }
};
