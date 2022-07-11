import { Button, ButtonProps } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { UltimateGuitarIcon } from '../icons/UtilmateGuitar';

const TabLink: Component<{ href: string } & ButtonProps> = (props) => {
  return (
    <Button variant={props.variant} size={props.size} href={props.href} target='_blank'>
      <UltimateGuitarIcon class='icon-fix' /> Tab
    </Button>
  );
};

export default TabLink;
