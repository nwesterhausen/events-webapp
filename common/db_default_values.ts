export const User = {
  id: 0,
  name: "",
  email: "",
  googleId: "",
  discordId: "",
  created_at: "",
  updated_at: "",
};
export const Permission = {
  id: 0,
  name: "",
  description: "",
};
export const UserPermission = {
  id: 0,
  user_id: 0,
  permission_id: 0,
};
export const Setlist = {
  id: 0,
  notes: "",
  location: "",
};
export const SetlistSong = {
  id: 0,
  name: "",
  artist: "",
};
export const LinkType = {
  id: 0,
  name: "",
};
export const Song2Setlist = {
  setlist_id: 0,
  setlist_song_id: 0,
};
export const Link = {
  id: 0,
  text: "",
  url: "",
  link_type: 4,
};
export const Link2Song = {
  link_id: 0,
  song_id: 0,
};
export const Link2ItineraryArticle = {
  link_id: 0,
  itinerary_article_id: 0,
};
export const ItineraryItem = {
  id: 0,
  text: "",
  itinerary_article_id: 0,
};
export const ItineraryArticle = {
  id: 0,
  title: "",
  start_time: "",
  end_time: "",
  itinerary_section_id: 0,
};
export const ItinerarySection = {
  id: 0,
  date: "",
  tod_modifier: "",
  itinerary_id: 0,
};
export const Itinerary = {
  id: 0,
  start_date: "",
  end_date: "",
  title: "",
};
export const Setlist2ItineraryArticle = {
  setlist_id: 0,
  itinerary_article_id: 0,
};
export const ActionLink2ItineraryArticle = {
  link_id: 0,
  itinerary_article_id: 0,
};

export const ItineraryArticleInsertType = {
  id: 0,
  title: "",
  start_time: Date.now(),
  end_time: Date.now(),
  itinerary_section_id: 0,
};
export const ItinerarySectionInsertType = {
  id: 0,
  date: Date.now(),
  tod_modifier: "",
  itinerary_id: 0,
};
export const ItineraryInsertType = {
  id: 0,
  start_date: Date.now(),
  end_date: Date.now(),
  title: "",
};
