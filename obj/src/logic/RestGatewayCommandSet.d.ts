import { CommandSet } from 'pip-services3-commons-node';
import { IRestGatewayController } from './IRestGatewayController';
export declare class RestGatewayCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IRestGatewayController);
    private makeUpdateStatusCommand;
}
