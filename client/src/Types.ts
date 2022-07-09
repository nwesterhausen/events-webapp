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
