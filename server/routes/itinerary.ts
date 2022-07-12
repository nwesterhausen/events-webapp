import debugLib from 'debug';
import { RequestHandler } from 'express';
import { Knex } from 'knex';
import queries from '../db/queries';
const debug = debugLib('eventsapp:itinerary');

export const getItineraries: RequestHandler = (req, res) => {
  new Promise(async (resolve, reject) => {
    const knex = req.app.get('db') as Knex;
    const itineraries = await queries.Itineraries.all(knex);
    return resolve(
      res.send({
        data: itineraries,
      })
    );
  }).catch(console.error);
};

export const getItinerariesHead: RequestHandler = (req, res) => {
  new Promise(async (resolve, reject) => {
    const knex = req.app.get('db') as Knex;
    const itineraries = await queries.Itineraries.head(knex);
    return resolve(
      res.send({
        data: itineraries,
      })
    );
  }).catch(console.error);
};

export const getItineraryById: RequestHandler = (req, res) => {
  if (!req.params.id || req.params.id === null) {
    const message = 'Require itinerary ID to get';
    debug(`Rejecting itinerary get (no id)`);
    return res.status(400).send({
      error: message,
      original_data: req.params,
    });
  }
  const targetId = parseInt(req.params.id);
  new Promise(async (resolve, reject) => {
    const knex = req.app.get('db') as Knex;
    const itineraries = await queries.Itineraries.byId(knex, targetId);
    return resolve(
      res.send({
        data: itineraries,
        original_data: req.params,
      })
    );
  }).catch(console.error);
};
