import { Knex } from 'knex';

/**
 * Database migration 00
 * The initialization step, which creates the database and the migration version table.
 *
 */

exports.up = function (knex: Knex) {
  return (
    knex.schema
      /**
       * We need the following tables to handle authentication:
       *  'user' - contains logged in user information, email and name
       *  'passwords' - contains hashed passwords for users
       *  'permission' - contains a list of valid permissions, this is to enable admin vs managed user
       *  'user_permissions' - this maps users to permissions, to tell us what permissions a user has.
       */
      .createTable('users', function (table) {
        table.increments();
        table.string('name');
        table.string('email');
        table.string('googleId');
        table.string('discordId');
        table.timestamps(true, true);
      })
      .createTable('user_permissions', function (table) {
        table.increments();
        table.integer('user_id').unsigned();
        table.integer('permission_id').unsigned();
      })
      .createTable('permissions', function (table) {
        table.increments();
        table.string('name');
        table.string('description');
      })
  );
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable('users').dropTable('permissions').dropTable('user_permissions');
};
