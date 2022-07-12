import debugLib from 'debug';
import { Knex } from 'knex';
import { ItenearyArticle } from 'knex/types/tables';
import { StringToDate } from './common';
import itemQuery from './itenerary-item';
import linkQuery from './links';
import setlistQuery from './setlist';
import { ItenearyArticleData } from './types';
const debug = debugLib('eventsapp:query-iarticle');

const allArticles = async (db: Knex): Promise<ItenearyArticleData[]> => {
  const articles = await db.select().from('itenerary_article');
  debug(`allArticles found ${articles.length} articles`);
  const resolvedArticles: ItenearyArticleData[] = [];
  for (const article of articles) {
    const items = await itemQuery.forArticle(db, article.id);
    const links = await linkQuery.forIteneraryArticle(db, article.id);
    const setlists = await setlistQuery.forIteneraryArticle(db, article.id);

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

const articleById = async (db: Knex, articleId: number): Promise<ItenearyArticleData[]> => {
  const articles = await db.select().from('itenerary_article').where({
    itenerary_section_id: articleId,
  });
  if (articles.length === 0) {
    debug(`no article matching article_id:${articleId}`);
    return [];
  }
  const article = articles[0] as ItenearyArticle;
  const items = await itemQuery.forArticle(db, article.id);
  const links = await linkQuery.forIteneraryArticle(db, article.id);
  const setlists = await setlistQuery.forIteneraryArticle(db, article.id);

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

const articleForSection = async (db: Knex, sectionId: number): Promise<ItenearyArticleData[]> => {
  const articles = await db.select().from('itenerary_article').where({
    itenerary_section_id: sectionId,
  });
  debug(`articleForSection(${sectionId}) found ${articles.length} articles`);
  const resolvedSections: ItenearyArticleData[] = [];
  for (const article of articles as ItenearyArticle[]) {
    const items = await itemQuery.forArticle(db, article.id);
    const links = await linkQuery.forIteneraryArticle(db, article.id);
    const setlists = await setlistQuery.forIteneraryArticle(db, article.id);
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
