const Hapi = require('hapi');
const config = require('config');
const inert = require('inert');
const vision = require('vision');
const mongoose = require('mongoose');
const mongoload = require('mongoload');
const routes = require('hapi-auto-routes');
const hapiSwagger = require('hapi-swagger');
const logger = require('./util/logger');

const Pack = require('./package');

// Mongo DB Config -----------------------------------------

mongoose.Promise = global.Promise;
mongoose.connect(config.database.uri);

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

const db = mongoose.connection;

mongoload.bind(mongoose).load({
  pattern: `${__dirname}/models/*.js`,
});

db.on('error', () => {
  logger.error('Connection to db failed!', {});
  process.exit(0);
});

db.on('disconnected', (err) => {
  logger.error('Connection teminated to db', err);
  process.exit(0);
});

// ---------------------------------------------------------

const server = Hapi.server({
  port: config.server.port,
  routes: {
    cors: true
  }
});

async function startServer() {
  // define required hapi plugins
  const requiredHapiPlugins = [
    inert,
    vision,
    // hapi swagger config
    {
      plugin: hapiSwagger,
      options: {
        info: {
          title: 'API Documentation',
          version: Pack.version
        },
        documentationPath: '/api/documentation',
        host: config.server.hostname
      }
    },
  ];

  // register plugins
  const registerPlugins = async () => {
    try {
      // register hapi plugins
      await server.register(requiredHapiPlugins);

      // bind routes in routes folder
      try {
        routes.bind(server).register({
          pattern: `${__dirname}/routes/**/*.js`
        });
      } catch (error) {
        logger.error('Exception while loading Routes', error);
        throw error;
      }

      try {
        await server.start();
        logger.info(`Server started... at: ${server.info.uri}`);
      } catch (error) {
        logger.error(error, 'Failed to start server');
        throw error;
      }
    } catch (error) {
      logger.error(error, 'Failed to register hapi plugins');
      throw error;
    }
  };

  registerPlugins();
}

db.on('connected', () => {
  logger.info('Connected to mongodb');
  startServer();
});

// export modules
module.exports = server;
