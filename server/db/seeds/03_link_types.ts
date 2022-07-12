import { Knex } from 'knex';
import debugLib from 'debug';
const debug = debugLib('eventsapp:database-seed');

const NewLinkTypes: string[] = ['Navigation', 'Youtube', 'Spotify', 'Ultimate Guitar', 'Generic', 'No Icon', 'Music'];

exports.seed = function (knex: Knex) {
  return knex
    .select()
    .from('_link_types')
    .then(function (rows) {
      if (rows.length === 0) {
        debug(`No existing link types, seeding ${NewLinkTypes.length}`);
        return knex('_link_types').insert(
          NewLinkTypes.map((v) => {
            return { name: v };
          })
        );
      } else {
        let LastId = rows.slice(-1)[0].id + 1;
        const ExistingTypes = rows.map((v) => {
          return v.name;
        });
        const MissingTypes: string[] = [];
        for (const typeName of NewLinkTypes) {
          if (ExistingTypes.indexOf(typeName) === -1) {
            MissingTypes.push(typeName);
          }
        }
        if (MissingTypes.length > 0) {
          debug(`Inserting ${MissingTypes.length} new link types`);
          return knex('_link_types').insert(
            MissingTypes.map((v) => {
              return { name: v, id: LastId++ };
            })
          );
        }
      }
    });
};
