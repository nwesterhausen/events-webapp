import { Button, ButtonGroup, Container, Dropdown, OverlayTrigger, Tooltip } from 'solid-bootstrap';
import { HiSolidDotsVertical, HiSolidPlusCircle } from 'solid-icons/hi';
import { Component, Match, Switch } from 'solid-js';
import { useAuthContext } from '../providers/Auth';
import { useEditContext } from '../providers/Edit';

interface EditMenuProps {
  variant?: 'itinerary' | 'setlist' | 'section' | 'article';
  targetId: number;
}

const GenericError = 'Error, invalid page configurations';

const EditMenu: Component<EditMenuProps> = (props) => {
  const [editMode, { openEditItinerary, openCreateItinerary, openCreateSetlist, openEditSetlist }] = useEditContext();
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

  return (
    <Container fluid class='editMenu p-0'>
      <Switch fallback={GenericError}>
        <Match when={props.variant === 'itinerary'}>
          <Dropdown>
            <Dropdown.Toggle size='sm' variant='outline-primary'>
              <HiSolidDotsVertical class='icon-fix' />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => openEditItinerary(props.targetId)}>Edit Itinerary</Dropdown.Item>
              <Dropdown.Item onClick={() => openEditItinerary(props.targetId)}>Add Section</Dropdown.Item>
              <Dropdown.Item onClick={() => openEditItinerary(props.targetId)}>Add Article</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Match>
        <Match when={props.variant === 'setlist'}>
          <Dropdown as={ButtonGroup}>
            <OverlayTrigger overlay={<Tooltip>Add Song</Tooltip>}>
              <Button size='sm' variant='outline-success' onClick={() => openEditItinerary(props.targetId)}>
                <HiSolidPlusCircle class='icon-fix' />
              </Button>
            </OverlayTrigger>
            <Dropdown.Toggle size='sm' variant='outline-primary'>
              <HiSolidDotsVertical class='icon-fix' />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => openEditItinerary(props.targetId)}>Edit Setlist</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Match>
        <Match when={props.variant === 'section'}>
          <Dropdown>
            <Dropdown.Toggle size='sm' variant='outline-primary'>
              <HiSolidDotsVertical class='icon-fix' />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => openEditItinerary(props.targetId)}>Edit Section</Dropdown.Item>
              <Dropdown.Item onClick={() => openEditItinerary(props.targetId)}>Add Article</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Match>
        <Match when={props.variant === 'article'}>
          <Dropdown>
            <Dropdown.Toggle size='sm' variant='outline-primary'>
              <HiSolidDotsVertical class='icon-fix' />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => openEditItinerary(props.targetId)}>Edit Article</Dropdown.Item>
              <Dropdown.Item onClick={() => openEditItinerary(props.targetId)}>Add Setlist</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Match>
      </Switch>
    </Container>
  );
};

export default EditMenu;
