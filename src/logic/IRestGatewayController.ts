import { StatusMessageV1 } from '../data/version1/StatusMessageV1';

export interface IRestGatewayController {
    updateStatus(message: StatusMessageV1, callback: (err: any) => void): void;
}