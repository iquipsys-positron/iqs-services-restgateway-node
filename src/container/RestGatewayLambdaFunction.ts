import { Descriptor } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';

import { OrganizationsClientFactory } from 'pip-clients-organizations-node';
import { DevicesClientFactory } from 'iqs-clients-devices-node';
import { StateUpdatesClientFactory } from 'iqs-clients-stateupdates-node';

import { RestGatewayServiceFactory } from '../build/RestGatewayServiceFactory';

export class RestGatewayLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("rest-gateway", "REST gateway function");
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-restgateway', 'controller', 'default', '*', '*'));

        this._factories.add(new RestGatewayServiceFactory());
        this._factories.add(new OrganizationsClientFactory());
        this._factories.add(new DevicesClientFactory());
        this._factories.add(new StateUpdatesClientFactory());
    }

    public getReferences(): IReferences {
        return this._references;
    }
}

export const handler = new RestGatewayLambdaFunction().getHandler();