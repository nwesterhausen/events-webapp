import { Container, Tab, Tabs } from 'solid-bootstrap';
import type { Component } from 'solid-js';
import NavMenu from './components/NavMenu';
import Aug192022 from './events/2022-08-19';
import LoginPage from './pages/LoginPage';
import { useAuthContext } from './providers/Auth';

const App: Component = () => {
  const authContext = useAuthContext();

  return (
    <>
      <NavMenu />
      <Container fluid class='p-3'>
        {authContext.auth.loggedIn ? (
          authContext.auth.permissions.VIEW_ALL ? (
            <Tabs defaultActiveKey='aug192022' id='upcoming-event-listing' variant='pills'>
              <Tab eventKey='aug192022' title='Aug 19-21'>
                <Aug192022 />
              </Tab>
              <Tab eventKey='oct142022' title='Oct 14-16'>
                "camping" weekend ?
              </Tab>
            </Tabs>
          ) : (
            <></>
          )
        ) : (
          <LoginPage />
        )}
      </Container>
    </>
  );
};

export default App;
