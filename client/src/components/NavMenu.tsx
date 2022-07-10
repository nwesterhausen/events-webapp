import { Container, Nav, Navbar, OverlayTrigger, Stack, Tooltip } from 'solid-bootstrap';
import { FiMail } from 'solid-icons/fi';
import { Component } from 'solid-js';
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
        {authContext.auth.loggedIn ? (
          <>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Navbar.Text class='ms-5'>Authorized as {authContext.auth.user.name}</Navbar.Text>
              <Nav class='ms-auto'>
                {authContext.auth.permissions.VIEW_ALL ? (
                  <Nav.Link href='#archives' disabled>
                    Archives
                  </Nav.Link>
                ) : (
                  <></>
                )}
                {authContext.auth.permissions.MODIFY_ALL ? (
                  <>
                    <OverlayTrigger placement='auto' overlay={<Tooltip id={'send-email'}>Submit a new event or an event correction.</Tooltip>}>
                      <Nav.Link href='mailto:nwesterhausen@gmail.com?subject=Upcoming%20Event%20Contact'>
                        <Stack direction='horizontal' gap={2}>
                          <FiMail />
                          Contact
                        </Stack>
                      </Nav.Link>
                    </OverlayTrigger>
                  </>
                ) : (
                  <></>
                )}
                <Nav.Link href='/auth/logout'>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  );
};

export default NavMenu;
