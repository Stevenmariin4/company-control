'use strict';
// Libraries
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';
import { databaseConnection } from './utils/database/database';
import config from './config';
import { dynamicRouter } from './routes/dynamic.router';
/**
 * This class launch the service
 */

class Server {
  public app: express.Application;
  private env: any;
  private corsOptions: Object;
  private dynamicRoutes: dynamicRouter;

  constructor() {
    this.app = express();

    // Configure Application
    this.config();

    this.dynamicRoutes = new dynamicRouter();

    // Cors Options
    this.corsOptions = {
      // credentials: true,
      methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
      origin: true,
    };
    // Configure Routes
    this.routes();

  }

  /**
   * Configure my app
   */
  private config(): void {
    dotenv.config();
    this.app.use(bodyParser.json({ limit: '2048mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '2048mb', extended: true }));
    this.app.use(cors(this.corsOptions));
    this.app.set('port', this.normalizePort(config.port || 3001));
  }

  /**
   *  Configure the routes of my app
   */
  routes(): void {
    this.app.use(`${this.dynamicRoutes.uri}`, this.dynamicRoutes.router);
  }

  private normalizePort(port: any) {
    const convertPort = typeof port === 'string' ? parseInt(port, 10) : port;
    return isNaN(convertPort) ? port : convertPort > 0 ? convertPort : false;
  }

  /**
   * Open the server in http
   */
  public initServer(isSecure: boolean = false) {
    let server: any;
      server = this.app.listen(this.app.get('port'), () => {
        console.log(`Listening on http://localhost:${this.app.get('port')}`);
        process.on('SIGINT', () => {
          console.log('Bye bye!');
          process.exit();
        });
      });
    
  }
  /**
   * start proccess connection database and initServer
   */
  public startProcess() {
    databaseConnection
      .connectDatabase()
      .then(() => {
        console.log('connection database successfull');
        this.initServer();
      })
      .catch((error) => {
        console.log('Error connection database');
      });
  }


}

const server = new Server();
server.startProcess();