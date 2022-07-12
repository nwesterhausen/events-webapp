import debugLib from 'debug';
import { RequestHandler } from 'express';
import { Knex } from 'knex';
import queries from '../db/queries';
const debug = debugLib('eventsapp:user-admin');

export const getUsers: RequestHandler = (req, res) => {
  new Promise(async (resolve, reject) => {
    const user_data = await queries.Users.all(req.app.get('db') as Knex);

    resolve(
      res.status(200).send({
        user_details: user_data,
      })
    );
  }).catch((err) => {
    console.error(err);
    res.status(500).send({});
  });
};

export const deleteUser: RequestHandler = (req, res) => {
  if (!req.body.user_id || req.body.user_id === null) {
    const message = 'Require user ID to delete';
    debug(`Rejecting deletion of user (no user_id)`);
    return res.status(400).send({
      error: message,
      original_data: req.body,
    });
  }
  const delete_userid = parseInt(req.body.user_id);
  new Promise(async (r, j) => {
    const knex = req.app.get('db') as Knex;
    const res1 = await knex('users')
      .where({
        id: delete_userid,
      })
      .del();
    debug(res1);
    const res2 = await knex('user_permissions')
      .where({
        user_id: delete_userid,
      })
      .del();
    debug(res2);
    r(
      res.status(200).send({
        deleted: [res1, res2],
      })
    );
  }).catch(console.error);
};
