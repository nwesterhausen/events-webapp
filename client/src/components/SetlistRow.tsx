import { FiTrash2 } from 'solid-icons/fi';
import { Component } from 'solid-js';
import { SetlistData } from '../pages/ManageSetlists';

export const SetlistHeading: Component = () => {
  return (
    <tr>
      <th>ID</th>
      <th>Location</th>
      <th>Songs</th>
      <th>Notes</th>
      <th>Action</th>
    </tr>
  );
};

export const SetlistRow: Component<{ set: SetlistData; deleteFunc: (id: number) => any }> = (props) => {
  return (
    <tr>
      <td>{props.set.id}</td>
      <td>{props.set.location}</td>
      <td>{JSON.stringify(props.set.songs)}</td>
      <td>{props.set.notes}</td>
      <td class=''>
        <a
          class='text-center action-button'
          onClick={() => {
            props.deleteFunc(props.set.id);
          }}>
          <FiTrash2 class='icon-fix' />
        </a>
      </td>
    </tr>
  );
};

export default Object.assign(SetlistRow, {
  Heading: SetlistHeading,
});
