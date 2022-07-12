import { Knex } from 'knex';

/**
 * New Tables:
 *  - setlist_2_itinerary_article
 */

exports.up = function (knex: Knex) {
  return knex.schema.createTable('setlist_2_itinerary_article', function (table) {
    table.integer('setlist_id').unsigned();
    table.integer('itinerary_article_id').unsigned();
    table.foreign('setlist_id').references('id').inTable('setlist');
    table.foreign('itinerary_article_id').references('id').inTable('itinerary_article');
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable('setlist_2_itinerary_article');
};
