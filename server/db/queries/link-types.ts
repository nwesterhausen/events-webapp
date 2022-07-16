import debugLib from 'debug';
import { Knex } from 'knex';
import { LinkType } from '../../../common/types/database';
import { LinkTypes } from '../../../common/types/shared';
const debug = debugLib('eventsapp:query-linktype');

const allLinkTypes = async (db: Knex): Promise<typeof LinkTypes[number][]> => {
  const linkTypes = await db.select().from('_link_types');
  debug(`allLinkTypes found ${linkTypes.length} types`);
  return linkTypes.map((v: LinkType) => v.name as typeof LinkTypes[number]);
};

const linkTypeById = async (db: Knex, linkTypeId: number): Promise<typeof LinkTypes[number][]> => {
  const linkTypes = await db.select().from('_link_types').where({
    id: linkTypeId,
  });
  if (linkTypes.length === 0) {
    debug(`no link type matching type_id:${linkTypeId}`);
    return [];
  }
  return linkTypes.map((v: LinkType) => v.name as typeof LinkTypes[number]);
};

export default Object.assign(
  {},
  {
    all: allLinkTypes,
    byId: linkTypeById,
  }
);
