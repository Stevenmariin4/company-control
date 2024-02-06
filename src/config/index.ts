'use strict';

// Libraries
import * as dotenv from 'dotenv';

// Enable configuration of dotenv
dotenv.config();

/**
 * Configuration of environment for server
 */
const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  routePFX: process.env.ROUTE_PFX,
  sslKey: process.env.SSL_KEY,

  baseUrlMeli: process.env.URLMELI,

  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUserName: process.env.DB_USER_NAME,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbIsCloud: process.env.DB_IS_ClOUD,
};

export default config;