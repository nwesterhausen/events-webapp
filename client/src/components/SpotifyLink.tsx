import { OverlayTrigger, Tooltip, Button } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { SiSpotify } from 'solidjs-icons/si';

const SpotifyLink: Component<{ href: string }> = (props) => {
  const hiddenId = Math.floor(100 * Math.random());
  return (
    <OverlayTrigger overlay={<Tooltip id={'listen-spotify' + hiddenId}>Listen on Spotify</Tooltip>}>
      <a href={props.href} target='_blank' class='text-decoration-none' style={{ color: '#1DB954' }}>
        <SiSpotify />
      </a>
    </OverlayTrigger>
  );
};

export default SpotifyLink;
