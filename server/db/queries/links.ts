import debugLib from 'debug';
import { Knex } from 'knex';
import { Link2ItineraryArticle, Link2Song } from 'knex/types/tables';
import { LinkData } from './types';
const debug = debugLib('eventsapp:query-link');

const allLinks = async (db: Knex): Promise<LinkData[]> => {
  const links = await db.select().from('link');
  debug(`allLinks found ${links.length} links`);
  return links.map((v) => {
    return {
      text: v.text || '',
      url: v.url,
      type: v.type,
    };
  });
};

const linkById = async (db: Knex, linkId: number): Promise<LinkData[]> => {
  const links = await db.select().from('link').where({
    id: linkId,
  });
  if (links.length === 0) {
    debug(`no link matching link_id:${linkId}`);
    return [];
  }
  return [
    {
      text: links[0].text || '',
      url: links[0].url,
      type: links[0].type,
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

const allLinkForitineraryArticle = async (db: Knex, articleId: number): Promise<LinkData[]> => {
  const articleLinks = await db.select().from('link_2_itinerary_article').where({
    itinerary_article_id: articleId,
  });
  debug(`allLinkForitineraryArticle(${articleId}) found ${articleLinks.length} links`);
  const links: LinkData[] = [];
  for (const articlelink of articleLinks as Link2ItineraryArticle[]) {
    const match = await linkById(db, articlelink.link_id);
    if (match.length === 1) {
      links.push(match[0]);
    }
  }
  return links;
};

export default Object.assign(
  {},
  {
    all: allLinks,
    byId: linkById,
    forSong: allLinksForSong,
    foritineraryArticle: allLinkForitineraryArticle,
  }
);
