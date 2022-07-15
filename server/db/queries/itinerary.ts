import debugLib from 'debug';
import { Knex } from 'knex';
import { Itinerary } from '../../../common/types/database';
import { StringToDate } from './common';
import sectionQuery from './itinerary-section';
import { ItineraryData, ItineraryHeadData } from '../../../common/types/api';
const debug = debugLib('eventsapp:query-setlist');

const allIteneraries = async (db: Knex): Promise<ItineraryData[]> => {
  const iteneraries = await db.select().from('itinerary');
  debug(`allItenerariesHead found ${iteneraries.length} iteneraries`);
  const resolvedIteneraries: ItineraryData[] = [];
  for (const itinerary of iteneraries) {
    const sections = await sectionQuery.foritinerary(db, itinerary.id);
    resolvedIteneraries.push({
      title: itinerary.title,
      start_date: StringToDate(itinerary.start_date),
      end_date: StringToDate(itinerary.end_date),
      sections: sections,
    });
  }
  return resolvedIteneraries;
};

const itineraryById = async (db: Knex, itineraryId: number): Promise<ItineraryData[]> => {
  const iteneraries = await db.select().from('itinerary').where({
    id: itineraryId,
  });
  if (iteneraries.length === 0) {
    debug(`no itinerary matching itinerary_id:${itineraryId}`);
    return [];
  }
  const itinerary = iteneraries[0] as Itinerary;
  const sections = await sectionQuery.foritinerary(db, itinerary.id);

  return [
    {
      title: itinerary.title,
      start_date: StringToDate(itinerary.start_date),
      end_date: StringToDate(itinerary.end_date),
      sections: sections,
    },
  ];
};

const allItenerariesHead = async (db: Knex): Promise<ItineraryHeadData[]> => {
  const iteneraries = await db.select().from('itinerary');
  debug(`allItenerariesHead found ${iteneraries.length} iteneraries`);
  const itineraryHead: ItineraryHeadData[] = [];
  for (const itinerary of iteneraries as Itinerary[]) {
    itineraryHead.push({
      itinerary_id: itinerary.id,
      start_date: StringToDate(itinerary.start_date),
      end_date: StringToDate(itinerary.end_date),
    });
  }
  return itineraryHead;
};

export default Object.assign(
  {},
  {
    all: allIteneraries,
    byId: itineraryById,
    head: allItenerariesHead,
  }
);
