import { Route, Routes } from 'solid-app-router';
import { Container, Nav, Stack, Tab } from 'solid-bootstrap';
import { Component, For, JSXElement, lazy } from 'solid-js';
import { ItineraryData } from '../../common/types/api';
import Itinerary from './components/Itinerary';
import NavMenu from './components/NavMenu';
import Aug192022 from './events/2022-08-19';
import { ItineraryShortDateRange } from './lib/time-funcs';
import { AuthenticationProvider, useAuthContext } from './providers/Auth';

const UserManagement = lazy(() => import('./pages/UserManagement'));
const ManageSetlists = lazy(() => import('./pages/ManageSetlists'));
const MyAccount = lazy(() => import('./pages/AccountPage'));

const augItinerary: ItineraryData = {
  title: 'Music Weekend',
  start_date: new Date('August 19 2022'),
  end_date: new Date('August 21 2022'),
  sections: [
    {
      date: new Date('August 19 2022'),
      tod_modifier: 'Night',
      articles: [
        {
          title: 'Concert',
          start_time: new Date('August 19 2022 19:00:00'),
          end_time: new Date('August 19 2022 22:00:00'),
          items: [
            { text: 'Main Squeeze @ Nickel Plate Amphitheater' },
            { text: 'Main Squeeze with Huckleberry Funk' },
            { text: 'Doors open at 7:00 PM, Show starts at 8:00 PM.' },
          ],
          links: [
            { type: 'Generic', url: 'https://mokbpresents.com/events/?es=the+main+squeeze', text: 'Get Tickets' },
            {
              type: 'Navigation',
              url: 'https://google.com/maps/dir//Nickel+Plate+District+Amphitheater,+6+Municipal+Dr,+Fishers,+IN+46038/@39.9605582,-86.0193325,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8814b3869f97a02b:0xa819ac75af284476!2m2!1d-86.0171438!2d39.9605582',
            },
            { url: 'https://www.youtube.com/watch?v=JwVcQGp3bLo', type: 'Youtube', text: 'Main Squeeze at Bonarroo 2022' },
            { url: 'https://www.youtube.com/watch?v=DQnhCYUMkYs', type: 'Youtube', text: 'Huckleberry Funk Live' },
          ],
          setlists: [],
        },
        {
          title: 'Crash',
          start_time: new Date('August 19 22:30:00'),
          items: [{ text: 'Find somewhere to sleep for the night!' }],
          links: [],
          setlists: [],
        },
      ],
    },
    {
      date: new Date('August 20 2022'),
      tod_modifier: '',
      articles: [
        {
          title: 'Breakfast',
          start_time: new Date('August 20 2022 09:00:00'),
          end_time: new Date('August 20 2022 10:30:00'),
          links: [],
          setlists: [],
          items: [],
        },
        {
          title: 'Hangout',
          start_time: new Date('August 20 2022 11:00:00'),
          links: [],
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
                  ],
                },
                {
                  name: `Bitches Ain't Shit`,
                  artist: 'Ben Folds (Dr. Dre)',
                  links: [
                    { type: 'Youtube', url: 'https://www.youtube.com/watch?v=gjFRy8jQ_0U' },
                    { type: 'Ultimate Guitar', url: 'https://tabs.ultimate-guitar.com/tab/ben-folds/bitches-aint-shit-chords-172201' },
                  ],
                },
                {
                  name: 'Electric Feel',
                  artist: 'MGMT',
                  links: [
                    { type: 'Spotify', url: 'https://open.spotify.com/track/3FtYbEfBqAlGO46NUDQSAt?si=be56cf323ce945b1' },
                    { type: 'Ultimate Guitar', url: 'https://tabs.ultimate-guitar.com/tab/mgmt/electric-feel-official-2099683' },
                  ],
                },
                {
                  name: 'Self Esteem',
                  artist: 'The Offspring',
                  links: [
                    { type: 'Spotify', url: 'https://open.spotify.com/track/1FkoVC85Ds3mFoK0fVqEqP?si=ad690485aa0d41aa' },
                    { type: 'Ultimate Guitar', url: 'https://tabs.ultimate-guitar.com/tab/the-offspring/self-esteem-official-1980577' },
                  ],
                },
                {
                  name: 'Shooting Stars',
                  artist: 'Bag Raiders',
                  links: [
                    { type: 'Spotify', url: 'https://open.spotify.com/track/0UeYCHOETPfai02uskjJ3x?si=03b4f275f5d847b7' },
                    { type: 'Ultimate Guitar', url: 'https://tabs.ultimate-guitar.com/tab/bag-raiders/shooting-stars-official-2394435' },
                  ],
                },
              ],
            },
          ],
          items: [{ text: 'Jams, Rocket League, Eating' }],
        },
      ],
    },
    {
      date: new Date('August 21 2022'),
      tod_modifier: '',
      articles: [
        {
          title: 'Golfing?',
          start_time: new Date('August 20 2022 09:00:00'),
          end_time: new Date('August 20 2022 10:30:00'),
          links: [],
          setlists: [],
          items: [{ text: 'Location TBD' }],
        },
      ],
    },
  ],
};
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
    { key: 'aug192022', title: 'Aug 19-21', content: <Itinerary itinerary={augItinerary} /> },
    { key: 'oct142022', title: testTabTitle, content: <Itinerary itinerary={testItinerary} /> },
    { key: 'other', title: 'OLD', content: <Aug192022 /> },
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
  const [auth] = useAuthContext();

  return (
    <AuthenticationProvider>
      <NavMenu />
      <Container fluid class='p-3'>
        <Routes>
          <Route path='/my-account' component={MyAccount} />
          {auth.permissions.VIEW_ALL ? <Route path='/' component={CurrentEvents} /> : <></>}
          {auth.permissions.IS_ADMIN ? (
            <>
              <Route path='/user-admin' component={UserManagement} />
              <Route path='/manage-setlists' component={ManageSetlists} />
            </>
          ) : (
            <></>
          )}
        </Routes>
      </Container>
    </AuthenticationProvider>
  );
};

export default App;
