import { OverlayTrigger, Stack, Tooltip } from 'solid-bootstrap';
import { TbEdit, TbX } from 'solid-icons/tb';
import { Component } from 'solid-js';
import { useAuthContext } from '../providers/Auth';

const ItineraryItem: Component<{ text: string }> = (props) => {
  const [auth] = useAuthContext();
  return (
    <div class='d-flex'>
      <span>{props.text}</span>
      {auth.user.MODIFY_ALL ? (
        <Stack class='modify-action d-flex px-3 align-items-center' direction='horizontal' gap={2}>
          <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
            <a class='action-button text-center'>
              <TbEdit class='icon-fix' />
            </a>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
            <a class='action-button delete text-center'>
              <TbX class='icon-fix' />
            </a>
          </OverlayTrigger>
        </Stack>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ItineraryItem;
