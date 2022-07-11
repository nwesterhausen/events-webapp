import { Button, ButtonProps } from 'solid-bootstrap';
import { SiYoutube } from 'solid-icons/si';
import { Component } from 'solid-js';

const YoutubeLink: Component<{ href: string } & ButtonProps> = (props) => {
  return (
    <Button variant={props.variant} size={props.size} href={props.href} target='_blank'>
      <SiYoutube class='icon-fix' /> Listen{props.children ? ' to ' : ''}
      {props.children}
    </Button>
  );
};

export default YoutubeLink;
