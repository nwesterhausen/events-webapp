import { Button, ButtonProps } from 'solid-bootstrap';
import { FiMusic } from 'solid-icons/fi';
import { Component } from 'solid-js';

const ListenLink: Component<{ href: string } & ButtonProps> = (props) => {
  return (
    <Button variant={props.variant} size={props.size} href={props.href} target='_blank'>
      <FiMusic class='icon-fix' /> Listen
    </Button>
  );
};

export default ListenLink;
