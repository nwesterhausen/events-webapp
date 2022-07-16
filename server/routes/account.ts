import debugLib from 'debug';
import { RequestHandler } from 'express';
import { Knex } from 'knex';
import query from '../db/queries';

const debug = debugLib('eventsapp:account');

export const getAccount: RequestHandler = (req, res) => {
  // Check if the user is logged in
  if (req.session.user) {
    // If there is a session, get the user data from it
    new Promise(async (resolve, reject) => {
      const knex = req.app.get('db') as Knex;
      const user_matches = await query.Users.byId(knex, req.session.user_id);
      if (user_matches.length === 0) {
        debug(`Somehow logged in use doesn't exist!`);
        return resolve(
          res.status(501).json({
            error: 'No user exists to match logged in user.',
          })
        );
      }
      const user = user_matches[0];
      debug(user);
      return resolve(
        res.status(200).json({
          user_details: user,
        })
      );
    }).catch(console.error);
  } else {
    debug(`rejected unauthorized visit to account page`);
    // If they aren't logged in return nothing as 403 FORBIDDEN
    return res.status(403).json({});
  }
};

export const putAccount: RequestHandler = (req, res) => {
  // Check if the user is logged in
  if (req.session.user) {
    const new_name = req.body.name;
    const new_email = req.body.email;
    const user_id = req.session.user_id;
    if (!new_name || !new_email) {
      debug(`bad request to update account from ${req.session.user_name}`);
      debug(req.body);
      return res.status(400).json({
        error: `Bad value supplied for either 'name' or 'email' in request body`,
        original_data: req.body,
      });
    }
    if (!user_id) {
      debug(`somehow logged in user doesn't have an id!`);
      return res.status(500).json({
        error: `Current session isn't tied to a user_id, won't update.`,
      });
    }
    new Promise(async (resolve, reject) => {
      const knex = req.app.get('db') as Knex;
      await query.Users.update(knex, user_id, {
        name: new_name,
        email: new_email,
      });
      return res.status(200).json({
        message: `Account updated`,
      });
    }).catch(console.error);
  } else {
    debug(`rejected unauthorized update to an account`);
    // If they aren't logged in return nothing as 403 FORBIDDEN
    return res.status(403).json({});
  }
};
