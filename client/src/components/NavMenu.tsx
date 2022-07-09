import { Container, Nav, Navbar, OverlayTrigger, Stack, Tooltip } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { FiMail } from 'solidjs-icons/fi';
import { useAuthContext } from '../providers/Auth';

const NavMenu: Component = () => {
  const authContext = useAuthContext();
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='#home'>
          <Stack gap={3} direction='horizontal'>
            <img alt='' src='favicon-32x32.png' width='32' height='32' />
            <span>Upcoming Events</span>
          </Stack>
        </Navbar.Brand>
        {authContext.auth.loggedIn ? <Navbar.Text class='ms-5'>Authorized as {authContext.auth.user.name}</Navbar.Text> : <></>}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {authContext.auth.loggedIn ? (
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
              <Nav.Link href='/auth/logout'>Logout</Nav.Link>
            </Nav>
          ) : (
            <></>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
