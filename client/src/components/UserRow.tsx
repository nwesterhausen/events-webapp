import { FormCheck, OverlayTrigger, Tooltip } from 'solid-bootstrap';
import { BsGoogle, BsDiscord } from 'solid-icons/bs';
import { Component } from 'solid-js';
import { UserData } from '../pages/UserManagement';

const Checked: Component = () => {
  return <FormCheck checked disabled type='checkbox' />;
};
const NotChecked: Component = () => {
  return <FormCheck disabled type='checkbox' />;
};

export const UserRowHeading: Component = () => {
  return (
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>
        <OverlayTrigger overlay={<Tooltip>Connected with Google</Tooltip>}>
          <BsGoogle size={16} color='#DB4437' />
        </OverlayTrigger>
      </th>
      <th>
        <OverlayTrigger overlay={<Tooltip>Connected with Discord</Tooltip>}>
          <BsDiscord size={16} color='#5865F2' />
        </OverlayTrigger>
      </th>
      <th>Created</th>
      <th>View</th>
      <th>Edit</th>
      <th>Admin</th>
      <th></th>
    </tr>
  );
};

export const UserRow: Component<{ user: UserData }> = (props) => {
  return (
    <tr>
      <td>{props.user.id}</td>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td>{props.user.googleId ? <Checked /> : <NotChecked />}</td>
      <td>{props.user.discordId ? <Checked /> : <NotChecked />}</td>
      <td>{props.user.created_at}</td>
      <td>{props.user.VIEW_ALL ? <FormCheck checked /> : <FormCheck />}</td>
      <td>{props.user.MODIFY_ALL ? <FormCheck checked /> : <FormCheck />}</td>
      <td>{props.user.IS_ADMIN ? <FormCheck checked /> : <FormCheck />}</td>
    </tr>
  );
};

export default Object.assign(UserRow, {
  Heading: UserRowHeading,
});
