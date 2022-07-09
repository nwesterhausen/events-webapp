import { Card, ListGroup, Stack } from 'solid-bootstrap';
import { Component, ParentComponent } from 'solid-js';
import ListenLink from './ListenLink';
import SpotifyLink from './SpotifyLink';
import TabLink from './TabLink';
import YoutubeLink from './YoutubeLink';

type SetListSongProps = {
  name: string;
  artist: string;
  spotifyLink?: string;
  youtubeLink?: string;
  liveLink?: string;
  tabLink?: string;
  submittedBy?: string;
};

const Setlist: ParentComponent = (props) => {
  return (
    <Card class='p-1' style={{ 'border-radius': '0.75rem' }}>
      <Card.Title class='ps-2'>Setlist</Card.Title>
      <Card.Text>
        <ListGroup as='ul' class='setlist'>
          {props.children}
        </ListGroup>
      </Card.Text>
    </Card>
  );
};

const SetlistSong: Component<SetListSongProps> = (props) => {
  return (
    <ListGroup.Item as='li'>
      <Stack direction='horizontal' gap={2}>
        <Stack>
          <p class='m-0'>
            <span class='fw-semibold'>{props.name}</span> <span class='fw-light song-artist'>{props.artist}</span>
          </p>
          <span class='text-muted song-submitter'>Submitted by {props.submittedBy || 'Group Concensus'}</span>
        </Stack>
        {props.tabLink ? <TabLink href={props.tabLink} /> : <></>}
        {props.spotifyLink ? <SpotifyLink href={props.spotifyLink} /> : <></>}
        {props.youtubeLink ? <YoutubeLink href={props.youtubeLink} /> : <></>}
        {props.liveLink ? <ListenLink href={props.liveLink} artist='a Live Performance' /> : <></>}
      </Stack>
    </ListGroup.Item>
  );
};

export default Object.assign(Setlist, {
  Song: SetlistSong,
});
