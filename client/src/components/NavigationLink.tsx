import { Button } from 'solid-bootstrap';
import { ButtonProps } from 'solid-bootstrap/esm/Button';
import { RiMapDirectionFill } from 'solid-icons/ri';
import { Component } from 'solid-js';

const NaviagationLink: Component<{ href: string } & ButtonProps> = (props) => {
  return (
    <Button size={props.size} href={props.href} target='_blank'>
      <RiMapDirectionFill class='icon-fix' /> Directions
    </Button>
  );
};

export default NaviagationLink;
