import debugLib from 'debug';
import { Knex } from 'knex';
import { LinkData } from '../../../common/types/api';
import { Link2ItineraryArticle, Link2Song } from '../../../common/types/database';
import linkTypeQuery from './link-types';
const debug = debugLib('eventsapp:query-link');

const allLinks = async (db: Knex): Promise<LinkData[]> => {
  const links = await db.select('*').from('links').innerJoin('link_type', {
    'links.type': 'link_type.id',
  });
  debug(`allLinks found ${links.length} links`);
  const resolvedLinks: LinkData[] = [];
  for (const link of links) {
    const typeStr = await linkTypeQuery.byId(db, link.link_type);
    resolvedLinks.push({
      id: link.id,
      text: link.text || '',
      url: link.url,
      type: typeStr.length > 0 ? typeStr[0] : 'Generic',
    });
  }
  return resolvedLinks;
};

const linkById = async (db: Knex, linkId: number): Promise<LinkData[]> => {
  const links = await db
    .select('*')
    .from('links')
    .innerJoin('link_type', {
      'links.type': 'link_type.id',
    })
    .where({
      id: linkId,
    });
  if (links.length === 0) {
    debug(`no link matching link_id:${linkId}`);
    return [];
  }
  const my_link = links[0];
  const typeStr = await linkTypeQuery.byId(db, my_link.link_type);
  return [
    {
      id: my_link.id,
      text: my_link.text || '',
      url: my_link.url,
      type: typeStr.length > 0 ? typeStr[0] : 'Generic',
    },
  ];
};

const allLinksForSong = async (db: Knex, songId: number): Promise<LinkData[]> => {
  const songLinks = await db.select().from('link_2_song').where({
    song_id: songId,
  });
  debug(`allLinksForSong(${songId}) found ${songLinks.length} links`);
  const links: LinkData[] = [];
  for (const songlink of songLinks as Link2Song[]) {
    const match = await linkById(db, songlink.link_id);
    if (match.length === 1) {
      links.push(match[0]);
    }
  }
  return links;
};

const allLinkForitineraryArticle = async (db: Knex, articleId: number): Promise<[LinkData[], LinkData[]]> => {
  const articleLinks = await db.select().from('link_2_itinerary_article').where({
    itinerary_article_id: articleId,
  });
  debug(`allLinks for Article(${articleId}) found ${articleLinks.length} links`);
  const articleActionLinks = await db.select().from('actionlinks_2_itinerary_article').where({
    itinerary_article_id: articleId,
  });
  debug(`allActionLinks for Article(${articleId}) found ${articleActionLinks.length} links`);
  const links: LinkData[] = [];
  for (const articlelink of articleLinks as Link2ItineraryArticle[]) {
    const match = await linkById(db, articlelink.link_id);
    if (match.length === 1) {
      links.push(match[0]);
    }
  }
  const actionLinks: LinkData[] = [];
  for (const actionLink of articleActionLinks as Link2ItineraryArticle[]) {
    const match = await linkById(db, actionLink.link_id);
    if (match.length === 1) {
      actionLinks.push(match[0]);
    }
  }
  return [links, actionLinks];
};

const updateLink = async (db: Knex, data: LinkData) => {
  const typeId = await linkTypeQuery.idByName(db, data.type);
  const res1 = await db('links')
    .where({
      id: data.id,
    })
    .update(
      {
        url: data.url,
        text: data.text || '',
        type: typeId,
      },
      ['id']
    );
  const new_id = res1[0].id;
  debug(`updated link as id:${new_id}`);
  // For any of the connected info should be updated individually if it needs to be.
};

const deleteLink = async (db: Knex, id: number) => {
  await db('links').where({ id: id }).delete();
  debug(`deleted link id:${id}`);
};

export default Object.assign(
  {},
  {
    all: allLinks,
    byId: linkById,
    forSong: allLinksForSong,
    foritineraryArticle: allLinkForitineraryArticle,
    update: updateLink,
    delete: deleteLink,
  }
);
