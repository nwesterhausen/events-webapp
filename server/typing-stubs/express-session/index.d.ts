import 'express-session';
import { PermissionsObj } from '../../../common/types/shared';

declare module 'express-session' {
  export interface SessionData {
    user: string;
    user_id: number;
    user_name: string;
    user_permissions: PermissionsObj;
  }
}
