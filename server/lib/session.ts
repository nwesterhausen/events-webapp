import { Request } from 'express';
import { Knex } from 'knex';

/**
 * Creates details about the session to send to the page view renderer.
 */
const debug = require('debug')('eventsapp:session-util');

export const PERMISSION_ID = {
  VIEW_ALL: 1,
  MODIFY_ALL: 2,
  IS_ADMIN: 3,
};

const DefaultPermissions = {
  IS_ADMIN: false,
  MODIFY_ALL: false,
  VIEW_ALL: false,
};

type User = {
  email: string;
  name: string;
  id: number;
};

export async function applyUserToSession(user: any, req: Request) {
  req.session.user = user.email;
  req.session.user_name = user.name;
  req.session.user_id = user.id;

  const permissions = await (req.app.get('db') as Knex).select().from('user_permissions').where({ user_id: user.id });

  if (permissions.length == 0) {
    debug(`${user.name} has no assigned permissions. (User ID: ${user.id})`);
    return;
  }

  debug(`${user.name} has ${permissions.length} permissions.`);
  req.session.user_permissions = buildPermissionReference(permissions);
}

/**
 * Turn the array of user permissions into something easier to use in the template engine.
 *
 * @param permissionArray array of user's permissions (as ids)
 * @returns object with booleans for each permission
 */
export function buildPermissionReference(permissionArray: number[] | any[]) {
  const result = {
    IS_ADMIN: false,
    MODIFY_ALL: false,
    VIEW_ALL: false,
  };
  // Check if we were given an array. If we were, we can toggle the flags in the dictionary object
  // to be true as needed. If we weren't, just return all flags as false.
  if (Array.isArray(permissionArray) && permissionArray.length > 0) {
    // Check if we were given an array of numbers or of "any"
    if (typeof permissionArray[0] === 'number') {
      if (permissionArray.indexOf(PERMISSION_ID.MODIFY_ALL) >= 0) {
        result.MODIFY_ALL = true;
      }
      if (permissionArray.indexOf(PERMISSION_ID.VIEW_ALL) >= 0) {
        result.VIEW_ALL = true;
      }
      if (permissionArray.indexOf(PERMISSION_ID.IS_ADMIN) >= 0) {
        result.IS_ADMIN = true;
      }
    } else if (permissionArray[0].permission_id) {
      return buildPermissionReference([...permissionArray.map((v) => v.permission_id)]);
    }
    debug(`Transformed ${JSON.stringify(permissionArray)} into ${JSON.stringify(result)}`);
  }

  return result;
}
