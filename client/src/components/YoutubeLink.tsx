import { OverlayTrigger, Tooltip, Button } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { SiYoutube } from 'solidjs-icons/si';

const YoutubeLink: Component<{ href: string }> = (props) => {
  const hiddenId = Math.floor(100 * Math.random());
  return (
    <OverlayTrigger overlay={<Tooltip id={'listen-spotify' + hiddenId}>Listen on Youtube</Tooltip>}>
      <a href={props.href} target='_blank' class='text-decoration-none' style={{ color: '#DD0000' }}>
        <SiYoutube />
      </a>
    </OverlayTrigger>
  );
};

export default YoutubeLink;
