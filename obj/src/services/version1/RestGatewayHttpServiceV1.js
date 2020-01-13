"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class RestGatewayHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/rest_gateway');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-restgateway', 'controller', 'default', '*', '1.0'));
    }
}
exports.RestGatewayHttpServiceV1 = RestGatewayHttpServiceV1;
//# sourceMappingURL=RestGatewayHttpServiceV1.js.map