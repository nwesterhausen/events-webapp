import itineraries from './itinerary';
import itineraryArticles from './itinerary-article';
import itineraryItems from './itinerary-item';
import itinerarySections from './itinerary-section';
import linkTypes from './link-types';
import links from './links';
import setlists from './setlist';
import songs from './songs';
import userPermissions from './user-permissions';
import users from './users';

export default Object.assign(
  {},
  {
    Itineraries: itineraries,
    ItineraryArticles: itinerarySections,
    ItinerarySections: itineraryArticles,
    ItineraryItems: itineraryItems,
    Links: links,
    LinkTypes: linkTypes,
    UserPermissions: userPermissions,
    Setlists: setlists,
    Songs: songs,
    Users: users,
  }
);
