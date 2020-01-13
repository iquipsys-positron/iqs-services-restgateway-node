"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class StatusMessageDataValueV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services3_commons_node_2.TypeCode.Integer);
        this.withRequiredProperty('val', pip_services3_commons_node_2.TypeCode.Float);
    }
}
exports.StatusMessageDataValueV1Schema = StatusMessageDataValueV1Schema;
//# sourceMappingURL=StatusMessageDataValueV1Schema.js.map