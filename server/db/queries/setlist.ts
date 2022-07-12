import debugLib from 'debug';
import { Knex } from 'knex';
import { Setlist, SetlistSong } from 'knex/types/tables';
const debug = debugLib('eventsapp:query-setlist');

export type FullSetlist = Setlist & {
  songs: number[];
};

// TODO: rewrite this to use the SongData and SetlistData types.

export const querySetlists = async (knex: Knex, id?: number): Promise<FullSetlist[]> => {
  if (id && id !== null) {
    const setlists = await knex('setlist').select().where({ id: id });
    const songs = await knex('song_2_setlist').select('setlist_song_id').where({ setlist_id: id });
    if (setlists.length === 0) {
      debug(`No setlists matched ${id}`);
      return [];
    }
    if (setlists.length > 1) {
      debug(`Somehow matched ${setlists.length} setlists for id ${id}`);
    }
    return [
      {
        ...setlists[0],
        songs: songs.map((v) => v.setlist_song_id),
      },
    ];
  }
  // Return all setlists and details
  const setlists = await knex('setlist').select();
  const songs = await knex('song_2_setlist').select();
  if (setlists.length === 0) {
    debug(`No setlists exist`);
    return [];
  }
  const results: FullSetlist[] = [];
  if (songs.length === 0) {
    debug(`No songs exist`);
    for (const set of setlists) {
      results.push({
        ...set,
        songs: [],
      });
    }
    return results;
  }
  for (const set of setlists) {
    results.push({
      ...set,
      songs: songs.filter((v) => v.setlist_id === set.id).map((v) => v.setlist_song_id),
    });
  }
  return results;
};
