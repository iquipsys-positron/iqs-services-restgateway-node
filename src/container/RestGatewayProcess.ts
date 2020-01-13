import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

import { OrganizationsClientFactory } from 'pip-clients-organizations-node';
import { DevicesClientFactory } from 'iqs-clients-devices-node';
import { StateUpdatesClientFactory } from 'iqs-clients-stateupdates-node';

import { RestGatewayServiceFactory } from '../build/RestGatewayServiceFactory';

export class RestGatewayProcess extends ProcessContainer {

    public constructor() {
        super("rest-gateway", "REST gateway microservice");
        this._factories.add(new RestGatewayServiceFactory());
        this._factories.add(new OrganizationsClientFactory());
        this._factories.add(new DevicesClientFactory());
        this._factories.add(new StateUpdatesClientFactory());
        this._factories.add(new DefaultRpcFactory);
    }


}
