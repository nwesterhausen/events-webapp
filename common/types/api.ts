import { User } from './database';
import { PermissionsObj, LinkTypes } from './shared';

export type UserData = User & PermissionsObj;

export type LinkData = {
  id: number;
  text?: string;
  url: string;
  type: typeof LinkTypes[number];
};
export type SongData = {
  id: number;
  name: string;
  artist: string;
  links: LinkData[];
};
export type SetlistData = {
  id: number;
  notes: string;
  location: string;
  songs: SongData[];
};
export type ItineraryItemData = {
  id: number;
  article_id: number;
  text: string;
};
export type ItineraryArticleData = {
  id: number;
  title: string;
  start_time?: Date;
  end_time?: Date;
  items: ItineraryItemData[];
  links: LinkData[];
  setlists: SetlistData[];
  section_id: number;
  action_links: LinkData[];
};
export type ItinerarySectionData = {
  id: number;
  date: Date;
  tod_modifier: string;
  articles: ItineraryArticleData[];
  itinerary_id: number;
};
export type ItineraryData = {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  sections: ItinerarySectionData[];
};
export type ItineraryHeadData = {
  id: number;
  itinerary_id: number;
  start_date: Date;
  end_date: Date;
};
