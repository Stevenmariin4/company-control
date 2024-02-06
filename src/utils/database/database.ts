import mongoose, { Mongoose } from 'mongoose';
import config from '../../config';
/**
 * Class managemente connection and disconnect with database mongo
 */
class DatabaseManagemente {
  private instance: Mongoose;
  private dbUri: string;
  constructor() {
    this.dbUri = `mongodb+srv://${config.dbUserName}:${config.dbPassword}@cluster0.dsdixxi.mongodb.net/?retryWrites=true&w=majority    `;
  }

  /**
   * It connects to the database and returns a promise that resolves to the database instance
   * @returns A promise that resolves to the mongoose instance.
   */
  public async connectDatabase(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const mongoOptions = {
          autoIndex: true,
          connectTimeoutMS: 10000,
          socketTimeoutMS: 30000,
        };
        this.instance = await mongoose.connect(this.dbUri, mongoOptions);
        resolve(this.instance);
        console.log('Connection successfull database');
      } catch (error) {
        console.log(`Ha ocurrido un error conectando a la base de datos`, error);
        reject('Ha ocurrido un error conectando a la base de datos');
      }
    });
  }
  /**
   * It takes a database name and a schema object as parameters, and returns a database object
   * @param {string} dbName - The name of the database you want to switch to.
   * @param {any} dbSchema - This is the schema of the database you want to switch to.
   * @returns The database object is being returned.
   */
  public async switchDatabase(dbName: string, dbSchema: any) {
    try {
      if (this.instance.connection.readyState == 1) {
        const database = this.instance.connection.useDb(dbName);
        if (!Object.keys(database.models).length) {
          dbSchema.forEach((schema, modelName) => {
            database.model(modelName, schema);
          });
        }
        return database;
      }
    } catch (error: any) {
      console.error(error);
      throw new Error('Error in process change database' + error);
    }
  }

  /**
   * It returns a mongoose model from a mongoose database
   * @param {any} database - The database object that was returned from the connectDatabase() method.
   * @param {string} modelName - The name of the model you want to get.
   * @returns The model of the database.
   */
  public getDatabaseModel(database: any, modelName: string): mongoose.Model<any> {
    try {
      const databaseReturn = database.model(modelName) as mongoose.Model<any>;
      return databaseReturn;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const databaseConnection = new DatabaseManagemente();