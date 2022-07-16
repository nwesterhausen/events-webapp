import debugLib from 'debug';
import { Knex } from 'knex';
import { ItinerarySectionData } from '../../../common/types/api';
import { ItinerarySection } from '../../../common/types/database';
import { StringToDate } from './common';
import articleQuery from './itinerary-article';
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
      itinerary_id: section.itinerary_id,
      id: section.id,
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
      itinerary_id: section.itinerary_id,
      id: section.id,
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
      itinerary_id: section.itinerary_id,
      id: section.id,
    });
  }
  return resolvedSections;
};

const updateSection = async (db: Knex, data: ItinerarySectionData) => {
  const res1 = await db('itinerary_section')
    .where({
      id: data.id,
    })
    .update(
      {
        date: data.date,
        itinerary_id: data.itinerary_id,
        tod_modifier: data.tod_modifier,
      },
      ['id']
    );
  const new_id = res1[0].id;
  debug(`updated section as id:${new_id}`);
  // For any of the connected info should be updated individually if it needs to be.
};

const deleteSection = async (db: Knex, id: number) => {
  await db('itinerary_section').where({ id: id }).delete();
  debug(`deleted section id:${id}`);
};

export default Object.assign(
  {},
  {
    all: allSections,
    byId: sectionById,
    foritinerary: sectionForitinerary,
    update: updateSection,
    delete: deleteSection,
  }
);
