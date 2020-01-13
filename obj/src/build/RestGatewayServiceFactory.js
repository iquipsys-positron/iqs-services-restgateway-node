"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const RestGatewayController_1 = require("../logic/RestGatewayController");
const RestGatewayHttpServiceV1_1 = require("../services/version1/RestGatewayHttpServiceV1");
class RestGatewayServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(RestGatewayServiceFactory.ControllerDescriptor, RestGatewayController_1.RestGatewayController);
        this.registerAsType(RestGatewayServiceFactory.HttpServiceV1Descriptor, RestGatewayHttpServiceV1_1.RestGatewayHttpServiceV1);
    }
}
exports.RestGatewayServiceFactory = RestGatewayServiceFactory;
RestGatewayServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-restgateway", "factory", "default", "default", "1.0");
RestGatewayServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-restgateway", "controller", "default", "*", "1.0");
RestGatewayServiceFactory.HttpServiceV1Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-restgateway", "service", "http", "*", "1.0");
//# sourceMappingURL=RestGatewayServiceFactory.js.map