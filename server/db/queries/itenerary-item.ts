import debugLib from 'debug';
import { Knex } from 'knex';
import { ItenereryItemData } from './types';
const debug = debugLib('eventsapp:query-iitem');

const allItems = async (db: Knex): Promise<ItenereryItemData[]> => {
  const items = await db.select().from('itenerary_item');
  debug(`allItems found ${items.length} items`);
  return items.map((v) => {
    return {
      text: v.text,
    };
  });
};

const itemById = async (db: Knex, itemId: number): Promise<ItenereryItemData[]> => {
  const items = await db.select().from('itenerary_item').where({
    id: itemId,
  });
  if (items.length === 0) {
    debug(`no item matching item_id:${itemId}`);
    return [];
  }
  return [
    {
      text: items[0].text,
    },
  ];
};

const allItemsForArticle = async (db: Knex, articleId: number): Promise<ItenereryItemData[]> => {
  const items = await db.select().from('itenerary_item').where({
    itenerary_article_id: articleId,
  });
  debug(`allItemsForArticle(${articleId}) found ${items.length} items`);
  const resolvedItems: ItenereryItemData[] = [];
  for (const item of items) {
    resolvedItems.push({
      text: item.text,
    });
  }
  return resolvedItems;
};

export default Object.assign(
  {},
  {
    all: allItems,
    byId: itemById,
    forArticle: allItemsForArticle,
  }
);
