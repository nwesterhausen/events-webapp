import { Knex } from 'knex';

/**
 * New Tables:
 *  - setlist_2_itenerary_article
 */

exports.up = function (knex: Knex) {
  return knex.schema.createTable('setlist_2_itenerary_article', function (table) {
    table.integer('setlist_id').unsigned();
    table.integer('itenerary_article_id').unsigned();
    table.foreign('setlist_id').references('id').inTable('setlist');
    table.foreign('itenerary_article_id').references('id').inTable('itenerary_article');
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable('setlist_2_itenerary_article');
};
