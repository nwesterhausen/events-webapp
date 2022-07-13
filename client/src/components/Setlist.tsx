import { Card, ListGroup, ListGroupItem, OverlayTrigger, Stack, Tooltip } from 'solid-bootstrap';
import { TbLink, TbMapPin, TbMusic, TbNotebook, TbX } from 'solid-icons/tb';
import { For, ParentComponent } from 'solid-js';
import { useAuthContext } from '../providers/Auth';
import { SetlistData } from '../types';
import Link from './Link';
import SetlistSong from './SetlistSong';

const Setlist: ParentComponent<{ setlist?: SetlistData }> = (props) => {
  const authContext = useAuthContext();

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
      <Card.Title class='ps-2'>Setlist{props.setlist.location ? ' @ ' + props.setlist.location : ''}</Card.Title>
      <Card.Text>
        <div class='d-flex'>
          <p class='m-0 ps-3'>{props.setlist.notes}</p>
          {authContext.auth.permissions.MODIFY_ALL ? (
            <div class='ms-auto modify-actions d-flex justify-content-end px-3'>
              <Stack direction='horizontal' gap={2}>
                <OverlayTrigger overlay={<Tooltip>Edit Notes</Tooltip>}>
                  <a class='action-button text-center'>
                    <TbNotebook class='icon-fix' />
                  </a>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Edit Location</Tooltip>}>
                  <a class='action-button text-center'>
                    <TbMapPin class='icon-fix' />
                  </a>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Add Song</Tooltip>}>
                  <a class='text-decoration-none create action-button text-center'>
                    <TbMusic class='icon-fix' />+
                  </a>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                  <a class='action-button delete text-center'>
                    <TbX class='icon-fix' />
                  </a>
                </OverlayTrigger>
              </Stack>
            </div>
          ) : (
            <></>
          )}
        </div>
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
                  {authContext.auth.permissions.MODIFY_ALL ? (
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
