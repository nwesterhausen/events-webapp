import debugLib from 'debug';
import { RequestHandler } from 'express';
import { Knex } from 'knex';
const debug = debugLib('eventsapp:permissions-admin');

export const postPermission: RequestHandler = (req, res) => {
  const user_id = req.body.user_id;
  const permission_id = req.body.permission_id;
  if (!user_id || !permission_id) {
    const message = "Can't create a new permission without both user_id and permission_id!";
    debug('Rejected new permission, missing data');
    return res.status(400).send({
      error: message,
      ...req.body,
    });
  }
  new Promise(async (resolve, reject) => {
    const knex = req.app.get('db') as Knex;

    const existing_perms = await knex('user_permissions').select().where({
      user_id: user_id,
      permission_id: permission_id,
    });

    if (existing_perms.length > 0) {
      const message = 'User already has that permission!';
      debug('Rejected new permission, already exists');
      return resolve(
        res.status(400).send({
          error: message,
          ...req.body,
        })
      );
    }

    const _x = await knex('user_permissions').insert(
      {
        user_id: user_id,
        permission_id: permission_id,
      },
      ['id']
    );
    debug(`Granted User#${user_id} Permission#${permission_id} (u_p#${JSON.stringify(_x)})`);

    resolve(res.status(201).send({ created: _x }));
  }).catch((err) => {
    console.error(err);
    res.status(500).send({});
  });
};

export const deletePermission: RequestHandler = (req, res) => {
  const user_id = req.body.user_id;
  const permission_id = req.body.permission_id;
  if (!user_id || !permission_id) {
    const message = "Can't delete a permission without both user_id and permission_id!";
    debug('Rejected delete permission, missing data');
    return res.status(400).send({
      error: message,
      ...req.body,
    });
  }
  new Promise(async (resolve, reject) => {
    const knex = req.app.get('db') as Knex;

    const existing_perms = await knex('user_permissions').select().where({
      user_id: user_id,
      permission_id: permission_id,
    });

    if (existing_perms.length === 0) {
      const message = 'No matching permission for that user!';
      debug("Rejected delete permission, doesn't exists");
      return resolve(
        res.status(400).send({
          error: message,
          ...req.body,
        })
      );
    }

    const _x = await knex('user_permissions')
      .where({
        user_id: user_id,
        permission_id: permission_id,
      })
      .del(['id']);
    debug(`Deleted Permission#${permission_id} from User#${user_id} (u_p#${JSON.stringify(_x)})`);

    resolve(res.status(200).send({ deleted: _x }));
  }).catch((err) => {
    console.error(err);
    res.status(500).send({});
  });
};
