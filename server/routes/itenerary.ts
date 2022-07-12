import debugLib from 'debug';
import { RequestHandler } from 'express';
import { Knex } from 'knex';
import queries from '../db/queries';
const debug = debugLib('eventsapp:itenerary');

export const getIteneraries: RequestHandler = (req, res) => {
  new Promise(async (resolve, reject) => {
    const knex = req.app.get('db') as Knex;
    const iteneraries = await queries.Iteneraries.all(knex);
    return resolve(
      res.send({
        data: iteneraries,
      })
    );
  }).catch(console.error);
};

export const getItenerariesHead: RequestHandler = (req, res) => {
  new Promise(async (resolve, reject) => {
    const knex = req.app.get('db') as Knex;
    const iteneraries = await queries.Iteneraries.head(knex);
    return resolve(
      res.send({
        data: iteneraries,
      })
    );
  }).catch(console.error);
};

export const getIteneraryById: RequestHandler = (req, res) => {
  if (!req.params.id || req.params.id === null) {
    const message = 'Require itenerary ID to get';
    debug(`Rejecting itenerary get (no id)`);
    return res.status(400).send({
      error: message,
      original_data: req.params,
    });
  }
  const targetId = parseInt(req.params.id);
  new Promise(async (resolve, reject) => {
    const knex = req.app.get('db') as Knex;
    const iteneraries = await queries.Iteneraries.byId(knex, targetId);
    return resolve(
      res.send({
        data: iteneraries,
        original_data: req.params,
      })
    );
  }).catch(console.error);
};
