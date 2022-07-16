import debugLib from 'debug';
import { Knex } from 'knex';
import { UserPermission } from '../../../common/types/database';
import { PermissionsObj, PERMISSION_ID } from '../../../common/types/shared';
const debug = debugLib('eventsapp:query-user-perms');

const userPermissionsToObj = (perms: UserPermission[]): PermissionsObj => {
  const result = {
    IS_ADMIN: false,
    MODIFY_ALL: false,
    VIEW_ALL: false,
  };
  if (perms.length === 0) return result;
  const ids = perms.map((v) => v.permission_id);
  result.IS_ADMIN = ids.indexOf(PERMISSION_ID.IS_ADMIN) !== -1;
  result.MODIFY_ALL = ids.indexOf(PERMISSION_ID.MODIFY_ALL) !== -1;
  result.VIEW_ALL = ids.indexOf(PERMISSION_ID.VIEW_ALL) !== -1;
  return result;
};

const PermissionsObjToId = (obj: PermissionsObj): number[] => {
  const res: number[] = [];
  if (obj.VIEW_ALL) res.push(PERMISSION_ID.VIEW_ALL);
  if (obj.MODIFY_ALL) res.push(PERMISSION_ID.MODIFY_ALL);
  if (obj.IS_ADMIN) res.push(PERMISSION_ID.IS_ADMIN);
  return res;
};

const permissionsByUserId = async (db: Knex, user_id: number): Promise<PermissionsObj> => {
  const matches = await db('user_permissions').select().where({ user_id: user_id });
  debug(`user:${user_id} has ${matches.length} permissions`);
  return userPermissionsToObj(matches);
};

const updatePermissionsForUserId = async (db: Knex, user_id: number, perms: PermissionsObj) => {
  const currentPermissions = await permissionsByUserId(db, user_id);
  const newPerms: number[] = [];
  const delPerms: number[] = [];
  if (currentPermissions.IS_ADMIN !== perms.IS_ADMIN) {
    if (perms.IS_ADMIN) {
      // New permissions ASSIGN admin
      newPerms.push(PERMISSION_ID.IS_ADMIN);
    } else {
      // New permissions REMOVE admin
      delPerms.push(PERMISSION_ID.IS_ADMIN);
    }
  }
  if (currentPermissions.MODIFY_ALL !== perms.MODIFY_ALL) {
    if (perms.MODIFY_ALL) {
      // New permissions ASSIGN modify
      newPerms.push(PERMISSION_ID.MODIFY_ALL);
    } else {
      // New permissions REMOVE modify
      delPerms.push(PERMISSION_ID.MODIFY_ALL);
    }
  }
  if (currentPermissions.VIEW_ALL !== perms.VIEW_ALL) {
    if (perms.VIEW_ALL) {
      // New permissions ASSIGN view
      newPerms.push(PERMISSION_ID.VIEW_ALL);
    } else {
      // New permissions REMOVE view
      delPerms.push(PERMISSION_ID.VIEW_ALL);
    }
  }
  if (newPerms.length > 0) {
    const inserts = newPerms.map((v) => {
      return { user_id: user_id, permission_id: v };
    });
    const res = await db('user_permissions').insert(inserts, ['id']);
    debug(`assigned permissions ${JSON.stringify(res)} to user:${user_id}`);
  }
  if (newPerms.length > 0) {
    const deletes = newPerms.map((v) => {
      return { user_id: user_id, permission_id: v };
    });
    for (const delWhere of deletes) {
      await db('user_permissions').where(delWhere).delete();
      debug(`removed permission ${delWhere.permission_id} from user:${user_id}`);
    }
  }
};

export default Object.assign(
  {},
  {
    byUserId: permissionsByUserId,
    updateForUserId: updatePermissionsForUserId,
  }
);
