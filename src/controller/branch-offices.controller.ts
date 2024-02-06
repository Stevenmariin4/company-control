import branchOfficeShema from "../models/branch-offices.model";
import { BaseService } from "../core/base-service";
import { EListTable } from "../enums/tables.enum";
import config from "../config";

export class branchOfficesController extends BaseService {
    constructor() {
        super();
        this.table = EListTable.branchOffices;
        this.model = branchOfficeShema;
        this.validateParams = [];
        this.database = config.dbName;
    }
}