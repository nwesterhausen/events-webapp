import 'express-session';

interface PermissionsObj {
  IS_ADMIN: boolean;
  MODIFY_ALL: boolean;
  VIEW_ALL: boolean;
}

declare module 'express-session' {
  export interface SessionData {
    user: string;
    user_id: number;
    user_name: string;
    user_permissions: PermissionsObj;
  }
}
