import { Route, Routes } from 'solid-app-router';
import { Container, Tab, Tabs } from 'solid-bootstrap';
import { Component, lazy } from 'solid-js';
import NavMenu from './components/NavMenu';
import Aug192022 from './events/2022-08-19';
import LoginPage from './pages/LoginPage';
import { useAuthContext } from './providers/Auth';

const UserManagement = lazy(() => import('./pages/UserManagement'));
const ManageSetlists = lazy(() => import('./pages/ManageSetlists'));

const CurrentEvents: Component = () => {
  return (
    <Tabs defaultActiveKey='aug192022' id='upcoming-event-listing' variant='pills'>
      <Tab eventKey='aug192022' title='Aug 19-21'>
        <Aug192022 />
      </Tab>
      <Tab eventKey='oct142022' title='Oct 14-16'>
        "camping" weekend ?
      </Tab>
    </Tabs>
  );
};

const App: Component = () => {
  const authContext = useAuthContext();

  return (
    <>
      <NavMenu />
      <Container fluid class='p-3'>
        {authContext.auth.loggedIn ? (
          <Routes>
            {authContext.auth.permissions.VIEW_ALL ? <Route path='/' component={CurrentEvents} /> : <></>}
            {authContext.auth.permissions.IS_ADMIN ? (
              <>
                <Route path='/user-admin' component={UserManagement} />
                <Route path='/manage-setlists' component={ManageSetlists} />
              </>
            ) : (
              <></>
            )}
          </Routes>
        ) : (
          <LoginPage />
        )}
      </Container>
    </>
  );
};

export default App;
