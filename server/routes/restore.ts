import debugLib from 'debug';
import { RequestHandler } from 'express';
import { Knex } from 'knex';
import { User } from 'knex/types/tables';
import { use } from 'passport';
import { PermissionsObj } from '../../typing-stubs/express-session';
import { PERMISSION_ID } from '../lib/session';
const debug = debugLib('eventsapp:db-restore');

type UserData = User & PermissionsObj;
type InsertUserData = {
  email: string;
  name: string;
  discordId?: string;
  googleId?: string;
};

const isValidUserData = (user: UserData): boolean => {
  if (!user.id) return false;
  if (!user.name) return false;
  if (!user.email) return false;
  if (user.googleId === null && user.discordId === null) return false;
  return true;
};

export const postUserData: RequestHandler = (req, res) => {
  const replacementData: UserData[] = req.body;
  // Check if Array
  if (!Array.isArray(replacementData)) {
    const message = `Expected UserData[] but instead got ${typeof replacementData}`;
    debug(message);
    return res.status(400).send({
      error: message,
      original_data: req.body,
    });
  }
  // Check if it is empty
  if (replacementData.length === 0) {
    const message = `Received an empty array, will not restore`;
    debug(message);
    return res.status(400).send({
      error: message,
      original_data: req.body,
    });
  }

  new Promise(async (r, j) => {
    const knex = req.app.get('db') as Knex;
    const skipped: { id: number; name: string }[] = [];
    const created: { user_id?: number; perm_id?: number[]; original_id: number; name: string }[] = [];
    for (const user of replacementData) {
      if (isValidUserData(user)) {
        const newUser: InsertUserData = {
          name: user.name,
          email: user.email,
        };
        if (user.discordId !== null) {
          newUser.discordId = user.discordId;
        }
        if (user.googleId !== null) {
          newUser.googleId = user.googleId;
        }
        // insert user
        const res = await knex('users').insert(newUser);
        const insertedUserId = res[0];
        debug(`Created User:${insertedUserId}`);
        // insert permissions
        const insertedIds: number[] = [];
        if (user.VIEW_ALL === true) {
          const res = await knex('user_permissions').insert({
            user_id: insertedUserId,
            permission_id: PERMISSION_ID.VIEW_ALL,
          });
          debug(`Granted User:${insertedUserId} Permission:${PERMISSION_ID.IS_ADMIN} (u_p:${JSON.stringify(res)})`);
          insertedIds.push(res[0]);
        }
        if (user.MODIFY_ALL === true) {
          const res = await knex('user_permissions').insert({
            user_id: insertedUserId,
            permission_id: PERMISSION_ID.MODIFY_ALL,
          });
          debug(`Granted User:${insertedUserId} Permission:${PERMISSION_ID.IS_ADMIN} (u_p:${JSON.stringify(res)})`);
          insertedIds.push(res[0]);
        }
        if (user.IS_ADMIN === true) {
          const res = await knex('user_permissions').insert({
            user_id: insertedUserId,
            permission_id: PERMISSION_ID.IS_ADMIN,
          });
          debug(`Granted User:${insertedUserId} Permission:${PERMISSION_ID.IS_ADMIN} (u_p:${JSON.stringify(res)})`);
          insertedIds.push(res[0]);
        }
        const consequences = {
          perm_id: insertedIds,
          user_id: insertedUserId,
          original_id: user.id,
          name: user.name,
        };
        debug(`Restored: ${JSON.stringify(consequences)}`);
        created.push(consequences);
      } else {
        skipped.push({ id: user.id, name: user.name });
      }
    }
    if (skipped.length === replacementData.length) {
      const message = `Skipped all entries in array due to invalid data`;
      debug(message);
      return r(
        res.status(400).send({
          error: message,
          original_data: req.body,
        })
      );
    }
    if (skipped.length > 0) {
      const message = `Skipped ${skipped.length} users due to invalid data.`;
      debug(message);
      return r(
        res.status(400).send({
          warning: message,
          skipped: skipped,
          original_data: req.body,
          created: created,
        })
      );
    }
    return r(
      res.status(201).send({
        created: created,
      })
    );
  }).catch(console.error);
};
