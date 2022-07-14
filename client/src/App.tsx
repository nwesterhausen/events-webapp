import { Route, Routes } from 'solid-app-router';
import { Container, Tab, Tabs } from 'solid-bootstrap';
import { Component, lazy } from 'solid-js';
import Itinerary from './components/Itinerary';
import NavMenu from './components/NavMenu';
import Aug192022 from './events/2022-08-19';
import { ItineraryShortDateRange } from './lib/time-funcs';
import LoginPage from './pages/LoginPage';
import { useAuthContext } from './providers/Auth';
import { ItineraryData } from './types';

const UserManagement = lazy(() => import('./pages/UserManagement'));
const ManageSetlists = lazy(() => import('./pages/ManageSetlists'));

const testItinerary: ItineraryData = {
  title: 'Test Itinerary',
  start_date: new Date('October 14'),
  end_date: new Date('October 16'),
  sections: [
    {
      date: new Date('October 14'),
      tod_modifier: 'Night',
      articles: [
        {
          title: 'General Hangout Time',
          start_time: new Date('October 14 15:00:00'),
          end_time: new Date('October 14 17:00:00'),
          items: [
            {
              text: 'Jams, Rocketleague',
            },
          ],
          links: [{ url: 'https://www.youtube.com/watch?v=JwVcQGp3bLo', type: 'Youtube', text: ' Main Squeeze Live' }],
          setlists: [
            {
              notes: '',
              location: '',
              songs: [
                {
                  name: 'War Pigs',
                  artist: 'Black Sabbath',
                  links: [
                    { type: 'Spotify', url: 'https://open.spotify.com/track/0HVQuuXGAcQ2P5mBN521ae?si=82682de044c442e3' },
                    { type: 'Ultimate Guitar', url: 'https://tabs.ultimate-guitar.com/tab/black-sabbath/war-pigs-official-2003333' },
                    { type: 'Youtube', url: 'https://www.youtube.com/watch?v=nSo76JiQrW8' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
const testTabkey = ItineraryShortDateRange(testItinerary.start_date, testItinerary.end_date);

const CurrentEvents: Component = () => {
  return (
    <Tabs defaultActiveKey='aug192022' id='upcoming-event-listing' variant='pills'>
      <Tab eventKey='aug192022' title='Aug 19-21'>
        <Aug192022 />
      </Tab>
      <Tab eventKey='oct142022' title={testTabkey}>
        <Itinerary itinerary={testItinerary} />
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
