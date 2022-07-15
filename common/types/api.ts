import { User } from './database';
import { PermissionsObj } from './shared';

export type UserData = User & PermissionsObj;
export type LinkData = {
  text?: string;
  url: string;
  type: string;
};
export type SongData = {
  name: string;
  artist: string;
  links: LinkData[];
};
export type SetlistData = {
  notes: string;
  location: string;
  songs: SongData[];
};
export type ItineraryItemData = {
  text: string;
};
export type ItineraryArticleData = {
  title: string;
  start_time: Date;
  end_time: Date;
  items: ItineraryItemData[];
  links: LinkData[];
  setlists: SetlistData[];
};
export type ItinerarySectionData = {
  date: Date;
  tod_modifier: string;
  articles: ItineraryArticleData[];
};
export type ItineraryData = {
  title: string;
  start_date: Date;
  end_date: Date;
  sections: ItinerarySectionData[];
};
export type ItineraryHeadData = {
  itinerary_id: number;
  start_date: Date;
  end_date: Date;
};
