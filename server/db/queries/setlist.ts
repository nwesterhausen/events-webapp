import debugLib from 'debug';
import { Knex } from 'knex';
import { SetlistData } from '../../../common/types/api';
import { Setlist, Setlist2ItineraryArticle } from '../../../common/types/database';
import songQuery from './songs';
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
      id: setlist.id,
    });
  }
  return resolvedSongs;
};

const setlistById = async (db: Knex, setlistId: number): Promise<SetlistData[]> => {
  const setlists = await db.select().from('setlist').where({
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
      id: setlist.id,
    },
  ];
};

const setlistForitineraryArticle = async (db: Knex, articleId: number): Promise<SetlistData[]> => {
  const setlistSongs = await db.select().from('setlist_2_itinerary_article').where({
    itinerary_article_id: articleId,
  });
  debug(`setlistForitineraryArticle(${articleId}) found ${setlistSongs.length} setlists`);
  const setlists: SetlistData[] = [];
  for (const setlist of setlistSongs as Setlist2ItineraryArticle[]) {
    const match = await setlistById(db, setlist.setlist_id);
    if (match.length === 1) {
      setlists.push(match[0]);
    }
  }
  return setlists;
};

const updateSetlist = async (db: Knex, data: SetlistData) => {
  const res1 = await db('setlist')
    .where({
      id: data.id,
    })
    .update(
      {
        notes: data.notes,
        location: data.location,
      },
      ['id']
    );
  const new_id = res1[0].id;
  debug(`updated setlist as id:${new_id}`);
  // For any of the connected info should be updated individually if it needs to be.
};

const deleteSetlist = async (db: Knex, id: number) => {
  await db('setlist').where({ id: id }).delete();
  debug(`deleted setlist id:${id}`);
};

export default Object.assign(
  {},
  {
    all: allSetlists,
    byId: setlistById,
    foritineraryArticle: setlistForitineraryArticle,
    update: updateSetlist,
    delete: deleteSetlist,
  }
);
