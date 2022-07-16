import debugLib from 'debug';
import { Knex } from 'knex';
import { UserData } from '../../../common/types/api';
import { buildPermissionReference } from '../../lib/session';
const debug = debugLib('eventsapp:query-users');

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

const updateUser = async (db: Knex, data: UserData) => {
  // If you need to update permissions its done separately!
  const res = await db('users')
    .where({
      id: data.id,
    })
    .update(
      {
        name: data.name,
        email: data.email,
      },
      ['id']
    );
  debug(`updated name/email for user:${data.id}`);
};

export default Object.assign(
  {},
  {
    all: allUsers,
    update: updateUser,
  }
);
