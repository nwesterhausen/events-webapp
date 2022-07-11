export type UserObject = {
  id: number;
  name: string;
  email: string;
};

export type PermissionsObject = {
  IS_ADMIN: boolean;
  MODIFY_ALL: boolean;
  VIEW_ALL: boolean;
};

export type Db_User = {
  id: number;
  name: string;
  email: string;
  googleId?: string;
  discordId?: string;
  created_at: string;
  updated_at: string;
};

export type DB_Setlist = {
  id: number;
  notes?: string;
  location?: string;
};
export type DB_SetlistSong = {
  id: number;
  name?: string;
  artist?: string;
};
export type DB_MusicType = {
  id: number;
  name?: string;
};
export type DB_GuitarTab = {
  id: number;
  url?: string;
};
export type DB_GuitarTab2Song = {
  guitar_tab_id: number;
  setlist_song_id: number;
};
export type DB_MusicLink = {
  id: number;
  url?: string;
  type: number;
};
export type DB_MusicLink2Song = {
  music_link_id: number;
  setlist_song_id: number;
};
export type DB_Song2Setlist = {
  setlist_id: number;
  setlist_song_id: number;
};

export const PERMISSION_ID = {
  VIEW_ALL: 1,
  MODIFY_ALL: 2,
  IS_ADMIN: 3,
};