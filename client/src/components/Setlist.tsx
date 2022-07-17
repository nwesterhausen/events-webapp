import { Card, ListGroup, ListGroupItem, OverlayTrigger, Stack, Tooltip } from 'solid-bootstrap';
import { TbLink } from 'solid-icons/tb';
import { For, ParentComponent } from 'solid-js';
import { SetlistData } from '../../../common/types/api';
import { useAuthContext } from '../providers/Auth';
import EditMenu from './EditMenu';
import Link from './Link';
import SetlistSong from './SetlistSong';

const Setlist: ParentComponent<{ setlist?: SetlistData }> = (props) => {
  const [auth] = useAuthContext();

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
    <Card class='bg-dark border-primary setlist'>
      <Card.Title class='ps-2'>Setlist{props.setlist.location ? ' @ ' + props.setlist.location : ''}</Card.Title>
      <EditMenu variant='setlist' setlist_id={props.setlist.id} />
      <Card.Text>
        <p class='notes'>{props.setlist.notes}</p>
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
                  {auth.user.MODIFY_ALL ? (
                    <OverlayTrigger overlay={<Tooltip>Add Link</Tooltip>}>
                      <a class='text-decoration-none create action-button text-center'>
                        <TbLink class='icon-fix' />+
                      </a>
                    </OverlayTrigger>
                  ) : (
                    <></>
                  )}
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
