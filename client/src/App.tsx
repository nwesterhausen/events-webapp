import { Route, Routes } from 'solid-app-router';
import { Container, Nav, Stack, Tab } from 'solid-bootstrap';
import { Component, For, JSXElement, lazy } from 'solid-js';
import { ItineraryData } from '../../common/types/api';
import Itinerary from './components/Itinerary';
import NavMenu from './components/NavMenu';
import Aug192022 from './events/2022-08-19';
import { ItineraryShortDateRange } from './lib/time-funcs';
import LoginPage from './pages/LoginPage';
import { useAuthContext } from './providers/Auth';

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
const testTabTitle = ItineraryShortDateRange(testItinerary.start_date, testItinerary.end_date);
interface EventBlob {
  key: string;
  title: string;
  content: JSXElement;
}
const CurrentEvents: Component = () => {
  const content: EventBlob[] = [
    { key: 'aug192022', title: 'Aug 19-21', content: <Aug192022 /> },
    { key: 'oct142022', title: testTabTitle, content: <Itinerary itinerary={testItinerary} /> },
  ];
  return (
    <Tab.Container id='upcoming-event-listing' defaultActiveKey={content[0].key}>
      <Stack direction='horizontal' gap={2}>
        <span>Upcoming Events: </span>
        <Nav variant='pills' class='flex-row'>
          <For each={content}>
            {(event) => (
              <Nav.Item>
                <Nav.Link eventKey={event.key}>{event.title}</Nav.Link>
              </Nav.Item>
            )}
          </For>
        </Nav>
      </Stack>
      <Tab.Content>
        <For each={content}>{(event) => <Tab.Pane eventKey={event.key}>{event.content}</Tab.Pane>}</For>
      </Tab.Content>
    </Tab.Container>
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
