import iteneraries from './itenerary';
import linkTypes from './link-types';
import links from './links';
import setlists from './setlist';
import songs from './songs';
import users from './users';

export default Object.assign(
  {},
  {
    Links: links,
    Songs: songs,
    Setlists: setlists,
    Iteneraries: iteneraries,
    LinkTypes: linkTypes,
    Users: users,
  }
);
