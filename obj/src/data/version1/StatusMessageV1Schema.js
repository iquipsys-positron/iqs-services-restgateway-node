"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const StatusMessageDataValueV1Schema_1 = require("./StatusMessageDataValueV1Schema");
class StatusMessageV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('device_udi', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('device_version', pip_services3_commons_node_3.TypeCode.Integer);
        this.withOptionalProperty('org_id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('organization_version', pip_services3_commons_node_3.TypeCode.Integer);
        this.withRequiredProperty('time', null); //TypeCode.DateTime);
        this.withOptionalProperty('freezed', pip_services3_commons_node_3.TypeCode.Boolean);
        this.withOptionalProperty('pressed', pip_services3_commons_node_3.TypeCode.Boolean);
        this.withOptionalProperty('long_pressed', pip_services3_commons_node_3.TypeCode.Boolean);
        this.withOptionalProperty('lat', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('lng', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('alt', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('angle', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('speed', pip_services3_commons_node_3.TypeCode.Float);
        this.withOptionalProperty('params', new pip_services3_commons_node_2.ArraySchema(new StatusMessageDataValueV1Schema_1.StatusMessageDataValueV1Schema()));
        this.withOptionalProperty('events', new pip_services3_commons_node_2.ArraySchema(new StatusMessageDataValueV1Schema_1.StatusMessageDataValueV1Schema()));
        this.withOptionalProperty('beacons', new pip_services3_commons_node_2.ArraySchema(pip_services3_commons_node_3.TypeCode.String));
    }
}
exports.StatusMessageV1Schema = StatusMessageV1Schema;
//# sourceMappingURL=StatusMessageV1Schema.js.map