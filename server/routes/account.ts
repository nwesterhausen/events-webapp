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
      const user = await (res.app.get('db') as Knex).first().from('users').where({ email: req.session.user });
      const permissions = await (req.app.get('db') as Knex).select().from('user_permissions').where({ user_id: user.id });
      if (user) {
        return resolve(
          res.status(200).json({
            user_details: user,
            user_permissions: buildPermissionReference(permissions),
          })
        );
      } else {
        debug(`Somehow logged in use doesn't exist!`);
        return resolve(
          res.status(501).json({
            error: 'No user exists to match logged in user.',
          })
        );
      }
    }).catch(console.error);
  } else {
    debug(`rejected unauthorized visit to account page`);
    // If they aren't logged in return nothing as 403 FORBIDDEN
    return res.status(403).json({});
  }
};

export const postAccount: RequestHandler = (req, res, next) => {
  if (!req.body.updateType) {
    let err = new Error('updateType missing');
    next(err);
    return;
  }
  switch (req.body.updateType) {
    case 'user-details':
      (res.app.get('db') as Knex)
        .select('id', 'email')
        .where({ id: req.body.id })
        .from('users')
        .then(function (rows) {
          if (rows.length === 0) {
            let err = new Error('Database error when retrieving user details');
            throw err;
          }
          if (req.session.user !== rows[0].email) {
            let err = new Error('Mismatch user_id on update profile');
            throw err;
          }
          // If we get here, the user id and email match for session
          // so update the entry for that ID with req.body.firstName and req.body.lastName
          // Todo: validate that req.body.firstName and req.body.lastName exists properly
          return req.app.get('db')('users').where('id', '=', req.body.id).update({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
          });
        })
        .then(function () {
          return res.status(200).json({ message: 'Updated user data.' });
        })
        .catch(next);
      break;
    default: {
      // Break the site if we somehow called the wrong update
      let err = new Error(`Invalid option for updateType provided "${req.body.updateType}"`);
      next(err);
    }
  }
};
