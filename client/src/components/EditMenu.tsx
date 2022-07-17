import { Button, Container, Navbar, Stack } from 'solid-bootstrap';
import { Component, Match, Switch } from 'solid-js';
import { useAuthContext } from '../providers/Auth';
import { useEditContext } from '../providers/Edit';

interface EditMenuProps {
  variant?: 'itinerary' | 'setlist';
  itinerary_id?: number;
  setlist_id?: number;
}

const GenericError = 'Error, invalid page configurations';

const EditMenu: Component<EditMenuProps> = (props) => {
  const [editMode] = useEditContext();
  const [auth] = useAuthContext();
  if (!editMode.enabled) {
    return <></>;
  }
  if (!auth.user.MODIFY_ALL) {
    return <></>;
  }
  if (!props.variant) {
    props.variant = 'itinerary';
  }

  let invalidProps = false;
  if (props.variant === 'itinerary' && typeof props.itinerary_id === 'undefined') {
    console.debug('No itinerary_id for edit bar.');
    invalidProps = true;
  }
  if (props.variant === 'setlist' && typeof props.setlist_id === 'undefined') {
    console.debug('No setlist_id for edit bar');
    invalidProps = true;
  }

  return (
    <Navbar variant='dark'>
      <Container fluid>
        <Stack direction='horizontal' gap={3}>
          <Switch fallback={GenericError}>
            <Match when={invalidProps}>{GenericError}, missing an id.</Match>
            <Match when={props.variant === 'itinerary'}>
              <Button variant='outline-warning' size='sm'>
                Edit Itinerary
              </Button>
              <Button variant='outline-success' size='sm'>
                Add Section
              </Button>
              <Button variant='outline-success' size='sm'>
                Add Article
              </Button>
              <Button variant='outline-success' size='sm'>
                Add Item
              </Button>
              <Button variant='outline-success' size='sm'>
                Add Song
              </Button>
            </Match>
            <Match when={props.variant === 'setlist'}>
              <Button variant='secondary' size='sm'>
                Edit Setlist
              </Button>
              <Button variant='success' size='sm'>
                Add Song
              </Button>
            </Match>
          </Switch>
        </Stack>
      </Container>
    </Navbar>
  );
};

export default EditMenu;
