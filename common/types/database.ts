import { LinkTypes, GetNumericKeys } from './shared';

export type User = {
  id: number;
  name: string;
  email: string;
  googleId: string;
  discordId: string;
  created_at: string;
  updated_at: string;
};
export type Permission = {
  id: number;
  name: string;
  description: string;
};
export type UserPermission = {
  id: number;
  user_id: number;
  permission_id: number;
};
export type Setlist = {
  id: number;
  notes: string;
  location: string;
};
export type SetlistSong = {
  id: number;
  name: string;
  artist: string;
};
export type LinkType = {
  id: number;
  name: string;
};
export type Song2Setlist = {
  setlist_id: number;
  setlist_song_id: number;
};
export type Link = {
  id: number;
  text?: string;
  url: string;
  link_type: GetNumericKeys<keyof typeof LinkTypes>;
};
export type Link2Song = {
  link_id: number;
  song_id: number;
};
export type Link2ItineraryArticle = {
  link_id: number;
  itinerary_article_id: number;
};
export type ItineraryItem = {
  id: number;
  text: string;
  itinerary_article_id: number;
};
export type ItineraryArticle = {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  itinerary_section_id: number;
};
export type ItinerarySection = {
  id: number;
  date: string;
  tod_modifier: string;
  itinerary_id: number;
};
export type Itinerary = {
  id: number;
  start_date: string;
  end_date: string;
  title: string;
};
export type Setlist2ItineraryArticle = {
  setlist_id: number;
  itinerary_article_id: number;
};
export type ActionLink2ItineraryArticle = {
  link_id: number;
  itinerary_article_id: number;
};

export type ItineraryArticleInsertType = {
  id: number;
  title: string;
  start_time: Date;
  end_time: Date;
  itinerary_section_id: number;
};
export type ItinerarySectionInsertType = {
  id: number;
  date: Date;
  tod_modifier: string;
  itinerary_id: number;
};
export type ItineraryInsertType = {
  id: number;
  start_date: Date;
  end_date: Date;
  title: string;
};
