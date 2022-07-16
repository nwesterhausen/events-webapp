import debugLib from 'debug';
import { Knex } from 'knex';
import { ItineraryArticleData } from '../../../common/types/api';
import { ItineraryArticle } from '../../../common/types/database';
import { StringToDate } from './common';
import itemQuery from './itinerary-item';
import linkQuery from './links';
import setlistQuery from './setlist';
const debug = debugLib('eventsapp:query-iarticle');

const allArticles = async (db: Knex): Promise<ItineraryArticleData[]> => {
  const articles = await db.select().from('itinerary_article');
  debug(`allArticles found ${articles.length} articles`);
  const resolvedArticles: ItineraryArticleData[] = [];
  for (const article of articles) {
    const items = await itemQuery.forArticle(db, article.id);
    const [links, actionLinks] = await linkQuery.foritineraryArticle(db, article.id);
    const setlists = await setlistQuery.foritineraryArticle(db, article.id);

    resolvedArticles.push({
      id: article.id,
      title: article.title,
      start_time: StringToDate(article.start_time),
      end_time: StringToDate(article.end_time),
      items: items,
      setlists: setlists,
      links: links,
      section_id: article.itinerary_section_id,
      action_links: actionLinks,
    });
  }
  return resolvedArticles;
};

const articleById = async (db: Knex, articleId: number): Promise<ItineraryArticleData[]> => {
  const articles = await db.select().from('itinerary_article').where({
    itinerary_section_id: articleId,
  });
  if (articles.length === 0) {
    debug(`no article matching article_id:${articleId}`);
    return [];
  }
  const article = articles[0] as ItineraryArticle;
  const items = await itemQuery.forArticle(db, article.id);
  const [links, actionLinks] = await linkQuery.foritineraryArticle(db, article.id);
  const setlists = await setlistQuery.foritineraryArticle(db, article.id);

  return [
    {
      id: article.id,
      title: article.title,
      start_time: StringToDate(article.start_time),
      end_time: StringToDate(article.end_time),
      items: items,
      setlists: setlists,
      links: links,
      section_id: article.itinerary_section_id,
      action_links: actionLinks,
    },
  ];
};

const articleForSection = async (db: Knex, sectionId: number): Promise<ItineraryArticleData[]> => {
  const articles = await db.select().from('itinerary_article').where({
    itinerary_section_id: sectionId,
  });
  debug(`articleForSection(${sectionId}) found ${articles.length} articles`);
  const resolvedSections: ItineraryArticleData[] = [];
  for (const article of articles as ItineraryArticle[]) {
    const items = await itemQuery.forArticle(db, article.id);
    const [links, actionLinks] = await linkQuery.foritineraryArticle(db, article.id);
    const setlists = await setlistQuery.foritineraryArticle(db, article.id);
    resolvedSections.push({
      id: article.id,
      title: article.title,
      start_time: StringToDate(article.start_time),
      end_time: StringToDate(article.end_time),
      items: items,
      setlists: setlists,
      links: links,
      section_id: article.itinerary_section_id,
      action_links: actionLinks,
    });
  }
  return resolvedSections;
};

const insertArticle = async (db: Knex, data: ItineraryArticleData, section_id: number) => {
  const res1 = await db('itinerary_article').insert(
    {
      title: data.title,
      end_time: data.end_time,
      start_time: data.start_time,
      itinerary_section_id: section_id,
    },
    ['id']
  );
  const new_id = res1[0].id;
  debug(`inserted article as id:${new_id}`);
  // For any of the connected info should be updated individually if it needs to be.
};

const updateArticle = async (db: Knex, data: ItineraryArticleData, section_id: number) => {
  const res1 = await db('itinerary_article')
    .where({
      id: data.id,
    })
    .update(
      {
        title: data.title,
        end_time: data.end_time,
        start_time: data.start_time,
        itinerary_section_id: section_id,
      },
      ['id']
    );
  const new_id = res1[0].id;
  debug(`updated article as id:${new_id}`);
  // For any of the connected info should be updated individually if it needs to be.
};

const deleteArticle = async (db: Knex, id: number) => {
  await db('itinerary_article').where({ id: id }).delete();
  debug(`deleted article id:${id}`);
};

export default Object.assign(
  {},
  {
    all: allArticles,
    byId: articleById,
    forSection: articleForSection,
    insert: insertArticle,
    update: updateArticle,
    delete: deleteArticle,
  }
);
