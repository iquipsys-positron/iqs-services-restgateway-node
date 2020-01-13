import { CommandSet } from 'pip-services-commons-node';
import { IRestGatewayController } from './IRestGatewayController';
export declare class RestGatewayCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IRestGatewayController);
    private makeUpdateStatusCommand;
}
