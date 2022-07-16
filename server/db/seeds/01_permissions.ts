import debugLib from 'debug';
import { Knex } from 'knex';
import { PermissionsRef } from '../../../common/types/shared';
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
        debug(`No existing permissions, seeding ${PermissionsRef.length}`);
        return knex('permissions').insert(PermissionsRef);
      }
      debug(`Some permissions exist, inserting any that are missing`);
      const existingIds = rows.map((v) => {
        return v.id;
      });
      const MissingPermissions: { id: number; name: string; description: string }[] = [];
      for (const permission of PermissionsRef) {
        if (existingIds.indexOf(permission.id) === -1) {
          debug(`Missing ${permission.name} permission, queueing.`);
          MissingPermissions.push(permission);
        }
      }
      if (MissingPermissions.length > 0) {
        return knex('permissions').insert(MissingPermissions);
      }
    });
};
