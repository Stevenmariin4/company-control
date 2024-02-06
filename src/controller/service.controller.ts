import { EListTable } from "../enums/tables.enum";
import { BaseService } from "../core/base-service";
import serviceShema from "../models/service.model";
import config from "../config";

export class serviceController extends BaseService {
    constructor() {
        super();
        this.table = EListTable.service;
        this.model = serviceShema;
        this.validateParams = [];
        this.database = config.dbName;
    }
}