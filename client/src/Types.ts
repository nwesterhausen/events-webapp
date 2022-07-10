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
