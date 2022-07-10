import { RequestHandler } from 'express';
import { Knex } from 'knex';
import debugLib from 'debug';
import { PermissionsObj } from '../../typing-stubs/express-session';
import { User } from 'knex/types/tables';
import { buildPermissionReference } from '../lib/session';
const debug = debugLib('eventsapp:user-admin');

type UserData = User & PermissionsObj;

export const getUsers: RequestHandler = (req, res) => {
  new Promise(async (resolve, reject) => {
    const knex = req.app.get('db') as Knex;
    const users = await knex('users').select();
    const permissions = await knex('user_permissions').select();
    const user_data: UserData[] = [];
    for (const user of users) {
      const user_perms = buildPermissionReference(permissions.filter((v) => v.user_id === user.id));
      user_data.push({
        ...user,
        ...user_perms,
      });
    }

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
