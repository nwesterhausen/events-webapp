import { Card, ListGroup, ListGroupItem, Stack } from 'solid-bootstrap';
import { For, ParentComponent } from 'solid-js';
import { SetlistData } from '../types';
import Link from './Link';
import SetlistSong from './SetlistSong';

const Setlist: ParentComponent<{ setlist?: SetlistData }> = (props) => {
  if (!props.setlist) {
    return (
      <Card class='p-1'>
        <Card.Title class='ps-2'>Setlist</Card.Title>
        <Card.Text>
          <ListGroup as='ul' class='setlist'>
            {props.children}
          </ListGroup>
        </Card.Text>
      </Card>
    );
  }
  return (
    <Card class='p-1 mt-3'>
      <Card.Title class='ps-2'>Setlist</Card.Title>
      <Card.Text>
        <ListGroup as='ul' class='setlist'>
          <For each={props.setlist.songs}>
            {(song) => (
              <ListGroupItem as='li'>
                <Stack direction='horizontal' gap={2}>
                  <Stack>
                    <span class='fw-semibold'>{song.name}</span>
                    <span class='fw-light song-artist'>{song.artist}</span>
                  </Stack>
                  <For each={song.links}>{(link) => <Link type='song' link={link} />}</For>
                </Stack>
              </ListGroupItem>
            )}
          </For>
        </ListGroup>
      </Card.Text>
    </Card>
  );
};

export default Object.assign(Setlist, {
  Song: SetlistSong,
});
