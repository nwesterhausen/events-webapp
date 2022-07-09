import { Request } from 'express';

/**
 * Creates details about the session to send to the page view renderer.
 */
const debug = require('debug')('hotmarket:session-util');
const PERMISSION_ID = {
  VIEW_DASHBOARD: 1,
  VIEW_ALL: 2,
  MODIFY_ALL: 3,
  MODERATOR: 4,
  IS_ADMIN: 5,
};

/**
 * Helper function which composes an object from the data we store in the session. This
 * helps keep one copy of the code for adding variables to the views.
 *
 * @param {Request.session} session
 * @returns An object for view consumption with logged-in user data
 */
export function buildUserData(session: Request['session']) {
  const data = {
    // user's email
    user: session.user,
    // user's full name
    user_name: session.user_name,
    // dictionary of each permission and if the user has them
    user_permissions: session.user_permissions,
  };
  if (session.user) {
    debug(JSON.stringify(data));
  }
  return data;
}

/**
 * Turn the array of user permissions into something easier to use in the template engine.
 *
 * @param permissionArray array of user's permissions (as ids)
 * @returns object with booleans for each permission
 */
export function buildPermissionReference(permissionArray: number[]) {
  const result = {
    IS_ADMIN: false,
    MODERATOR: false,
    MODIFY_ALL: false,
    VIEW_DASHBOARD: false,
    VIEW_ALL: false,
  };
  // Check if we were given an array. If we were, we can toggle the flags in the dictionary object
  // to be true as needed. If we weren't, just return all flags as false.
  if (Array.isArray(permissionArray)) {
    if (permissionArray.indexOf(PERMISSION_ID.VIEW_DASHBOARD) >= 0) {
      result.VIEW_DASHBOARD = true;
    }
    if (permissionArray.indexOf(PERMISSION_ID.MODERATOR) >= 0) {
      result.MODERATOR = true;
    }
    if (permissionArray.indexOf(PERMISSION_ID.MODIFY_ALL) >= 0) {
      result.MODIFY_ALL = true;
    }
    if (permissionArray.indexOf(PERMISSION_ID.VIEW_ALL) >= 0) {
      result.VIEW_ALL = true;
    }
    if (permissionArray.indexOf(PERMISSION_ID.IS_ADMIN) >= 0) {
      result.IS_ADMIN = true;
    }
    debug(`Transformed ${permissionArray} into ${JSON.stringify(result)}`);
  }
  return result;
}
