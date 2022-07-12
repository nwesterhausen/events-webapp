import { Knex } from 'knex';
import debugLib from 'debug';
const debug = debugLib('eventsapp:database-seed');

/**
 * This file seeds the various permissions expected for the site permissions to work.
 * First it selects all permissions from the database. If there are none in the database,
 * it will insert these 5.
 */

exports.seed = function (knex: Knex) {
  return knex
    .select('id')
    .from('permissions')
    .then(function (rows) {
      if (rows.length === 0) {
        debug(`No existing permissions, seeding 3`);
        return knex('permissions').insert([
          {
            id: 1,
            name: 'View All',
            description: 'Allowed to view details for everything except the user list.',
          },
          {
            id: 2,
            name: 'Modify All',
            description: 'Allowed edit to everything except a user list and site settings.',
          },
          {
            id: 3,
            name: 'Admin',
            description: 'Full access to all tables and site settings.',
          },
        ]);
      }
    });
};
