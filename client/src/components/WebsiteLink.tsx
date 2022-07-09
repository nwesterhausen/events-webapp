import { OverlayTrigger, Tooltip, Button } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { FiExternalLink } from 'solidjs-icons/fi';

const WebsiteLink: Component<{ href: string }> = (props) => {
  const hiddenId = Math.floor(100 * Math.random());
  return (
    <OverlayTrigger overlay={<Tooltip id={'external-link-' + hiddenId}>Visit Website</Tooltip>}>
      <a href={props.href} target='_blank' class='text-decoration-none'>
        <FiExternalLink />
      </a>
    </OverlayTrigger>
  );
};

export default WebsiteLink;
