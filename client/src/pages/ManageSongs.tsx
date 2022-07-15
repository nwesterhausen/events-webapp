import { Stack, Table } from 'solid-bootstrap';
import { Component, createResource, For } from 'solid-js';
import { Setlist } from '../../../common/types/database';
import SetlistRow from '../components/SetlistRow';
import TablePageHeader from '../components/TablePageHeader';
import { Delete, Get } from '../lib/api';

export type SetlistData = Setlist & {
  songs: number[];
};
const EmptySetlistData: SetlistData[] = [];

const ManageSongs: Component = () => {
  const [songs, { refetch }] = createResource(
    async (): Promise<SetlistData[]> => {
      const data = await Get('/v1/songs');
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
      <TablePageHeader>
        <Stack class='d-flex justify-content-end' direction='horizontal' gap={3}></Stack>
      </TablePageHeader>

      <Table>
        <thead>
          <SetlistRow.Heading />
        </thead>
        <tbody>
          <For
            each={songs.latest}
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
