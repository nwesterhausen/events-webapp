import debugLib from 'debug';
import { Knex } from 'knex';
import { LinkType } from 'knex/types/tables';
import { ItineraryItemData } from './types';
const debug = debugLib('eventsapp:query-linktype');

const allLinkTypes = async (db: Knex): Promise<LinkType[]> => {
  const linkTypes = await db.select().from('_link_types');
  debug(`allLinkTypes found ${linkTypes.length} types`);
  return linkTypes;
};

const linkTypeById = async (db: Knex, linkTypeId: number): Promise<ItineraryItemData[]> => {
  const linkTypes = await db.select().from('_link_types').where({
    id: linkTypeId,
  });
  if (linkTypes.length === 0) {
    debug(`no link type matching type_id:${linkTypeId}`);
    return [];
  }
  return linkTypes;
};

export default Object.assign(
  {},
  {
    all: allLinkTypes,
    byId: linkTypeById,
  }
);
