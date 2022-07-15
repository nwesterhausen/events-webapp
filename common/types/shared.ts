export type PermissionsObj = {
  IS_ADMIN: boolean;
  MODIFY_ALL: boolean;
  VIEW_ALL: boolean;
};

export const PERMISSION_ID = {
  VIEW_ALL: 1,
  MODIFY_ALL: 2,
  IS_ADMIN: 3,
};

export const LinkTypes = ['Navigation', 'Youtube', 'Spotify', 'Ultimate Guitar', 'Generic', 'No Icon', 'Music'] as const;
