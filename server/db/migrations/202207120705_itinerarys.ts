import { Knex } from 'knex';
/**
 * New tables:
 *  - itinerary
 *  - itinerary_section
 *  - itinerary_article
 *  - itinerary_item
 *  - link_item
 *  - link_2_song
 *  - link_2_itinerary_item
 * Renamed tables:
 *  - _music_types => _link_types
 * Removed tables:
 *  - music_link
 *  - music_link_2_song
 *  - guitar_tab
 *  - guitar_tab_2_song
 */

exports.up = function (knex: Knex) {
  return (
    knex.schema
      // Remove superceded tables
      .dropTable('music_link_2_song')
      .dropTable('guitar_tab_2_song')
      .dropTable('music_link')
      .dropTable('guitar_tab')
      // Create new tables
      .createTable('itinerary', function (table) {
        table.increments();
        table.date('start_date');
        table.date('end_date');
        table.string('title');
      })
      .createTable('itinerary_section', function (table) {
        table.increments();
        table.date('date');
        table.string('tod_modifier');
        table.integer('itinerary_id').unsigned();
        table.foreign('itinerary_id').references('id').inTable('itinerary');
      })
      .createTable('itinerary_article', function (table) {
        table.increments();
        table.string('title');
        table.time('start_time');
        table.time('end_time');
        table.integer('itinerary_section_id').unsigned();
        table.foreign('itinerary_section_id').references('id').inTable('itinerary_section');
      })
      .createTable('itinerary_item', function (table) {
        table.increments();
        table.string('text');
        table.integer('itinerary_article_id').unsigned();
        table.foreign('itinerary_article_id').references('id').inTable('itinerary_article');
      })
      .createTable('link', function (table) {
        table.increments();
        table.string('text').nullable();
        table.integer('link_type').unsigned();
        table.foreign('link_type').references('id').inTable('_music_types');
      })
      .createTable('link_2_song', function (table) {
        table.integer('link_id').unsigned();
        table.integer('setlist_song_id').unsigned();
        table.foreign('link_id').references('id').inTable('link');
        table.foreign('setlist_song_id').references('id').inTable('setlist_song');
      })
      .createTable('link_2_itinerary_article', function (table) {
        table.integer('link_id').unsigned();
        table.integer('itinerary_article_id').unsigned();
        table.foreign('link_id').references('id').inTable('link');
        table.foreign('itinerary_article_id').references('id').inTable('itinerary_article');
      })
      // Rename music_types
      .renameTable('_music_types', '_link_types')
  );
};

exports.down = function (knex: Knex) {
  return (
    knex.schema
      .dropTable('itinerary')
      .dropTable('itinerary_section')
      .dropTable('itinerary_article')
      .dropTable('itinerary_item')
      .dropTable('link')
      .dropTable('link_2_song')
      .dropTable('link_2_itinerary_item')
      // Restore removed tables
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
      // Rename music_types
      .renameTable('_link_types', '_music_types')
  );
};
