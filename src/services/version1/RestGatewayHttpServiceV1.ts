import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class RestGatewayHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/rest_gateway');
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-restgateway', 'controller', 'default', '*', '1.0'));
    }
}