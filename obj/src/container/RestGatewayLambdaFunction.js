"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const pip_clients_organizations_node_1 = require("pip-clients-organizations-node");
const iqs_clients_devices_node_1 = require("iqs-clients-devices-node");
const iqs_clients_stateupdates_node_1 = require("iqs-clients-stateupdates-node");
const RestGatewayServiceFactory_1 = require("../build/RestGatewayServiceFactory");
class RestGatewayLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("rest-gateway", "REST gateway function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('iqs-services-restgateway', 'controller', 'default', '*', '*'));
        this._factories.add(new RestGatewayServiceFactory_1.RestGatewayServiceFactory());
        this._factories.add(new pip_clients_organizations_node_1.OrganizationsClientFactory());
        this._factories.add(new iqs_clients_devices_node_1.DevicesClientFactory());
        this._factories.add(new iqs_clients_stateupdates_node_1.StateUpdatesClientFactory());
    }
    getReferences() {
        return this._references;
    }
}
exports.RestGatewayLambdaFunction = RestGatewayLambdaFunction;
exports.handler = new RestGatewayLambdaFunction().getHandler();
//# sourceMappingURL=RestGatewayLambdaFunction.js.map