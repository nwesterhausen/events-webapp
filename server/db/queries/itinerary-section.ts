import debugLib from 'debug';
import { Knex } from 'knex';
import { ItinerarySection } from '../../../common/types/database';
import { StringToDate } from './common';
import articleQuery from './itinerary-article';
import { ItinerarySectionData } from '../../../common/types/api';
const debug = debugLib('eventsapp:query-isection');

const allSections = async (db: Knex): Promise<ItinerarySectionData[]> => {
  const sections = await db.select().from('itinerary_section');
  debug(`allSections found ${sections.length} sections`);
  const resolvedSections: ItinerarySectionData[] = [];
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

const sectionById = async (db: Knex, sectionId: number): Promise<ItinerarySectionData[]> => {
  const sections = await db.select().from('itinerary_section').where({
    itinerary_id: sectionId,
  });
  if (sections.length === 0) {
    debug(`no section matching section_id:${sectionId}`);
    return [];
  }
  const section = sections[0] as ItinerarySection;
  const articles = await articleQuery.forSection(db, section.id);

  return [
    {
      date: StringToDate(section.date),
      tod_modifier: section.tod_modifier,
      articles: articles,
    },
  ];
};
const sectionForitinerary = async (db: Knex, itineraryId: number): Promise<ItinerarySectionData[]> => {
  const sections = await db.select().from('itinerary_section').where({
    itinerary_id: itineraryId,
  });
  debug(`sectionForitinerary(${itineraryId}) found ${sections.length} sections`);
  const resolvedSections: ItinerarySectionData[] = [];
  for (const section of sections as ItinerarySection[]) {
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
    foritinerary: sectionForitinerary,
  }
);
