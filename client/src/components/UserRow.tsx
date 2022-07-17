import { Badge, FormCheck, OverlayTrigger, Tooltip } from 'solid-bootstrap';
import { BsDiscord, BsGoogle } from 'solid-icons/bs';
import { FiTrash2 } from 'solid-icons/fi';
import { Component, createMemo, createSignal } from 'solid-js';
import { UserData } from '../../../common/types/api';
import { PERMISSION_ID } from '../../../common/types/shared';
import { Create, Delete } from '../lib/api';
import { useAuthContext } from '../providers/Auth';
import CheckCross from './CheckCross';

const addUserPermission = async (user_id: number, permission_id: number): Promise<boolean> => {
  const data = await Create('/admin/permissions', {
    user_id: user_id,
    permission_id: permission_id,
  });
  if (data.error || data.errors) {
    return false;
  }
  return true;
};
const delUserPermission = async (user_id: number, permission_id: number): Promise<boolean> => {
  const data = await Delete('/admin/permissions', {
    user_id: user_id,
    permission_id: permission_id,
  });
  if (data.error || data.errors) {
    return false;
  }
  return true;
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
      <th>Action</th>
      <th>Status</th>
    </tr>
  );
};

const SavingStates = {
  IDLE: 'Idle',
  SAVING: 'Saving',
  SUCCESS: 'Saved',
  FAIL: 'ERR',
};

export const UserRow: Component<{ user: UserData; dataRefetch: () => any }> = (props) => {
  const [auth,{refreshAuth}] = useAuthContext();
  const [savingState, setSavingState] = createSignal(SavingStates.IDLE);

  const badgeClass = createMemo(() => {
    switch (savingState()) {
      case SavingStates.IDLE:
        return 'bg-dark';
      case SavingStates.SAVING:
        return 'bg-warning';
      case SavingStates.SUCCESS:
        return 'bg-success';
      case SavingStates.FAIL:
      default:
        return 'bg-danger';
    }
  });
  const editDisabled = createMemo(() => {
    return savingState() !== SavingStates.IDLE && savingState() !== SavingStates.SUCCESS;
  });
  const addPermission = (user_id: number, permission_id: number) => {
    setSavingState(SavingStates.SAVING);
    addUserPermission(user_id, permission_id)
      .then((success) => {
        if (success) {
          setSavingState(SavingStates.SUCCESS);
          if (user_id === auth.user.id) {
            return refreshAuth();
          }
        } else {
          setSavingState(SavingStates.FAIL);
        }
      })
      .catch((err) => {
        setSavingState(SavingStates.FAIL);
        console.error(err);
      });
  };
  const delPermission = (user_id: number, permission_id: number) => {
    setSavingState(SavingStates.SAVING);
    delUserPermission(user_id, permission_id)
      .then((success) => {
        if (success) {
          setSavingState(SavingStates.SUCCESS);
          if (user_id === auth.user.id) {
            return refreshAuth();
          }
        } else {
          setSavingState(SavingStates.FAIL);
        }
      })
      .catch((err) => {
        setSavingState(SavingStates.FAIL);
        console.error(err);
      });
  };

  return (
    <tr>
      <td>{props.user.id}</td>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td>
        <CheckCross check={props.user.googleId !== null} />
      </td>
      <td>
        <CheckCross check={props.user.discordId !== null} />
      </td>
      <td>{props.user.created_at}</td>
      <td>
        {
          <FormCheck
            checked={props.user.VIEW_ALL}
            disabled={editDisabled()}
            onClick={(e: Event) => {
              const el = e.target as HTMLInputElement;
              if (el.checked) {
                addPermission(props.user.id, PERMISSION_ID.VIEW_ALL);
              } else {
                delPermission(props.user.id, PERMISSION_ID.VIEW_ALL);
              }
            }}
          />
        }
      </td>
      <td>
        {
          <FormCheck
            checked={props.user.MODIFY_ALL}
            disabled={editDisabled()}
            onClick={(e: Event) => {
              const el = e.target as HTMLInputElement;
              if (el.checked) {
                addPermission(props.user.id, PERMISSION_ID.MODIFY_ALL);
              } else {
                delPermission(props.user.id, PERMISSION_ID.MODIFY_ALL);
              }
            }}
          />
        }
      </td>
      <td>
        {auth.user.id === props.user.id ? (
          <FormCheck checked={props.user.IS_ADMIN} disabled />
        ) : (
          <FormCheck
            checked={props.user.IS_ADMIN}
            disabled={editDisabled()}
            onClick={(e: Event) => {
              const el = e.target as HTMLInputElement;
              if (el.checked) {
                addPermission(props.user.id, PERMISSION_ID.IS_ADMIN);
              } else {
                delPermission(props.user.id, PERMISSION_ID.IS_ADMIN);
              }
            }}
          />
        )}
      </td>
      <td class=''>
        <a
          class='text-center action-button delete fixwidth'
          classList={{ disabled: auth.user.id === props.user.id }}
          onClick={() => {
            if (auth.user.id === props.user.id) return; // Exit if this is for the current user
            Delete('/admin/user', { user_id: props.user.id }).then(() => props.dataRefetch());
          }}>
          <FiTrash2 class='icon-fix' />
        </a>
      </td>
      <td style={{ width: '5rem' }}>
        <Badge class={badgeClass()}>{savingState()}</Badge>
      </td>
    </tr>
  );
};

export default Object.assign(UserRow, {
  Heading: UserRowHeading,
});
