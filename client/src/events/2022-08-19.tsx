import { Button, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import Itinerary from '../components/Itinerary';
import NaviagationLink from '../components/NavigationLink';
import Setlist from '../components/Setlist';
import YoutubeLink from '../components/YoutubeLink';

const Aug192022: Component = () => {
  return (
    <Itinerary>
      <Itinerary.Title>Music Weekend, August 19th - 21st</Itinerary.Title>

      <Itinerary.Section title='Friday Night, Aug 19th'>
        <Itinerary.Article timeRange='5:30 PM - 6:00 PM' name='Four Day Ray'>
          <NaviagationLink
            size='sm'
            href='https://www.google.com/maps/dir//Four%20Day%20Ray%20Brewing,%2011671%20Lantern%20Rd,%20Fishers,%20IN%2046038'
          />
        </Itinerary.Article>
        <Itinerary.Article timeRange='6:00 PM - 10:00 PM' name='Concert'>
          <Stack gap={2}>
            <Stack direction='horizontal' gap={2}>
              <Button
                variant='primary'
                size='sm'
                href='https://wl.seetickets.us/event/Govt-MuleMacAllisterAmphitheateratGarfieldPark/479236?afflky=MOKB'>
                Get Tickets
              </Button>
              <NaviagationLink
                size='sm'
                href='https://google.com/maps/dir//Nickel+Plate+District+Amphitheater,+6+Municipal+Dr,+Fishers,+IN+46038/@39.9605582,-86.0193325,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8814b3869f97a02b:0xa819ac75af284476!2m2!1d-86.0171438!2d39.9605582'
              />
            </Stack>
            <div>
              <strong>Gov't Mule @ Nickel Plate Amphitheater</strong>{' '}
            </div>
            <Stack direction='horizontal' gap={2}>
              Main Squeeze Opening act for Warren Haynes group Gov't Mule
            </Stack>
            <div>Doors open at 6:00 PM, Show starts at 7:00 PM.</div>
            <div>
              <YoutubeLink size='sm' variant='outline-info' href='https://www.youtube.com/watch?v=JwVcQGp3bLo'>
                Main Squeeze at Bonarroo 2022
              </YoutubeLink>
            </div>
          </Stack>
        </Itinerary.Article>
        <Itinerary.Article timeRange='Late Night' name='Crash'>
          Find somewhere to sleep, options may include Travis or Nick.
        </Itinerary.Article>
      </Itinerary.Section>

      <Itinerary.Section title='Saturday, Aug 20th'>
        <Itinerary.Article timeRange='9:00 AM - 10:30 AM' name='Breakfast' />
        <Itinerary.Article timeRange='11:00 AM - ???' name='Hangout'>
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
        </Itinerary.Article>
      </Itinerary.Section>

      <Itinerary.Section title='Sunday, Aug 21st'>
        <Itinerary.Article timeRange='8:00 AM - ?' name='Golfing'>
          Course TDB
        </Itinerary.Article>
      </Itinerary.Section>
    </Itinerary>
  );
};

export default Aug192022;
