import debugLib from 'debug';
import { Knex } from 'knex';
import { Setlist, Setlist2IteneraryArticle } from 'knex/types/tables';
import songQuery from './songs';
import { SetlistData } from './types';
const debug = debugLib('eventsapp:query-setlist');

const allSetlists = async (db: Knex): Promise<SetlistData[]> => {
  const setlists = await db.select().from('setlist');
  debug(`alLSetlists found ${setlists.length} setlists`);
  const resolvedSongs: SetlistData[] = [];
  for (const setlist of setlists) {
    const songs = await songQuery.forSetlist(db, setlist.id);
    resolvedSongs.push({
      notes: setlist.notes,
      location: setlist.location,
      songs: songs,
    });
  }
  return resolvedSongs;
};

const setlistById = async (db: Knex, setlistId: number): Promise<SetlistData[]> => {
  const setlists = await db.select().from('setlist_song').where({
    id: setlistId,
  });
  if (setlists.length === 0) {
    debug(`no setlist matching song_id:${setlistId}`);
    return [];
  }
  const setlist = setlists[0] as Setlist;
  const songs = await songQuery.forSetlist(db, setlist.id);
  return [
    {
      notes: setlist.notes,
      location: setlist.location,
      songs: songs,
    },
  ];
};

const setlistForIteneraryArticle = async (db: Knex, articleId: number): Promise<SetlistData[]> => {
  const setlistSongs = await db.select().from('setlist_2_itenerary_article').where({
    itenerary_article_id: articleId,
  });
  debug(`setlistForIteneraryArticle(${articleId}) found ${setlistSongs.length} setlists`);
  const setlists: SetlistData[] = [];
  for (const setlist of setlistSongs as Setlist2IteneraryArticle[]) {
    const match = await setlistById(db, setlist.setlist_id);
    if (match.length === 1) {
      setlists.push(match[0]);
    }
  }
  return setlists;
};

export default Object.assign(
  {},
  {
    all: allSetlists,
    byId: setlistById,
    forIteneraryArticle: setlistForIteneraryArticle,
  }
);
