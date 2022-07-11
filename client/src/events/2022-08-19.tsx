import { Stack, Button } from 'solid-bootstrap';
import { Component } from 'solid-js';
import Itenerary from '../components/Itenerary';
import ListenLink from '../components/ListenLink';
import NaviagationLink from '../components/NavigationLink';
import Setlist from '../components/Setlist';
import WebsiteLink from '../components/WebsiteLink';
import YoutubeLink from '../components/YoutubeLink';

const Aug192022: Component = () => {
  return (
    <Itenerary>
      <Itenerary.Title>Music Weekend, August 19th - 21st</Itenerary.Title>

      <Itenerary.Section title='Friday Night, Aug 19th'>
        <Itenerary.Item timeRange='7:00 PM - 10:00 PM' name='Concert'>
          <Stack gap={2}>
            <Stack direction='horizontal' gap={2}>
              <Button variant='primary' size='sm' href='https://mokbpresents.com/events/?es=the+main+squeeze'>
                Get Tickets
              </Button>
              <NaviagationLink
                size='sm'
                href='https://google.com/maps/dir//Nickel+Plate+District+Amphitheater,+6+Municipal+Dr,+Fishers,+IN+46038/@39.9605582,-86.0193325,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8814b3869f97a02b:0xa819ac75af284476!2m2!1d-86.0171438!2d39.9605582'
              />
            </Stack>
            <div>
              <strong>Main Squeeze @ Nickel Plate Amphitheater</strong>{' '}
            </div>
            <Stack direction='horizontal' gap={2}>
              Main Squeeze with Huckleberry Funk
            </Stack>
            <div>Doors open at 7:00 PM, Show starts at 8:00 PM.</div>
            <div>
              <YoutubeLink size='sm' variant='outline-info' href='https://www.youtube.com/watch?v=JwVcQGp3bLo'>
                Main Squeeze at Bonarroo 2022
              </YoutubeLink>
            </div>
            <div>
              <YoutubeLink size='sm' variant='outline-info' href='https://www.youtube.com/watch?v=DQnhCYUMkYs'>
                Huckleberry Funk Live
              </YoutubeLink>
            </div>
          </Stack>
        </Itenerary.Item>
        <Itenerary.Item timeRange='Late Night' name='Crash'>
          Find somewhere to sleep, options may include Travis or Nick.
        </Itenerary.Item>
      </Itenerary.Section>

      <Itenerary.Section title='Saturday, Aug 20th'>
        <Itenerary.Item timeRange='9:00 AM - 10:30 AM' name='Breakfast' />
        <Itenerary.Item timeRange='11:00 AM - ???' name='Hangout'>
          <p>Jams, Rocket League, Eating</p>
          <Setlist>
            <Setlist.Song
              name='Warpigs'
              artist='Black Sabbath'
              submittedBy='Steve'
              spotifyLink='https://open.spotify.com/track/0HVQuuXGAcQ2P5mBN521ae?si=82682de044c442e3'
              tabLink='https://tabs.ultimate-guitar.com/tab/black-sabbath/war-pigs-official-2003333'
              liveLink='https://www.youtube.com/watch?v=nSo76JiQrW8'
            />
            <Setlist.Song
              name={`Bitches Ain't Shit`}
              artist='Ben Folds (Dr. Dre)'
              submittedBy='Steve'
              youtubeLink='https://www.youtube.com/watch?v=gjFRy8jQ_0U'
              tabLink='https://tabs.ultimate-guitar.com/tab/ben-folds/bitches-aint-shit-chords-172201'
              liveLink='https://www.youtube.com/watch?v=Q3C4N6p78io'
            />
            <Setlist.Song
              name='Electric Feel'
              artist='MGMT'
              submittedBy='Aaron'
              spotifyLink='https://open.spotify.com/track/3FtYbEfBqAlGO46NUDQSAt?si=be56cf323ce945b1'
              tabLink='https://tabs.ultimate-guitar.com/tab/mgmt/electric-feel-official-2099683'
              liveLink='https://www.youtube.com/watch?v=Zipa5tHjaJs'
            />
            <Setlist.Song
              name='Self Esteem'
              artist='The Offspring'
              submittedBy='Steve'
              spotifyLink='https://open.spotify.com/track/1FkoVC85Ds3mFoK0fVqEqP?si=ad690485aa0d41aa'
              tabLink='https://tabs.ultimate-guitar.com/tab/the-offspring/self-esteem-official-1980577'
            />
            <Setlist.Song
              name='Shooting Stars'
              artist='Bag Raiders'
              submittedBy='Nick'
              spotifyLink='https://open.spotify.com/track/0UeYCHOETPfai02uskjJ3x?si=03b4f275f5d847b7'
              tabLink='https://tabs.ultimate-guitar.com/tab/bag-raiders/shooting-stars-official-2394435'
            />
          </Setlist>
        </Itenerary.Item>
      </Itenerary.Section>

      <Itenerary.Section title='Sunday, Aug 21st'>
        <Itenerary.Item timeRange='8:00 AM - ?' name='Golfing'>
          Course TDB
        </Itenerary.Item>
      </Itenerary.Section>
    </Itenerary>
  );
};

export default Aug192022;
