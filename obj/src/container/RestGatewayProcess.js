"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_clients_organizations_node_1 = require("pip-clients-organizations-node");
const iqs_clients_devices_node_1 = require("iqs-clients-devices-node");
const iqs_clients_stateupdates_node_1 = require("iqs-clients-stateupdates-node");
const RestGatewayServiceFactory_1 = require("../build/RestGatewayServiceFactory");
class RestGatewayProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("rest-gateway", "REST gateway microservice");
        this._factories.add(new RestGatewayServiceFactory_1.RestGatewayServiceFactory());
        this._factories.add(new pip_clients_organizations_node_1.OrganizationsClientFactory());
        this._factories.add(new iqs_clients_devices_node_1.DevicesClientFactory());
        this._factories.add(new iqs_clients_stateupdates_node_1.StateUpdatesClientFactory());
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.RestGatewayProcess = RestGatewayProcess;
//# sourceMappingURL=RestGatewayProcess.js.map