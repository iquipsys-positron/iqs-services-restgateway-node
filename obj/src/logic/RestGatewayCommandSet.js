"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const StatusMessageV1Schema_1 = require("../data/version1/StatusMessageV1Schema");
class RestGatewayCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the controller
        this.addCommand(this.makeUpdateStatusCommand());
    }
    makeUpdateStatusCommand() {
        return new pip_services3_commons_node_2.Command("update_status", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('message', new StatusMessageV1Schema_1.StatusMessageV1Schema()), (correlationId, args, callback) => {
            let message = args.get("message");
            this._logic.updateStatus(message, (err) => {
                callback(err, null);
            });
        });
    }
}
exports.RestGatewayCommandSet = RestGatewayCommandSet;
//# sourceMappingURL=RestGatewayCommandSet.js.map