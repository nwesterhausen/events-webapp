import { Container, Nav, Navbar, NavDropdown, OverlayTrigger, Stack, Tooltip } from 'solid-bootstrap';
import { FiMail } from 'solid-icons/fi';
import { RiUserAccountBoxFill } from 'solid-icons/ri';
import { VscGithubInverted } from 'solid-icons/vsc';
import { Component } from 'solid-js';
import { useAuthContext } from '../providers/Auth';

const NavMenu: Component = () => {
  const [auth] = useAuthContext();
  return (
    <Navbar id='navbar' bg='dark' variant='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='/'>
          <Stack gap={3} direction='horizontal'>
            <img alt='' src='favicon-32x32.png' width='32' height='32' />
            <span>Planned Events</span>
          </Stack>
        </Navbar.Brand>
        {auth.loggedIn ? (
          <>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav class='ms-auto'>
                <Nav.Link href='my-account'>
                  Account <RiUserAccountBoxFill class='icon-fix' />
                </Nav.Link>
                {auth.permissions.IS_ADMIN ? (
                  <NavDropdown title='Manage' id='collasible-nav-dropdown'>
                    <NavDropdown.Item href='user-admin'>Users</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='manage-setlists'>Setlists</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <></>
                )}
                {auth.permissions.VIEW_ALL ? <Nav.Link disabled>Archives</Nav.Link> : <></>}
                {auth.permissions.MODIFY_ALL ? (
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
                <OverlayTrigger placement='auto' overlay={<Tooltip id='view-source'>Source code on GitHub</Tooltip>}>
                  <Nav.Link href='https://github.com/nwesterhausen/events-webapp'>
                    <VscGithubInverted class='icon-fix' size='1rem' />
                  </Nav.Link>
                </OverlayTrigger>
                <Nav.Link rel='external' href='/auth/logout'>
                  Logout
                </Nav.Link>
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
