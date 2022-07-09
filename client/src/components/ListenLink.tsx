import { OverlayTrigger, Tooltip, Button } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { FiMusic } from 'solidjs-icons/fi';

const ListenLink: Component<{ href: string; artist: string }> = (props) => {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={'listen-to-' + props.artist.replace(/\s+/g, '')}>Listen To {props.artist}</Tooltip>}>
      <a href={props.href} target='_blank' class='text-decoration-none'>
        <FiMusic />
      </a>
    </OverlayTrigger>
  );
};

export default ListenLink;
