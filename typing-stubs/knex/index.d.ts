import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface User {
    id: number;
    name: string;
    email: string;
    googleId: string;
    discordId: string;
    created_at: string;
    updated_at: string;
  }
  interface Permission {
    id: number;
    name: string;
    description: string;
  }
  interface UserPermission {
    id: number;
    user_id: number;
    permission_id: number;
  }
  interface Setlist {
    id: number;
    notes: string;
    location: string;
  }
  interface SetlistSong {
    id: number;
    name: string;
    artist: string;
  }
  interface LinkType {
    id: number;
    name: string;
  }
  interface Song2Setlist {
    setlist_id: number;
    setlist_song_id: number;
  }
  interface Link {
    id: number;
    text?: string;
    link_type: number;
  }
  interface Link2Song {
    link_id: number;
    song_id: number;
  }
  interface Link2IteneraryItem {
    link_id: number;
    itenerary_item_id: number;
  }
  interface ItenereryItem {
    id: number;
    text: string;
    itenerary_article_id: number;
  }
  interface ItenearyArticle {
    id: number;
    title: string;
    time_span: string;
    itenerary_section_id: number;
  }
  interface ItenerarySection {
    id: number;
    date: string;
    tod_modifier: string;
    itenerary_id: number;
  }
  interface Itenerary {
    id: number;
    start_date: string;
    end_date: string;
    title: string;
  }
  interface Tables {
    // This is same as specifying `knex<User>('users')`
    users: User;
    // For more advanced types, you can specify separate type
    // for base model, "insert" type and "update" type.
    // But first: notice that if you choose to use this,
    // the basic typing showed above can be ignored.
    // So, this is like specifying
    //    knex
    //    .insert<{ name: string }>({ name: 'name' })
    //    .into<{ name: string, id: number }>('users')
    users_composite: Knex.CompositeTableType<
      // This interface will be used for return type and
      // `where`, `having` etc where full type is required
      User,
      // Specifying "insert" type will also make sure
      // data matches interface in full. Meaning
      // if interface is `{ a: string, b: string }`,
      // `insert({ a: '' })` will complain about missing fields.
      //
      // For example, this will require only "name" field when inserting
      // and make created_at and updated_at optional.
      // And "id" can't be provided at all.
      // Defaults to "base" type.
      Pick<User, 'name' & 'email'> & Pick<User, 'discordId' | 'googleId'> & Partial<Pick<User, 'created_at' | 'updated_at'>>,
      // This interface is used for "update()" calls.
      // As opposed to regular specifying interface only once,
      // when specifying separate update interface, user will be
      // required to match it  exactly. So it's recommended to
      // provide partial interfaces for "update". Unless you want to always
      // require some field (e.g., `Partial<User> & { updated_at: string }`
      // will allow updating any field for User but require updated_at to be
      // always provided as well.
      //
      // For example, this wil allow updating all fields except "id".
      // "id" will still be usable for `where` clauses so
      //      knex('users_composite')
      //      .update({ name: 'name2' })
      //      .where('id', 10)`
      // will still work.
      // Defaults to Partial "insert" type
      Partial<Omit<User, 'id'>>
    >;

    user_permissions: UserPermission;
    link_type: LinkType;
    song_2_setlist: Song2Setlist;
    setlist_song: SetlistSong;
    setlist: Setlist;
    itenerary: Itenerary;
    itenerary_section: ItenerarySection;
    itenerary_article: ItenearyArticle;
    itenerary_item: ItenereryItem;
    link: Link;
    link_2_song: Link2Song;
    link_2_itenerary_item: Link2IteneraryItem;
  }
}
