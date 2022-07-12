import debugLib from 'debug';
import { Knex } from 'knex';
import { ItineraryArticle } from 'knex/types/tables';
import { StringToDate } from './common';
import itemQuery from './itinerary-item';
import linkQuery from './links';
import setlistQuery from './setlist';
import { ItineraryArticleData } from './types';
const debug = debugLib('eventsapp:query-iarticle');

const allArticles = async (db: Knex): Promise<ItineraryArticleData[]> => {
  const articles = await db.select().from('itinerary_article');
  debug(`allArticles found ${articles.length} articles`);
  const resolvedArticles: ItineraryArticleData[] = [];
  for (const article of articles) {
    const items = await itemQuery.forArticle(db, article.id);
    const links = await linkQuery.foritineraryArticle(db, article.id);
    const setlists = await setlistQuery.foritineraryArticle(db, article.id);

    resolvedArticles.push({
      title: article.title,
      start_time: StringToDate(article.start_time),
      end_time: StringToDate(article.end_time),
      items: items,
      setlists: setlists,
      links: links,
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
  const links = await linkQuery.foritineraryArticle(db, article.id);
  const setlists = await setlistQuery.foritineraryArticle(db, article.id);

  return [
    {
      title: article.title,
      start_time: StringToDate(article.start_time),
      end_time: StringToDate(article.end_time),
      items: items,
      setlists: setlists,
      links: links,
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
    const links = await linkQuery.foritineraryArticle(db, article.id);
    const setlists = await setlistQuery.foritineraryArticle(db, article.id);
    resolvedSections.push({
      title: article.title,
      start_time: StringToDate(article.start_time),
      end_time: StringToDate(article.end_time),
      items: items,
      setlists: setlists,
      links: links,
    });
  }
  return resolvedSections;
};

export default Object.assign(
  {},
  {
    all: allArticles,
    byId: articleById,
    forSection: articleForSection,
  }
);
