import { Knex } from 'knex';

/**
 * New Tables:
 *  - actionlinks_2_itinerary_article
 * Modified Tables:
 *  - add URL to link
 */

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('actionlinks_2_itinerary_article', function (table) {
      table.integer('link_id').unsigned();
      table.integer('itinerary_article_id').unsigned();
      table.foreign('link_id').references('id').inTable('link');
      table.foreign('itinerary_article_id').references('id').inTable('itinerary_article');
    })
    .alterTable('link', function (table) {
      table.string('url');
    });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable('actionlinks_2_itinerary_article').alterTable('link', function (table) {
    table.dropColumn('url');
  });
};
