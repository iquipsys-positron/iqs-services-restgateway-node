import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class RestGatewayHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/rest_gateway');
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-restgateway', 'controller', 'default', '*', '1.0'));
    }
}