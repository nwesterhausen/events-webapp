import { Button, Stack, Table } from 'solid-bootstrap';
import { Component, createResource, For } from 'solid-js';
import SetlistRow from '../components/SetlistRow';
import { Create, Delete, Get } from '../lib/api';
import { DB_Setlist } from '../types';

export type SetlistData = DB_Setlist & {
  songs: number[];
};
const EmptySetlistData: SetlistData[] = [];

const ManageSongs: Component = () => {
  const [setlists, { refetch }] = createResource(
    async (): Promise<SetlistData[]> => {
      const data = await Get('/v1/setlists');
      if (Array.isArray(data.data)) {
        return data.data;
      }
      return EmptySetlistData;
    },
    { initialValue: EmptySetlistData }
  );

  const deleteSetlist = (id: number) => {
    console.log('delete set', id);
    Delete('/v1/setlist', { id: id })
      .then(() => refetch())
      .catch(console.error);
  };

  return (
    <>
      <Stack class='d-flex justify-content-end' direction='horizontal' gap={3}>
        <Button
          onClick={() => {
            Create('/v1/setlist', {})
              .then(() => refetch())
              .catch(console.error);
          }}>
          Create Empty Setlist
        </Button>
      </Stack>

      <Table>
        <thead>
          <SetlistRow.Heading />
        </thead>
        <tbody>
          <For
            each={setlists.latest}
            fallback={
              <tr>
                <td colSpan={9}>No setlist data..</td>
              </tr>
            }>
            {(set: SetlistData) => <SetlistRow set={set} deleteFunc={deleteSetlist} />}
          </For>
        </tbody>
      </Table>
    </>
  );
};

export default ManageSongs;
