import { Router, Request, Response, NextFunction } from 'express';
import { provideerController } from '../controller/proovider.controller';
import { EListTable } from '../enums/tables.enum';
import { branchOfficesController } from '../controller/branch-offices.controller';
import { detailProvideerController } from '../controller/detail-provideer.controller';
import { serviceController } from '../controller/service.controller';
import { typeServiceController } from '../controller/type-service.controller';
import { BaseService } from '../core/base-service';

export class dynamicRouter {
  public router: Router;
  public uri: string;
  private instanceController: BaseService;
  constructor() {
    this.router = Router();
    this.uri = '/';
    (this.instanceController = null), this.config();
  }

  /**
   *  Configure the routes of my RoleRoute
   */
  private config(): void {
    this.showAll();
    this.create();
    this.update();
    this.getById();
    this.filter();
  }

  /**
   *  show all Route
   */
  public showAll() {
    this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.query.nameTable) {
          res.status(400).send({ message: 'name table not found', error: true });
        }
        this.getInstanceClass(req.query.nameTable as any);
        if (req.query.nameTable && this.instanceController != null) {
          const response = await this.instanceController.showAll(req, res, next);
          res.send(response);
        }
      } catch (error) {
        console.error('has ocurred error in create data', error);
      }
    });
  }
  public getById() {
    this.router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.query.nameTable) {
          res.status(400).send({ message: 'name table not found', error: true });
        }
        this.getInstanceClass(req.query.nameTable as any);
        if (req.query.nameTable && this.instanceController != null) {
          const response = await this.instanceController.getById(req, res, next);
          res.send(response);
        }
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
        if (!req.query.nameTable) {
          res.status(400).send({ message: 'name table not found', error: 'name table not found' });
        }
        this.getInstanceClass(req.query.nameTable as any);
        if (req.query.nameTable && this.instanceController != null) {
          const response = await this.instanceController.create(req, res, next);
          res.send(response);
        }else {
          
          res.status(400).send({ message: 'Error create instance', error: 'Error create instance' });
        }
      } catch (error) {
        console.error('has ocurred error in create data', error);
        res.status(500).send({message:'Error in operation', error})
      }
    });
  }

  public update(){
    this.router.patch('/:id', async (req:Request, res:Response, next:NextFunction)=>{
      try {
        if (!req.query.nameTable) {
          res.status(400).send({ message: 'name table not found', error: 'name table not found' });
        }
        if (req.query.nameTable && this.instanceController != null) {
          const response = await this.instanceController.update(req,res,next);
          res.send(response);
        }
      } catch (error) {
        
      }
    })
  }
  public filter(){
    this.router.post('/filter', async (req:Request, res:Response, next:NextFunction)=>{
      try {
        if (!req.query.nameTable) {
          res.status(400).send({ message: 'name table not found', error: 'name table not found' });
        }
        this.getInstanceClass(req.query.nameTable as any);
        if (req.query.nameTable && this.instanceController != null) {
          const response = await this.instanceController.filter(req,res,next)
          res.send(response);
        }
      } catch (error) {
        res.status(400).send({ message: 'Error filter', error });
      }
    })
  }

  private getInstanceClass(nameTable: string) {
    switch (nameTable) {
      case EListTable.provideer:
        this.instanceController = new provideerController();
        break;
      case EListTable.branchOffices:
        this.instanceController = new branchOfficesController();
        break;
      case EListTable.detailProvideer:
        this.instanceController = new detailProvideerController();
        break;
      case EListTable.service :
        this.instanceController = new serviceController();
        break;
      case EListTable.typeService :
        this.instanceController = new typeServiceController();
        break;      
    }
  }
}
