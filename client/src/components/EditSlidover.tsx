import { Form, FormControl, FormGroup, FormLabel, InputGroup, ListGroup, ListGroupItem, Offcanvas, Stack } from 'solid-bootstrap';
import { Component, createEffect, For, Match, Switch } from 'solid-js';
import * as DbDefaults from '../../../common/db_default_values';
import { SongData } from '../../../common/types/api';
import { useEditContext } from '../providers/Edit';
import { BuildFormProvider } from '../providers/Forms';
import AddButton from './AddButton';

const EditSlidover: Component<{ shown: boolean; handleClose: () => void }> = (props) => {
  const [editContext] = useEditContext();

  const NewSongListItem: Component = () => {
    const [FormsProvider, useFormsContext] = BuildFormProvider(DbDefaults.SetlistSong);
    const [data, { updateFormData }] = useFormsContext();
    createEffect(() => {
      console.log(data);
    });
    return (
      <FormsProvider>
        <ListGroupItem>
          <InputGroup>
            <InputGroup.Text>Name</InputGroup.Text>
            <FormControl type='text' id='name' onInput={updateFormData} />

            <InputGroup.Text>Artist</InputGroup.Text>
            <FormControl type='text' id='artist' onInput={updateFormData} />
          </InputGroup>

          <Stack direction='horizontal' gap={2}>
            <span class=''>Song Links</span>
            <AddButton name='Link' />
          </Stack>
        </ListGroupItem>
      </FormsProvider>
    );
  };

  return (
    <Offcanvas show={props.shown} onHide={props.handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Switch>
          <Match when={editContext.objectType === 'itinerary'}>
            <h3>{editContext.create ? 'Create ' : 'Edit '}Itinerary</h3>
            <Stack gap={3}>
              <InputGroup>
                <InputGroup.Text>Title</InputGroup.Text>
                <FormControl type='text' />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>Start Date</InputGroup.Text>
                <FormControl type='date' />
                <InputGroup.Text>End Date</InputGroup.Text>
                <FormControl type='date' />
              </InputGroup>
            </Stack>
          </Match>
          <Match when={editContext.objectType === 'section'}>
            <h3>{editContext.create ? 'Create ' : 'Edit '}Section</h3>
            <Stack gap={3}>
              <InputGroup>
                <InputGroup.Text>Date</InputGroup.Text>
                <FormControl type='date' />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>Time of Day Modifier</InputGroup.Text>
                <Form.Select aria-label='Time of Day'>
                  <option value=''>None</option>
                  <option value='Morning'>Morning</option>
                  <option value='Afternoon'>Afternoon</option>
                  <option value='Evening'>Evening</option>
                  <option value='Night'>Night</option>
                </Form.Select>
              </InputGroup>
            </Stack>
          </Match>
          <Match when={editContext.objectType === 'article'}>
            <h3>{editContext.create ? 'Create ' : 'Edit '}Article</h3>
            <Stack gap={3}>
              {editContext.parentId === 0 ? (
                <InputGroup>
                  <InputGroup.Text>Parent Section</InputGroup.Text>
                  <Form.Select aria-label='Section'>
                    <option value=''>August 19th</option>
                    <option value=''>August 20th</option>
                    <option value=''>August 21st</option>
                  </Form.Select>
                </InputGroup>
              ) : (
                <></>
              )}
              <InputGroup>
                <InputGroup.Text>Title</InputGroup.Text>
                <FormControl type='text' />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>Start Time</InputGroup.Text>
                <FormControl type='time' />
                <InputGroup.Text>End Time</InputGroup.Text>
                <FormControl type='time' />
              </InputGroup>
            </Stack>
          </Match>
          <Match when={editContext.objectType === 'setlist'}>
            <h3>{editContext.create ? 'Create ' : 'Edit '}Setlist</h3>
            <FormGroup>
              <FormLabel>Location</FormLabel>
              <FormControl type='text' />
            </FormGroup>
            <FormGroup>
              <FormLabel>Notes</FormLabel>
              <FormControl type='textarea' />
            </FormGroup>
            <FormGroup>
              <Stack direction='horizontal' gap={2}>
                <span class='fw-bolder'>Songs</span>
                <AddButton name='Link' />
              </Stack>
              <ListGroup class='setlist-song-edit'>
                <For each={[]} fallback={<NewSongListItem />}>
                  {(song: SongData) => (
                    <ListGroupItem>
                      <InputGroup>
                        <InputGroup.Text>Name</InputGroup.Text>
                        <FormControl type='text' id='name' value={song.name} />
                      </InputGroup>

                      <InputGroup>
                        <InputGroup.Text>Artist</InputGroup.Text>
                        <FormControl type='text' id='artist' value={song.artist} />
                      </InputGroup>

                      <Stack direction='horizontal' gap={2}>
                        <span class=''>Song Links</span>
                        <AddButton name='Link' />
                      </Stack>
                    </ListGroupItem>
                  )}
                </For>
              </ListGroup>
            </FormGroup>
          </Match>
        </Switch>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditSlidover;
