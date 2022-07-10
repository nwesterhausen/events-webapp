import { Table } from 'solid-bootstrap';
import { Component, createResource, For } from 'solid-js';
import UserRow from '../components/UserRow';
import { useAuthContext } from '../providers/Auth';
import { Db_User, PermissionsObject } from '../Types';

export type UserData = Db_User & PermissionsObject;

const EmptyUserdata: UserData[] = [];

const UserManagment: Component = () => {
  const authContext = useAuthContext();
  // Don't render anything if we don't believe ourselves to be an admin ;)
  if (authContext.auth.loggedIn && !authContext.auth.permissions.IS_ADMIN) {
    return <></>;
  }

  const [data] = createResource(
    async (): Promise<UserData[]> => {
      const resp = await fetch('/admin/users');
      if (!resp.ok) {
        return EmptyUserdata;
      }
      const data = await resp.json();
      if (data.user_details && Array.isArray(data.user_details)) {
        return data.user_details;
      }
      return EmptyUserdata;
    },
    { initialValue: EmptyUserdata }
  );

  return (
    <>
      <Table>
        <thead>
          <UserRow.Heading />
        </thead>
        <tbody>
          <For
            each={data.latest}
            fallback={
              <tr>
                <td colSpan={9}>No user data..</td>
              </tr>
            }>
            {(user: UserData) => <UserRow user={user} />}
          </For>
        </tbody>
      </Table>
      <pre>{JSON.stringify(data.latest, null, 2)}</pre>
    </>
  );
};

export default UserManagment;
