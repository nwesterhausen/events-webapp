import { OverlayTrigger, Tooltip, Button } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { FiMap } from 'solidjs-icons/fi';

const NaviagationLink: Component<{ href: string }> = (props) => {
  const hiddenId = Math.floor(100 * Math.random());
  return (
    <OverlayTrigger overlay={<Tooltip id={'external-link-' + hiddenId}>Get Directions</Tooltip>}>
      <a href={props.href} target='_blank' class='text-decoration-none'>
        <FiMap />
      </a>
    </OverlayTrigger>
  );
};

export default NaviagationLink;
