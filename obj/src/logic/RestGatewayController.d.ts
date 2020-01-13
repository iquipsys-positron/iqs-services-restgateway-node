import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { DeviceV1 } from 'iqs-clients-devices-node';
import { StatusMessageV1 } from '../data/version1/StatusMessageV1';
import { IRestGatewayController } from './IRestGatewayController';
export declare class RestGatewayController implements IConfigurable, IReferenceable, ICommandable, IRestGatewayController {
    private static _defaultConfig;
    private _logger;
    private _counters;
    private _dependencyResolver;
    private _devicesClient;
    private _statesClient;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    resolveDevice(orgId: string, udi: string, callback: (err: any, device: DeviceV1) => void): void;
    updateStatus(message: StatusMessageV1, callback: (err: any) => void): void;
}
