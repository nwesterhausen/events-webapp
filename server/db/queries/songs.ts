import debugLib from 'debug';
import { Knex } from 'knex';
import { SongData } from '../../../common/types/api';
import { SetlistSong, Song2Setlist } from '../../../common/types/database';
import linkQuery from './links';
const debug = debugLib('eventsapp:query-song');

const allSongs = async (db: Knex): Promise<SongData[]> => {
  const songs = await db.select().from('setlist_song');
  debug(`allSongs found ${songs.length} songs`);
  const resolvedSongs: SongData[] = [];
  for (const song of songs) {
    const links = await linkQuery.forSong(db, song.id);
    resolvedSongs.push({
      name: song.name,
      artist: song.artist,
      links: links,
      id: song.id,
    });
  }
  return resolvedSongs;
};

const songById = async (db: Knex, songId: number): Promise<SongData[]> => {
  const songs = await db.select().from('setlist_song').where({
    id: songId,
  });
  if (songs.length === 0) {
    debug(`no song matching song_id:${songId}`);
    return [];
  }
  const song = songs[0] as SetlistSong;
  const links = await linkQuery.forSong(db, songId);
  return [
    {
      name: song.name,
      artist: song.artist,
      links: links,
      id: song.id,
    },
  ];
};
const songsForSetlist = async (db: Knex, setlistId: number): Promise<SongData[]> => {
  const setlistSongs = await db.select().from('song_2_setlist').where({
    setlist_id: setlistId,
  });
  debug(`songsForSetlist(${setlistId}) found ${setlistSongs.length} songs`);
  const songs: SongData[] = [];
  for (const setlistSong of setlistSongs as Song2Setlist[]) {
    const match = await songById(db, setlistSong.setlist_song_id);
    if (match.length === 1) {
      songs.push(match[0]);
    }
  }
  return songs;
};

const updateSong = async (db: Knex, data: SongData) => {
  const res1 = await db('setlist_song')
    .where({
      id: data.id,
    })
    .update(
      {
        name: data.name,
        artist: data.artist,
      },
      ['id']
    );
  const new_id = res1[0].id;
  debug(`updated song as id:${new_id}`);
  // For any of the connected info should be updated individually if it needs to be.
};

const deleteSong = async (db: Knex, id: number) => {
  await db('setlist_song').where({ id: id }).delete();
  debug(`deleted song id:${id}`);
};

export default Object.assign(
  {},
  {
    all: allSongs,
    byId: songById,
    forSetlist: songsForSetlist,
    update: updateSong,
    delete: deleteSong,
  }
);
