import { User } from 'knex/types/tables';
import { PermissionsObj } from '../../../typing-stubs/express-session';

export type LinkData = {
  text?: string;
  url: string;
  type: number;
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
export type ItenereryItemData = {
  text: string;
};
export type ItenearyArticleData = {
  title: string;
  start_time: Date;
  end_time: Date;
  items: ItenereryItemData[];
  links: LinkData[];
  setlists: SetlistData[];
};
export type ItenerarySectionData = {
  date: Date;
  tod_modifier: string;
  articles: ItenearyArticleData[];
};
export type IteneraryData = {
  title: string;
  start_date: Date;
  end_date: Date;
  sections: ItenerarySectionData[];
};
export type IteneraryHead = {
  itenerary_id: number;
  start_date: Date;
  end_date: Date;
};
export type UserData = User & PermissionsObj;
