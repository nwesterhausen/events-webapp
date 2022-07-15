/**
 * This file can be run with node to make a user admin in the sqlite database (testing database)
 */

const user_id = 1; // Typcially first user created
const permission_id = 3; // ADMIN permissions
const database_filename = 'dev-db.sqlite3'; // name of database (dev)
//const database_filename = "db.sqlite3"; // name of database (prod)

const db = require('better-sqlite3')(database_filename, {
  fileMustExist: true,
});

const row = db.prepare(`INSERT INTO user_permissions (user_id, permission_id) values (${user_id}, ${permission_id})`).run();
console.dir(row);
