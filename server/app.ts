import logger from 'morgan';
import express from 'express';
import session from 'express-session';
import sqlite from 'better-sqlite3';
import sqliteStore from 'better-sqlite3-session-store';
import dotenv from 'dotenv';
import debugLib from 'debug';
import proxy from 'express-http-proxy';

// Import our routes
import indexRouter from './routes/index';

const debug = debugLib('eventsapp:app');

// Create the express app
const app = express();

// Set up the session storage
const SqliteStore = sqliteStore(session);
const SessionDB = new sqlite('sessions.sqlite3');

// Load env variables
dotenv.config();

// Set database connection
//! TODO

// Trust proxy to show visitor IP
app.set('trust proxy', true);

if (process.env.NODE_ENV === 'development') {
  debug('Running in development mode');
  // Configure the access logging to be shorter
  app.use(logger('dev'));

  // Forward "static files" to the vite dev server on 3001
  app.use('/', proxy('http://localhost:3000'));
} else {
  // Configure the access logging to be longform
  app.use(logger('combined'));

  // Serving static files (e.g. client html, javascript, css, images) from /client
  const staticFiles = 'client/dist';
  debug(`Serving static files from ${staticFiles}`);
  app.use(express.static(staticFiles));
}

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

// Serve the API
app.use('/v1', indexRouter);

export default app;
