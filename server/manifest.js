'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    debug: {
      $filter: 'NODE_ENV',
      development: {
        log: ['error', 'implementation', 'internal'],
        request: ['error', 'implementation', 'internal']
      }
    },
    routes: {
      cors: {
        $filter: 'NODE_ENV',
        development: true
      },
    }
  },
  register: {
    plugins: [
      {
        plugin: '../lib', // Main plugin
        options: {}
      },
      {
        plugin: './plugins/swagger',
      },
      {
        plugin: 'schwifty',
        options: {
          $filter: 'NODE_ENV',
          $default: {},
          $base: {
            migrateOnStart: true,
            knex: {
              client: 'sqlite3',
              useNullAsDefault: true,         // Suggested for sqlite3
              pool: {
                idleTimeoutMillis: Infinity // Handles knex v0.12/0.13 misconfiguration when using sqlite3 (tgriesser/knex#1701)
              },
              connection: {
                filename: ':memory:'
              }
            }
          },
          production: {
            migrateOnStart: false
          }
        }
      }
    ]
  }
});
