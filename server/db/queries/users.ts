import debugLib from 'debug';
import { Knex } from 'knex';
import { UserData } from '../../../common/types/api';
import { buildPermissionReference } from '../../lib/session';
import userPermissions from './user-permissions';
const debug = debugLib('eventsapp:query-users');

interface UpdatableUserData {
  name: string;
  email: string;
}

const userById = async (db: Knex, id: number): Promise<UserData[]> => {
  const matches = await db('users').select().where({ id: id });
  if (matches.length === 0) return [];
  const permissions = await userPermissions.byUserId(db, id);
  const user = matches[0];
  return [
    {
      ...user,
      ...permissions,
    },
  ];
};

const allUsers = async (db: Knex): Promise<UserData[]> => {
  const users = await db('users').select();
  const permissions = await db('user_permissions').select();
  const user_data: UserData[] = [];
  for (const user of users) {
    const user_perms = buildPermissionReference(permissions.filter((v) => v.user_id === user.id));
    user_data.push({
      ...user,
      ...user_perms,
    });
  }
  debug(`Fetched ${user_data.length} users from db`);
  return user_data;
};

const updateUser = async (db: Knex, id: number, data: UpdatableUserData) => {
  // If you need to update permissions its done separately!
  const res = await db('users')
    .where({
      id: id,
    })
    .update(
      {
        name: data.name,
        email: data.email,
      },
      ['id']
    );
  debug(`updated name/email for user:${id}`);
};

export default Object.assign(
  {},
  {
    all: allUsers,
    byId: userById,
    update: updateUser,
  }
);
