import logger from "morgan";
import express from "express";
import session from "express-session";
import sqlite from "better-sqlite3";
import sqliteStore from "better-sqlite3-session-store";
import dotenv from "dotenv";
import path from "path";

// Import our routes
import indexRouter from "./routes/index";

const app = express();

// Set up the session storage
const SqliteStore = sqliteStore(session);
const SessionDB = new sqlite("sessions.sqlite3");

// Load env variables
dotenv.config();

// Set database connection
//! TODO

// Trust proxy to show visitor IP
app.set("trust proxy", true);

// Configure the access logging
app.use(logger("combined"));

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
    secret: "simplesecret",
    saveUninitialized: false,
    resave: false,
  })
);

// Serving static files (e.g. client html, javascript, css, images) from /client
app.use(express.static(path.join(__dirname, "client", "dist")));

// Serve the API
app.use("/v1", indexRouter);

export default app;
