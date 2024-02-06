import { EListTable } from "../enums/tables.enum";
import { BaseService } from "../core/base-service";
import detailtProvideerShema from "../models/detail-provideer.model";
import config from "../config";

export class detailProvideerController extends BaseService {
    constructor() {
        super();
        this.table = EListTable.detailProvideer;
        this.model = detailtProvideerShema;
        this.validateParams = [];
        this.database = config.dbName;
    }
}