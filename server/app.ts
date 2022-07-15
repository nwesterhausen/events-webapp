import sqlite from 'better-sqlite3';
import sqliteStore from 'better-sqlite3-session-store';
import debugLib from 'debug';
import dotenv from 'dotenv';
import express, { ErrorRequestHandler } from 'express';
import proxy from 'express-http-proxy';
import session from 'express-session';
import logger from 'morgan';

// Load env variables
dotenv.config();
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './dev.env', override: true });
}

// Import database code
import { connectDatabase } from './db';

// Import our routes
import { checkAdminAccess, checkViewAccess } from './lib/authorization';
import adminRouter from './routes/admin';
import apiv1Router from './routes/api-v1';
import authRouter from './routes/auth';
import { CreateMagicLinkAuthRouter } from './routes/auth-magic-login';
import { CreateDiscordOauthRouter } from './routes/oauth-discord';
import { CreateGoogleOauthRouter } from './routes/oauth-google';

const debug = debugLib('eventsapp:app');

// Create the express app
const app = express();

// Set up the session storage
const SqliteStore = sqliteStore(session);
const SessionDB = new sqlite('sessions.sqlite3');

// Set database connection
const knex = connectDatabase();
app.set('db', knex);

// Trust proxy to show visitor IP
app.set('trust proxy', true);

// Automatically handle incoming JSON payloads
app.use(express.json());

// Attach the local DB for session storage
app.use(
  session({
    store: new SqliteStore({
      client: SessionDB,
      expired: {
        clear: true,
        intervalMs: 15 * 60 * 1000, //ms
      },
    }),
    secret: 'simplesecret',
    saveUninitialized: false,
    resave: false,
  })
);

// Authorization (login) routes
app.use('/auth', authRouter);
app.use('/auth', CreateGoogleOauthRouter(knex));
app.use('/auth', CreateDiscordOauthRouter(knex));
app.use('/auth', CreateMagicLinkAuthRouter(knex));

// Administration route
app.use('/admin', checkAdminAccess, adminRouter);

// Serve the API
app.use('/v1', checkViewAccess, apiv1Router);

if (process.env.NODE_ENV === 'development') {
  debug('Running in development mode');
  // Configure the access logging to be shorter
  // app.use(logger('dev'));

  // Forward "static files" to the vite dev server on 3001
  app.use('/', proxy('http://localhost:3000'));
} else {
  // Configure the access logging to be longform
  app.use(logger('combined'));

  // Serving static files (e.g. client html, javascript, css, images) from /client
  const staticFiles = 'build/client';
  debug(`Serving static files from ${staticFiles}`);
  app.use(express.static(staticFiles));
}

// Error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json(err);
};
app.use(errorHandler);

// Exit on SIGTERM
process.on('SIGTERM', () => {
  process.exit();
});

export default app;
