import debugLib from 'debug';
import { RequestHandler } from 'express';
import { Knex } from 'knex';
import Query from '../db/queries';

const debug = debugLib('eventsapp:setlists');

export const getSetlistById: RequestHandler = (req, res) => {
  if (req.params.id) {
    const targetId = parseInt(req.params.id);
    if (targetId === NaN || targetId <= 0) {
      const message = `Unable to lookup setlist with ID:${targetId}`;
      debug(message);
      return res.status(400).send({
        error: message,
        raw_request: req.params.id,
      });
    }
    Query.Setlists.byId(req.app.get('db'), targetId)
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch(console.error);
  }
};

export const getSetlist: RequestHandler = (req, res) => {
  Query.Setlists.all(req.app.get('db'))
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err });
    });
};

export const postSetlist: RequestHandler = (req, res) => {
  const setlist_location = req.body.location || '';
  const setlist_notes = req.body.notes || '';
  (req.app.get('db') as Knex)('setlist')
    .insert({
      notes: setlist_notes,
      location: setlist_location,
    })
    .then((res1) => {
      debug(`Created setlist ${res1}`);
      res.status(201).send({ created: res1 });
    })
    .catch((err) => {
      debug(`Encountered error inserting ${JSON.stringify(req.body)}`);
      console.error(err);
      res.status(500).send({ error: err, original_data: req.body });
    });
};

export const deleteSetlist: RequestHandler = (req, res) => {
  if (!req.body.id || req.body.id === null) {
    const message = 'Require setlist ID to delete';
    debug(`Rejecting deletion of setlist (no id)`);
    return res.status(400).send({
      error: message,
      original_data: req.body,
    });
  }
  const targetId = parseInt(req.body.id);
  if (targetId === NaN || targetId <= 0) {
    const message = `Unable to lookup setlist with ID:${targetId}`;
    debug(message);
    return res.status(400).send({
      error: message,
      raw_request: req.params.id,
    });
  }
  (req.app.get('db') as Knex)('setlist')
    .where({
      id: targetId,
    })
    .del()
    .then((res1) => {
      debug(`Deleted setlist ${res1}`);
      res.status(200).send({ deleted: res1 });
    })
    .catch((err) => {
      debug(`Encountered error deleting ${JSON.stringify(req.body)}`);
      console.error(err);
      res.status(500).send({ error: err, original_data: req.body });
    });
};
