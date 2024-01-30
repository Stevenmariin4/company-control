import { Schema } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { databaseConnection } from '../utils/database/database';
export abstract class BaseService {
  protected table: string;
  protected model: Schema<any>;
  protected validateParams: string[];
  protected joins: string[];
  protected database: string;
  constructor() {
    this.joins = [];
  }

  public create(req: Request, res: Response, next: NextFunction): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
          reject({ code: 400, message: 'data no found' });
        } else {
          for (const iterator of this.validateParams) {
            if (!data.hasOwnProperty(iterator)) {
              reject({
                code: 400,
                message: `check objet not found param ${iterator}`,
              });
              break;
            }
          }
          const databaseTenant = await databaseConnection.switchDatabase(
            this.database,
            new Map([[this.table, this.model]])
          );
          const tenant = await databaseConnection.getDatabaseModel(databaseTenant, this.table);
          const responseMongo = await tenant.create(data);
          resolve({
            code: 201,
            message: 'operation succesfull',
            data: responseMongo,
          });
        }
      } catch (error) {
        next(error);
      }
    });
  }

  public showAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const databaseTenant = await databaseConnection.switchDatabase(
          this.database,
          new Map([[this.table, this.model]])
        );
        const tenant = await databaseConnection.getDatabaseModel(databaseTenant, this.table);
        const response = await tenant.find().catch((error: any) => {
          reject({
            code: 500,
            error,
            message: 'has ocurred error in method find all',
          });
        });
        resolve({
          code: 200,
          message: 'operation successfull',
          data: response,
        });
      } catch (error) {
        next(error);
      }
    });
  }

  public filter(req: Request, res: Response, next: NextFunction): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { filter } = req.body;
        if (!filter) {
          reject({ code: 400, message: 'filter not found' });
        } else {
          const databaseTenant = await databaseConnection.switchDatabase(
            this.database,
            new Map([[this.table, this.model]])
          );
          const tenant = await databaseConnection.getDatabaseModel(databaseTenant, this.table);
          let query = await this.formatterQuery(req.body).catch((error) => {
            reject(error);
          });
          let resultFind;
          if (this.joins.length > 0) {
            console.log('Search with relationship');
            resultFind = await tenant.find(query).populate('use_role');
          } else {
            resultFind = await tenant.find(query);
          }
          resolve({
            code: 200,
            message: 'Operation successfull',
            data: resultFind,
          });
        }
      } catch (error: any) {
        console.error('error in filter', error);
        const bodyError = {
          code: 500,
          error,
          message: 'Operacion no realizada',
        };
        reject(bodyError);
      }
    });
  }

  public update(req: Request, res: Response, next: NextFunction): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let data = req.body;
        const databaseTenant = await databaseConnection.switchDatabase(
          this.database,
          new Map([[this.table, this.model]])
        );
        const tenant = await databaseConnection.getDatabaseModel(databaseTenant, this.table);
        tenant
          .findByIdAndUpdate(req.params.id, data)
          .then((response) => {
            resolve({
              code: 201,
              message: 'operation succesfull',
              data: response,
            });
          })
          .catch((error) => {
            console.error('has ocurred error when try update record', error);
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  public getById(req: Request, res: Response, next: NextFunction): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        if (!req.params.id) {
          reject({ code: 400, message: 'id no found check request' });
        } else {
          const databaseTenant = await databaseConnection.switchDatabase(
            this.database,
            new Map([[this.table, this.model]])
          );
          const tenant = await databaseConnection.getDatabaseModel(databaseTenant, this.table);
          const responseMongo = await tenant.findById(req.params.id);
          resolve({
            code: 200,
            message: 'operationSuccessfull',
            data: responseMongo,
          });
        }
      } catch (error) {
        next(error);
      }
    });
  }

  private formatterQuery(data) {
    return new Promise((resolve, reject) => {
      try {
        let newFilter = {};
        const { filter, toSearch, attributes } = data;
        if (toSearch) {
          if (!attributes) {
            const body = {
              code: 400,
              message: 'property attributes not found',
            };
            resolve(body);
          } else {
            attributes.forEach((element) => {
              newFilter[`${element}`] = { $regex: '.*' + toSearch + '.*' };
            });
          }
        } else {
          if (!filter) {
            const body = {
              code: 400,
              message: 'property filter not found',
            };
            resolve(body);
          } else {
            for (const [key, value] of Object.entries(filter)) {
              if (typeof value == 'object') {
                const nameProperty = Object.getOwnPropertyNames(value);
                const operator = this.getOperatorFromString(nameProperty[0]);
                const newObject = new Object();
                newObject[`${operator}`] = value[`${nameProperty}`];
                newFilter[`${key}`] = newObject;
              } else {
                newFilter[`${key}`] = value;
              }
            }
          }
        }
        if (data.hasOwnProperty('pagination')) {
        }
        resolve(newFilter);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Given an operator of type string, transform
   * into a sequelize native operator
   *
   * @param { string } operator
   *
   * @return { symbol }
   */
  private getOperatorFromString(operator: string): string {
    switch (operator) {
      case '>':
        return '$gt';
      case '<':
        return '$lt';
      case '>=':
      case '=>':
        return '$gte';
      case '=<':
      case '<=':
        return '$lte';
      case '!=':
      case '=!':
        return '$ne';
      case 'is':
        return '$is';
      case 'is not':
        return '$not';
      case 'like':
        return '$substring';
      case 'in':
        return '$in';
      case 'not in':
        return '$notIn';
      case '=':
      default:
        return '$eq';
    }
  }
}
