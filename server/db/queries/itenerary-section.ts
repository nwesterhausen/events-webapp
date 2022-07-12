import debugLib from 'debug';
import { Knex } from 'knex';
import { ItenerarySection } from 'knex/types/tables';
import { StringToDate } from './common';
import articleQuery from './itenerary-article';
import { ItenerarySectionData } from './types';
const debug = debugLib('eventsapp:query-isection');

const allSections = async (db: Knex): Promise<ItenerarySectionData[]> => {
  const sections = await db.select().from('itenerary_section');
  debug(`allSections found ${sections.length} sections`);
  const resolvedSections: ItenerarySectionData[] = [];
  for (const section of sections) {
    const articles = await articleQuery.forSection(db, section.id);
    resolvedSections.push({
      date: StringToDate(section.date),
      tod_modifier: section.tod_modifier,
      articles: articles,
    });
  }
  return resolvedSections;
};

const sectionById = async (db: Knex, sectionId: number): Promise<ItenerarySectionData[]> => {
  const sections = await db.select().from('itenerary_section').where({
    itenerary_id: sectionId,
  });
  if (sections.length === 0) {
    debug(`no section matching section_id:${sectionId}`);
    return [];
  }
  const section = sections[0] as ItenerarySection;
  const articles = await articleQuery.forSection(db, section.id);

  return [
    {
      date: StringToDate(section.date),
      tod_modifier: section.tod_modifier,
      articles: articles,
    },
  ];
};
const sectionForItenerary = async (db: Knex, iteneraryId: number): Promise<ItenerarySectionData[]> => {
  const sections = await db.select().from('itenerary_section').where({
    itenerary_id: iteneraryId,
  });
  debug(`sectionForItenerary(${iteneraryId}) found ${sections.length} sections`);
  const resolvedSections: ItenerarySectionData[] = [];
  for (const section of sections as ItenerarySection[]) {
    const articles = await articleQuery.forSection(db, section.id);
    resolvedSections.push({
      date: StringToDate(section.date),
      tod_modifier: section.tod_modifier,
      articles: articles,
    });
  }
  return resolvedSections;
};

export default Object.assign(
  {},
  {
    all: allSections,
    byId: sectionById,
    forItenerary: sectionForItenerary,
  }
);
