import { Container, Nav, Navbar, OverlayTrigger, Stack, Tooltip } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { FiMail } from 'solidjs-icons/fi';

const NavMenu: Component = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='#home'>
          <Stack gap={3} direction='horizontal'>
            <img alt='' src='favicon-32x32.png' width='32' height='32' />
            <span>Upcoming Events</span>
          </Stack>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav class='ms-auto'>
            <Nav.Link href='#archives' disabled>
              Archives
            </Nav.Link>
            <OverlayTrigger placement='auto' overlay={<Tooltip id={'send-email'}>Submit a new event or an event correction.</Tooltip>}>
              <Nav.Link href='mailto:nwesterhausen@gmail.com?subject=Upcoming%20Event%20Contact'>
                <Stack direction='horizontal' gap={2}>
                  <FiMail />
                  Contact
                </Stack>
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
