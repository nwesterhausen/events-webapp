import { Button, Stack, Table } from 'solid-bootstrap';
import { TbCloudUpload, TbFileDownload } from 'solid-icons/tb';
import { Component, createResource, For } from 'solid-js';
import { Create, Get } from '../lib/api';
import UserRow from '../components/UserRow';
import { SaveJson } from '../lib/file-downloader';
import { useAuthContext } from '../providers/Auth';
import { Db_User, PermissionsObject } from '../types';

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
      const data = await Get('/admin/users');
      if (data.user_details && Array.isArray(data.user_details)) {
        return data.user_details;
      }
      return EmptyUserdata;
    },
    { initialValue: EmptyUserdata }
  );

  const handleImport = (e: Event) => {
    const el = e.target as HTMLInputElement;
    const fr = new FileReader();
    fr.onload = () => {
      let res = [];
      try {
        res = JSON.parse(fr.result as string);
      } catch (err) {
        console.warn(err);
      } finally {
        Create('/admin/restore/users', res);
      }
    };
    if (el.files && el.files.length > 0) {
      fr.readAsText(el.files.item(0) as Blob);
    }
  };

  return (
    <>
      <input type='file' id='user-data-file-upload' style='display:none;' onChange={handleImport} />
      <Stack direction='horizontal' class='d-flex justify-content-end' gap={3}>
        <Button
          onClick={() => {
            SaveJson(data.latest, 'users-data.json');
          }}>
          <TbFileDownload size={16} class='icon-fix' /> Backup
        </Button>
        <Button
          onClick={() => {
            document.getElementById('user-data-file-upload')?.click();
          }}>
          <TbCloudUpload size={16} class='icon-fix' /> Restore
        </Button>
      </Stack>
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
    </>
  );
};

export default UserManagment;
