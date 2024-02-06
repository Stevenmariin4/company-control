import provideerShema from "../models/provideer.model";
import { BaseService } from "../core/base-service";
import { EListTable } from "../enums/tables.enum";
import config from "../config";

export class provideerController extends BaseService {
    constructor() {
        super();
        this.table = EListTable.provideer;
        this.model = provideerShema;
        this.validateParams = [];
        this.database = config.dbName;
    }
}