const knex = require('knex');
const configs = require('../knexfile');
const environment = 'development';

module.exports = knex(configs[environment]);