import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { RestGatewayController } from '../logic/RestGatewayController';
import { RestGatewayHttpServiceV1 } from '../services/version1/RestGatewayHttpServiceV1';

export class RestGatewayServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-restgateway", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("iqs-services-restgateway", "controller", "default", "*", "1.0");
	public static HttpServiceV1Descriptor = new Descriptor("iqs-services-restgateway", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(RestGatewayServiceFactory.ControllerDescriptor, RestGatewayController);
		this.registerAsType(RestGatewayServiceFactory.HttpServiceV1Descriptor, RestGatewayHttpServiceV1);
	}
	
}
