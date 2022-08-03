import { Button, ButtonProps, OverlayTrigger, Tooltip } from 'solid-bootstrap';
import { HiSolidPlusCircle } from 'solid-icons/hi';
import { Component } from 'solid-js';

type AddButtonProps = {
  name?: string;
} & ButtonProps;

const AddButton: Component<AddButtonProps> = (props) => {
  return (
    <OverlayTrigger overlay={<Tooltip>Add{props.name ? ' ' + props.name : ''}</Tooltip>}>
      <Button class='border-0' size='sm' variant='outline-success' onClick={props.onClick}>
        <HiSolidPlusCircle class='icon-fix' />
      </Button>
    </OverlayTrigger>
  );
};

export default AddButton;
