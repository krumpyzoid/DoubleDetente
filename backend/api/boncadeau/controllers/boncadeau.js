'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    const body = ctx.request.body
    if (body.status === 'COMPLETED') {
        const newstring = (Math.random() + 1).toString(36).substring(2,7);
        const newBonCadeau = {
            reference: newstring,
            prestation: body.prestation,
            quantity: body.quantity,
            state: 0
        }
        entity = await strapi.services.boncadeau.create(newBonCadeau);
    }
    return sanitizeEntity(entity, { model: strapi.models.boncadeau });
  },
};
