import { Form, FormControl, InputGroup, Offcanvas, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';

const EditSlidover: Component<{ shown: boolean; handleClose: () => void }> = (props) => {
  return (
    <Offcanvas show={props.shown} onHide={props.handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
        <h3>Itinerary</h3>
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
        <h3>Section</h3>
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
        <h3>Article</h3>
        <Stack gap={3}>
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
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditSlidover;
