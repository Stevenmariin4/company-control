import formatSchema from "../models/format.model";
import { BaseService } from "../core/base-service";

export class testController extends BaseService {
    constructor() {
        super();
        this.table = 'items';
        this.model = formatSchema;
        this.validateParams = [];
        this.database = 'challenge';
    }
}