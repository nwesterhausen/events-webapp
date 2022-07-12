import debugLib from 'debug';
import { RequestHandler } from 'express';
import { Knex } from 'knex';
import { ItenerarySection } from 'knex/types/tables';

const debug = debugLib('eventsapp:itenerary');

export const getIteneraries: RequestHandler = (req, res) => {
  new Promise(async (resolve, reject) => {
    const knex = req.app.get('db') as Knex;
  }).catch(console.error);
};
