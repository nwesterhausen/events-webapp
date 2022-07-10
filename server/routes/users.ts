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
