import debugLib from 'debug';
import path from 'path';
import Knexdb, { Knex } from 'knex';

const debug = debugLib('eventsapp:database');

export function connectDatabase() {
  const config = buildConnectionFromEnvironment();
  debug(`Loaded config for client: ${config.client}`);
  const db = Knexdb(config);
  db.migrate
    .latest({
      directory: `${__dirname}/migrations`,
    })
    .then(() => {
      debug('Completed migration to latest schema');
      return db.seed.run({
        directory: `${__dirname}/seeds`,
      });
    })
    .then(function () {
      debug('Completed seeding of database');
    })
    .catch((err) => {
      debug('Error migrating database!');
      console.error(err);
    });
  return db;
}

type ParsedEnvConfigOptions = {
  DB_DEBUG: boolean;
  KNEX_CLIENT: string;
  DB_CONNECTION_STRING?: string;
  DB_HOST?: string;
  DB_PORT?: number;
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_DATABASE?: string;
  DB_VERSION?: string;
  DB_SSL_ALLOW_UNAUTHORIZED?: boolean;
  DB_FILENAME?: string;
  DB_SSL_CERT_FILENAME?: string;
  DATA_PATH: string;
  DB_FILEPATH: string;
  DB_SSL_CERT_FILEPATH: string;
};

/**
 * Builds a Knex.js configuration object using variables in the environment. In app.js, we invoke
 * `require('dotenv').config()` to load any '.env' files (see sample.env). If there is no client
 * configured in the environment, this will return a configuration to connect to a sqlite database.
 *
 * @returns Knex.js configuration object.
 */
function buildConnectionFromEnvironment(): Knex.Config {
  const myenv = parseEnvironment();
  if (/sqlite/.test(myenv.KNEX_CLIENT)) {
    // If we're using a sqlite driver, then we need to use some specific settings
    return {
      client: myenv.KNEX_CLIENT,
      connection: {
        filename: myenv.DB_FILEPATH,
      },
      // Knex sqlite3 doesn't support default values, so we set this flag
      useNullAsDefault: true,
    };
  }
  // Build the basic connection options object
  let connectionOptions: Knex.Config = {
    client: myenv.KNEX_CLIENT,
  };
  // Pass on the debug option
  if (myenv.DB_DEBUG) {
    connectionOptions.debug = true;
  }
  // Set the connection information. Some databases use a connection string instead of defining each detail
  // about the connection separately.
  if (myenv.DB_CONNECTION_STRING) {
    connectionOptions.connection = {
      connectionString: myenv.DB_CONNECTION_STRING,
    };
  } else {
    // Make sure we have all the details for the connection before setting it up.
    if (!!myenv.DB_HOST && !!myenv.DB_PORT && !!myenv.DB_USER && !!myenv.DB_PASSWORD && !!myenv.DB_DATABASE) {
      connectionOptions.connection = {
        host: myenv.DB_HOST,
        port: myenv.DB_PORT,
        user: myenv.DB_USER,
        password: myenv.DB_PASSWORD,
        database: myenv.DB_DATABASE,
      };
    } else {
      // If we're missing part of the required information, log a message but default to the sqlite connection.
      debug('Missing an expected value for the database configuration, check enivronment');
      let error = new Error('invalid database configuration' + JSON.stringify(myenv));
      throw error;
    }
  }
  // Set a version number for non-standard database connections
  if (myenv.DB_VERSION) {
    connectionOptions.version = myenv.DB_VERSION;
  }

  if (!connectionOptions.connection.ssl) {
    connectionOptions.connection.ssl = {};
  }
  // Set SSL configuration if not using a certificate trusted by the store of the
  // machine running this program.
  if (myenv.DB_SSL_ALLOW_UNAUTHORIZED) {
    (connectionOptions.connection.ssl as Knex.MariaSslConfiguration).rejectUnauthorized = false;
  }
  if (myenv.DB_SSL_CERT_FILEPATH) {
    (connectionOptions.connection.ssl as Knex.MariaSslConfiguration).ca = require('fs').readFileSync(myenv.DB_SSL_CERT_FILEPATH);
  }

  return connectionOptions;
}

/**
 * Parse the environment and gather any relevant database configuration.
 * @returns object with environment settings relevant to database connection
 */
function parseEnvironment(): ParsedEnvConfigOptions {
  const envOptions: ParsedEnvConfigOptions = {
    DB_DEBUG: false,
    KNEX_CLIENT: 'better-sqlite3',
    DB_FILENAME: 'db.sqlite3',
    DATA_PATH: './',
    DB_FILEPATH: '',
    DB_SSL_CERT_FILEPATH: '',
  };

  if (process.env.NODE_ENV === 'development') {
    envOptions.DB_FILENAME = 'dev-db.sqlite3';
  }

  if (process.env.DB_DEBUG && process.env.DB_DEBUG === 'true') {
    envOptions.DB_DEBUG = true;
  }

  if (process.env.KNEX_CLIENT) {
    if (process.env.KNEX_CLIENT === 'sqlite3') {
      envOptions.KNEX_CLIENT = 'better-sqlite3';
    } else {
      envOptions.KNEX_CLIENT = process.env.KNEX_CLIENT;
    }
    // Test that the KNEX_CLIENT is installed
    try {
      let test = require(envOptions.KNEX_CLIENT);
      test = require(`${envOptions.KNEX_CLIENT}/package.json`).version;
      debug(`Set database client to ${envOptions.KNEX_CLIENT} ${test}`);
    } catch (err) {
      debug(`Failure to load the KNEX_CLIENT specified by environment (is it installed?): ${envOptions.KNEX_CLIENT}`);
      // envOptions.KNEX_CLIENT = "better-sqlite3"; // set back to default
      // Instead of falling back, we want the process to end.
      process.exit(5);
    }
  }
  // Database connection string
  if (process.env.DB_CONNECTION_STRING && process.env.DB_CONNECTION_STRING !== 'none') {
    envOptions.DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
  }
  // Broken out database connection settings
  if (process.env.DB_HOST) {
    envOptions.DB_HOST = process.env.DB_HOST;
  }
  if (process.env.DB_PORT) {
    envOptions.DB_PORT = parseInt(process.env.DB_PORT);
  }
  if (process.env.DB_USER) {
    envOptions.DB_USER = process.env.DB_USER;
  }
  if (process.env.DB_PASSWORD) {
    envOptions.DB_PASSWORD = process.env.DB_PASSWORD;
  }
  if (process.env.DB_DATABASE) {
    envOptions.DB_DATABASE = process.env.DB_DATABASE;
  }
  if (process.env.DB_DATABASE) {
    envOptions.DB_DATABASE = process.env.DB_DATABASE;
  }
  // DB Version used on some database clients
  if (process.env.DB_VERSION && process.env.DB_VERSION !== 'none') {
    envOptions.DB_VERSION = process.env.DB_VERSION;
  }
  // SSL connection setting
  if (process.env.DB_SSL_ALLOW_UNAUTHORIZED) {
    envOptions.DB_SSL_ALLOW_UNAUTHORIZED = process.env.DB_SSL_ALLOW_UNAUTHORIZED === 'true';
  }
  // File storage
  if (process.env.DATA_PATH) {
    envOptions.DATA_PATH = process.env.DATA_PATH;
  }
  // File storage (file names)
  if (process.env.DB_FILENAME) {
    envOptions.DB_FILENAME = process.env.DB_FILENAME;
  }
  if (process.env.DB_SSL_CERT_FILENAME) {
    envOptions.DB_SSL_CERT_FILENAME = process.env.DB_SSL_CERT_FILENAME;
  }
  // Set final path values
  envOptions.DB_FILEPATH = path.join(envOptions.DATA_PATH, envOptions.DB_FILENAME || '');
  envOptions.DB_SSL_CERT_FILEPATH = path.join(envOptions.DATA_PATH, envOptions.DB_SSL_CERT_FILENAME || '');

  return envOptions;
}
