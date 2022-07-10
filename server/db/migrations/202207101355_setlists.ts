import { Knex } from 'knex';
/**
 * New tables:
 *  - setlist
 *  - setlist_song
 *  - song_2_setlist
 *  - music_link
 *  - music_link_2_song
 *  - guitar_tab
 *  - guitar_tab_2_song
 *  - _music_types
 */

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('setlist_song', function (table) {
      table.increments();
      table.string('name');
      table.string('artist');
    })
    .createTable('_music_types', function (table) {
      table.increments();
      table.string('name');
    })
    .createTable('guitar_tab', function (table) {
      table.increments();
      table.string('url');
    })
    .createTable('guitar_tab_2_song', function (table) {
      table.integer('guitar_tab_id').unsigned();
      table.integer('setlist_song_id').unsigned();
      table.foreign('guitar_tab_id').references('id').inTable('guitar_tab');
      table.foreign('setlist_song_id').references('id').inTable('setlist_song');
    })
    .createTable('music_link', function (table) {
      table.increments();
      table.string('url');
      table.integer('type').unsigned();
      table.foreign('type').references('id').inTable('_music_types');
    })
    .createTable('music_link_2_song', function (table) {
      table.integer('music_link_id').unsigned();
      table.integer('setlist_song_id').unsigned();
      table.foreign('music_link_id').references('id').inTable('music_link');
      table.foreign('setlist_song_id').references('id').inTable('setlist_song');
    })
    .createTable('setlist', function (table) {
      table.increments();
      table.string('notes');
      table.string('location');
    })
    .createTable('song_2_setlist', function (table) {
      table.integer('setlist_song_id').unsigned();
      table.integer('setlist_id').unsigned();
      table.foreign('setlist_id').references('id').inTable('setlist');
      table.foreign('setlist_song_id').references('id').inTable('setlist_song');
    });
};

exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('setlist')
    .dropTable('setlist_song')
    .dropTable('song_2_setlist')
    .dropTable('music_link')
    .dropTable('music_link_2_song')
    .dropTable('guitar_tab')
    .dropTable('guitar_tab_2_song')
    .dropTable('_music_types');
};
