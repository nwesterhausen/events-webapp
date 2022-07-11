import { Button, ButtonProps } from 'solid-bootstrap';
import { SiSpotify } from 'solid-icons/si';
import { Component } from 'solid-js';

const SpotifyLink: Component<{ href: string } & ButtonProps> = (props) => {
  return (
    <Button variant={props.variant} size={props.size} href={props.href} target='_blank'>
      <SiSpotify class='icon-fix' /> Listen{props.children ? ' to ' : ''}
      {props.children}
    </Button>
  );
};

export default SpotifyLink;
