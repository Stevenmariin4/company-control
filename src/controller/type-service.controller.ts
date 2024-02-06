import { EListTable } from "../enums/tables.enum";
import { BaseService } from "../core/base-service";
import typeServiceShema from "../models/type-service.model";
import config from "../config";

export class typeServiceController extends BaseService {
    constructor() {
        super();
        this.table = EListTable.typeService;
        this.model = typeServiceShema;
        this.validateParams = [];
        this.database = config.dbName;
    }
}