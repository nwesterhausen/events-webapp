import debugLib from 'debug';
import { Knex } from 'knex';
import { Itenerary } from 'knex/types/tables';
import { StringToDate } from './common';
import sectionQuery from './itenerary-section';
import { IteneraryData, IteneraryHead } from './types';
const debug = debugLib('eventsapp:query-setlist');

const allIteneraries = async (db: Knex): Promise<IteneraryData[]> => {
  const iteneraries = await db.select().from('itenerary');
  debug(`allItenerariesHead found ${iteneraries.length} iteneraries`);
  const resolvedIteneraries: IteneraryData[] = [];
  for (const itenerary of iteneraries) {
    const sections = await sectionQuery.forItenerary(db, itenerary.id);
    resolvedIteneraries.push({
      title: itenerary.title,
      start_date: StringToDate(itenerary.start_date),
      end_date: StringToDate(itenerary.end_date),
      sections: sections,
    });
  }
  return resolvedIteneraries;
};

const iteneraryById = async (db: Knex, iteneraryId: number): Promise<IteneraryData[]> => {
  const iteneraries = await db.select().from('itenerary').where({
    id: iteneraryId,
  });
  if (iteneraries.length === 0) {
    debug(`no itenerary matching itenerary_id:${iteneraryId}`);
    return [];
  }
  const itenerary = iteneraries[0] as Itenerary;
  const sections = await sectionQuery.forItenerary(db, itenerary.id);

  return [
    {
      title: itenerary.title,
      start_date: StringToDate(itenerary.start_date),
      end_date: StringToDate(itenerary.end_date),
      sections: sections,
    },
  ];
};

const allItenerariesHead = async (db: Knex): Promise<IteneraryHead[]> => {
  const iteneraries = await db.select().from('itenerary');
  debug(`allItenerariesHead found ${iteneraries.length} iteneraries`);
  const iteneraryHead: IteneraryHead[] = [];
  for (const itenerary of iteneraries as Itenerary[]) {
    iteneraryHead.push({
      itenerary_id: itenerary.id,
      start_date: StringToDate(itenerary.start_date),
      end_date: StringToDate(itenerary.end_date),
    });
  }
  return iteneraryHead;
};

export default Object.assign(
  {},
  {
    all: allIteneraries,
    byId: iteneraryById,
    head: allItenerariesHead,
  }
);
