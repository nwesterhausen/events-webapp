import debugLib from 'debug';
import { Knex } from 'knex';
import { buildPermissionReference } from '../../lib/session';
import { UserData } from '../../../common/types/api';
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

export default Object.assign(
  {},
  {
    all: allUsers,
  }
);
