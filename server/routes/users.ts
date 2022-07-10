import { RequestHandler } from 'express';
import { Knex } from 'knex';

export const getUsers: RequestHandler = (req, res) => {
  new Promise(async (resolve, reject) => {
    const knex = req.app.get('db') as Knex;
    const users = knex('users').select();
    const permissions = knex('user_permissions').select();

    resolve(
      res.status(200).send({
        user_data: users,
        user_permissiosn: permissions,
      })
    );
  }).catch(console.error);
};
