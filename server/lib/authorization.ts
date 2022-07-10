import debugLib from 'debug';
import { RequestHandler } from 'express';
import { Knex } from 'knex';
import { buildPermissionReference } from './session';

const debug = debugLib('eventsapp:auth-util');

/**
 * Middleware that verifies that a user is logged into the session
 */
export const checkAuthorization: RequestHandler = (req, res, next) => {
  if (req.session.user) {
    next(); //If session exists, proceed to page
  } else {
    debug(`checkAuthorization: ${req.ips} unauthorized request to ${req.originalUrl}`);
    //Error, trying to access unauthorized page! Please login!
    res.redirect('/');
  }
};

/**
 * Middleware that verifies that a user has view access
 */
export const checkViewAccess: RequestHandler = (req, res, next) => {
  if (!req.session.user_id) {
    debug(`checkViewAccess: ${req.ips} unauthorized request to ${req.originalUrl}`);
    //Error, trying to access unauthorized page! Please login!
    res.statusMessage = 'Please login again.';
    return res.status(403).end();
  }
  new Promise(async (r, j) => {
    const knex = req.app.get('db') as Knex;
    const permissions = await knex('user_permissions').select().where({
      user_id: req.session.user_id,
    });
    const perms = buildPermissionReference(permissions);
    if (perms.VIEW_ALL) {
      return r(next());
    }
    debug(`checkViewAccess: ${req.ips} unauthorized request to ${req.originalUrl}`);
    debug(`checkViewAccess: silent redirect to "/"`);
    // Error, trying to access unauthrozied page!
    res.statusMessage = 'View permissions required';
    res.status(403).end();
  }).catch(console.error);
};

/**
 * Middleware that verifies that a user is an admin
 */
export const checkAdminAccess: RequestHandler = (req, res, next) => {
  if (!req.session.user_id) {
    debug(`checkAdminAccess: ${req.ips} unauthorized request to ${req.originalUrl}`);
    //Error, trying to access unauthorized page! Please login!
    res.statusMessage = 'Please login again.';
    return res.status(403).end();
  }
  new Promise(async (r, j) => {
    const knex = req.app.get('db') as Knex;
    const permissions = await knex('user_permissions').select().where({
      user_id: req.session.user_id,
    });
    const perms = buildPermissionReference(permissions);
    if (perms.IS_ADMIN) {
      return r(next());
    }
    debug(`checkAdminAccess: ${req.ips} unauthorized request to ${req.originalUrl}`);
    debug(`checkAdminAccess: silent redirect to "/"`);
    // Error, trying to access unauthrozied page!
    res.statusMessage = 'Admin permissions required';
    res.status(403).end();
  }).catch(console.error);
};
