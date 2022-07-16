import debugLib from 'debug';
import { Knex } from 'knex';
import { ItineraryItemData } from '../../../common/types/api';
import { ItineraryItem } from '../../../common/types/database';
const debug = debugLib('eventsapp:query-iitem');

const allItems = async (db: Knex): Promise<ItineraryItemData[]> => {
  const items = await db.select().from('itinerary_item');
  debug(`allItems found ${items.length} items`);
  return items.map((v: ItineraryItem) => {
    return {
      id: v.id,
      article_id: v.itinerary_article_id,
      text: v.text,
    };
  });
};

const itemById = async (db: Knex, itemId: number): Promise<ItineraryItemData[]> => {
  const items = await db.select().from('itinerary_item').where({
    id: itemId,
  });
  if (items.length === 0) {
    debug(`no item matching item_id:${itemId}`);
    return [];
  }
  const item = items[0];
  return [
    {
      id: item.id,
      article_id: item.itinerary_article_id,
      text: item.text,
    },
  ];
};

const allItemsForArticle = async (db: Knex, articleId: number): Promise<ItineraryItemData[]> => {
  const items = await db.select().from('itinerary_item').where({
    itinerary_article_id: articleId,
  });
  debug(`allItemsForArticle(${articleId}) found ${items.length} items`);
  const resolvedItems: ItineraryItemData[] = [];
  for (const item of items) {
    resolvedItems.push({
      id: item.id,
      article_id: item.itinerary_article_id,
      text: item.text,
    });
  }
  return resolvedItems;
};

const insertItem = async (db: Knex, text: string, article_id: number): Promise<number> => {
  const res = await db('itinerary_item').insert(
    {
      text: text,
      itinerary_article_id: article_id,
    },
    ['id']
  );
  const new_id = res[0].id;
  debug(`inserted ${text} into item:${new_id} => article:${article_id}`);
  return new_id;
};

const updateItem = async (db: Knex, item: ItineraryItemData): Promise<void> => {
  await db('itinerary_item')
    .where({
      id: item.id,
    })
    .update(item);
};

const deleteItem = async (db: Knex, id: number) => {
  await db('itinerary_item').where({ id: id }).delete();
  debug(`deleted item id:${id}`);
};

export default Object.assign(
  {},
  {
    all: allItems,
    byId: itemById,
    forArticle: allItemsForArticle,
    insert: insertItem,
    update: updateItem,
    delete: deleteItem,
  }
);
