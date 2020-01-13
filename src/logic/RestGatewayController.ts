let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { CompositeLogger } from 'pip-services3-components-node';
import { CompositeCounters } from 'pip-services3-components-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { NotFoundException } from 'pip-services3-commons-node';
import { InvalidStateException } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { IDevicesClientV1 } from 'iqs-clients-devices-node';
import { DeviceV1 } from 'iqs-clients-devices-node';
import { DeviceTypeV1 } from 'iqs-clients-devices-node';
import { DeviceStatusV1 } from 'iqs-clients-devices-node';

import { IStateUpdatesClientV1 } from 'iqs-clients-stateupdates-node';
import { StateUpdateV1 } from 'iqs-clients-stateupdates-node';

import { StatusMessageV1 } from '../data/version1/StatusMessageV1';
import { IRestGatewayController } from './IRestGatewayController';
import { RestGatewayCommandSet } from './RestGatewayCommandSet';

export class RestGatewayController implements  IConfigurable, IReferenceable, ICommandable, IRestGatewayController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.connector', 'iqs-services-restgateway:connector:*:*:1.0',
        'dependencies.devices', 'iqs-services-devices:client:*:*:1.0',
        'dependencies.state-updates', 'iqs-services-stateupdates:client:*:*:1.0'
    );

    private _logger: CompositeLogger = new CompositeLogger();
    private _counters: CompositeCounters = new CompositeCounters();
    private _dependencyResolver: DependencyResolver = new DependencyResolver(RestGatewayController._defaultConfig);
    private _devicesClient: IDevicesClientV1;
    private _statesClient: IStateUpdatesClientV1;
    private _commandSet: RestGatewayCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
        this._counters.setReferences(references);
        this._dependencyResolver.setReferences(references);

        this._devicesClient = this._dependencyResolver.getOneRequired<IDevicesClientV1>('devices');
        this._statesClient = this._dependencyResolver.getOneRequired<IStateUpdatesClientV1>('state-updates');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new RestGatewayCommandSet(this);
        return this._commandSet;
    }

    public resolveDevice(orgId: string, udi: string,
        callback: (err: any, device: DeviceV1) => void): void {

        if (orgId == '') {
            callback(
                new BadRequestException(
                    'mqtt-gateway',
                    'UNKNOWN_ORGANIZATION',
                    'Cannot determine organization'
                ),
                null
            );
            return;
        }

        if (udi == '') {
            callback(
                new BadRequestException(
                    'mqtt-gateway',
                    'NO_DEVICE_UDI',
                    'Device UDI is not defined'
                ),
                null
            );
            return;
        }

        this._devicesClient.getOrCreateDevice(
            'mqtt-gateway',
            orgId, DeviceTypeV1.Unknown, null, udi,
            (err, device) => {
                // if (err == null && device && device.status != DeviceStatusV1.Active) {
                //     err = new InvalidStateException(
                //         'mqtt-gateway',
                //         'DEVICE_INACTIVE',
                //         'Device ' + udi + ' is inactive'
                //     ).withDetails('udi', udi);
                // }

                callback(err, device);
            }
        );
    }

    public updateStatus(message: StatusMessageV1, callback: (err: any) => void): void {
        let device: DeviceV1;

        message.time = DateTimeConverter.toDateTimeWithDefault(message.time, new Date());

        async.series([
            (callback) => {
                this.resolveDevice(message.org_id, message.device_udi, (err, data) => {
                    device = data;
                    callback(err);
                })
            },
            // Todo: Calculate position based on beacons
            (callback) => {
                if (device == null || device.status != DeviceStatusV1.Active) {
                    callback();
                    return;
                }

                let stateUpdate: StateUpdateV1 = {
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
            if (err) this._logger.error("rest-gateway", err, "Failed to process the message");
            else this._logger.trace("rest-gateway", "_Processed message from " + message.device_udi);

            callback(err);
        });
    }

}