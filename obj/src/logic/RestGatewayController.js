"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_components_node_2 = require("pip-services3-components-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const iqs_clients_devices_node_1 = require("iqs-clients-devices-node");
const iqs_clients_devices_node_2 = require("iqs-clients-devices-node");
const RestGatewayCommandSet_1 = require("./RestGatewayCommandSet");
class RestGatewayController {
    constructor() {
        this._logger = new pip_services3_components_node_1.CompositeLogger();
        this._counters = new pip_services3_components_node_2.CompositeCounters();
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(RestGatewayController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._counters.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._devicesClient = this._dependencyResolver.getOneRequired('devices');
        this._statesClient = this._dependencyResolver.getOneRequired('state-updates');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new RestGatewayCommandSet_1.RestGatewayCommandSet(this);
        return this._commandSet;
    }
    resolveDevice(orgId, udi, callback) {
        if (orgId == '') {
            callback(new pip_services3_commons_node_3.BadRequestException('mqtt-gateway', 'UNKNOWN_ORGANIZATION', 'Cannot determine organization'), null);
            return;
        }
        if (udi == '') {
            callback(new pip_services3_commons_node_3.BadRequestException('mqtt-gateway', 'NO_DEVICE_UDI', 'Device UDI is not defined'), null);
            return;
        }
        this._devicesClient.getOrCreateDevice('mqtt-gateway', orgId, iqs_clients_devices_node_1.DeviceTypeV1.Unknown, null, udi, (err, device) => {
            // if (err == null && device && device.status != DeviceStatusV1.Active) {
            //     err = new InvalidStateException(
            //         'mqtt-gateway',
            //         'DEVICE_INACTIVE',
            //         'Device ' + udi + ' is inactive'
            //     ).withDetails('udi', udi);
            // }
            callback(err, device);
        });
    }
    updateStatus(message, callback) {
        let device;
        message.time = pip_services3_commons_node_4.DateTimeConverter.toDateTimeWithDefault(message.time, new Date());
        async.series([
            (callback) => {
                this.resolveDevice(message.org_id, message.device_udi, (err, data) => {
                    device = data;
                    callback(err);
                });
            },
            // Todo: Calculate position based on beacons
            (callback) => {
                if (device == null || device.status != iqs_clients_devices_node_2.DeviceStatusV1.Active) {
                    callback();
                    return;
                }
                let stateUpdate = {
                    org_id: device.org_id,
                    device_id: device.id,
                    time: message.time,
                    // Deprecated
                    freezed: message.freezed,
                    pressed: message.pressed,
                    long_pressed: message.long_pressed,
                    params: message.params,
                    events: message.events
                };
                if (message.lat != 0 && message.lng != 0) {
                    stateUpdate.lat = message.lat;
                    stateUpdate.lng = message.lng;
                    stateUpdate.alt = message.alt;
                    stateUpdate.angle = message.angle;
                    stateUpdate.speed = message.speed;
                }
                this._statesClient.beginUpdateState('rest-gateway', stateUpdate, callback);
            }
        ], (err) => {
            if (err)
                this._logger.error("rest-gateway", err, "Failed to process the message");
            else
                this._logger.trace("rest-gateway", "_Processed message from " + message.device_udi);
            callback(err);
        });
    }
}
exports.RestGatewayController = RestGatewayController;
RestGatewayController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.connector', 'iqs-services-restgateway:connector:*:*:1.0', 'dependencies.devices', 'iqs-services-devices:client:*:*:1.0', 'dependencies.state-updates', 'iqs-services-stateupdates:client:*:*:1.0');
//# sourceMappingURL=RestGatewayController.js.map