declare module 'better-sqlite3-session-store' {
  import { Store, SessionData } from 'express-session';

  export interface SqliteStore extends Store {
    get(sid: string, callback: (err: any, session?: SessionData | null) => void): void;
    set(sid: string, session: SessionData, callback?: (err?: any) => void): void;
    destroy(sid: string, callback?: (err?: any) => void): void;

    startInterval(): void;
    clearExpiredSessions(): void;
    createDb(): void;
  }

  type Constructor<T = {}> = new (...args: any[]) => T;

  function createSqliteStore(session: { Store: typeof Store }): Constructor<SqliteStore>;

  export default createSqliteStore;
}
