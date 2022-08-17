import { FormControl, InputGroup, ListGroup, ListGroupItem, Stack } from 'solid-bootstrap';
import { Component, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import { SongData } from '../../../common/types/api';
import AddButton from './AddButton';

interface FormSongProps {
  data?: SongData;
  changeHandler: (data: SongData) => void;
}

const EmptySongData: SongData = {
  name: '',
  artist: '',
  links: [],
  id: -1,
};

const FormSong: Component<FormSongProps> = (props) => {
  let startdata = props.data || EmptySongData;

  const [data, setData] = createStore(startdata);

  const handleInput = (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (el.name === 'songname') {
      setData('name', el.value);
    }
    if (el.name === 'songartist') {
      setData('artist', el.value);
    }
  };

  return (
    <ListGroupItem as='div'>
      <InputGroup>
        <InputGroup.Text>Name</InputGroup.Text>
        <FormControl onInput={handleInput} name='songname' type='text' />
        <InputGroup.Text>Artist</InputGroup.Text>
        <FormControl onInput={handleInput} name='songartist' type='text' />
      </InputGroup>
      <Stack direction='horizontal' gap={2}>
        <span class='fs-5'>Links</span>
        <AddButton name='Link' />
      </Stack>
      <ListGroup>
        <For each={data.links}>{(link) => <></>}</For>
      </ListGroup>
    </ListGroupItem>
  );
};

export default FormSong;
