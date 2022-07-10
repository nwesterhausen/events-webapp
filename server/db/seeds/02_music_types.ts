import { Knex } from 'knex';

exports.seed = function (knex: Knex) {
  return knex
    .select('id')
    .from('_music_types')
    .then(function (rows) {
      if (rows.length === 0) {
        return knex('_music_types').insert([
          {
            id: 1,
            name: 'Spotify',
          },
          {
            id: 2,
            name: 'Youtube',
          },
          {
            id: 3,
            name: 'Spotify - Live',
          },
          {
            id: 4,
            name: 'Youtube - Live',
          },
        ]);
      }
    });
};
