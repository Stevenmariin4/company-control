import { Router, Request, Response, NextFunction } from 'express';
import { testController } from '../controller/test.controller';

export class FormatRouter {
  public router: Router;
  public uri: string;
  private formatController: testController;
  constructor() {
    this.router = Router();
    this.uri = '/format';   
    this.formatController = new testController();
    this.config();
  }

  /**
   *  Configure the routes of my RoleRoute
   */
  private config(): void {
    this.showAll();
    this.create();
  }

  /**
   *  show all Route
   */
  public showAll() {
    this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await this.formatController.showAll(req, res, next);
        res.send(response);
      } catch (error) {
        console.error('has ocurred error in create data', error);
      }
    });
  }

      /**
     * name
     */
      public create() {
        this.router.post('/', async (req: Request, res: Response, next: NextFunction) => {
            try {
              const response = await this.formatController.create(req, res, next);
              res.send(response);
            } catch (error) {
              console.error('has ocurred error in create data', error);
            }
          });
      }
}