import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

import { StatusMessageDataValueV1Schema } from './StatusMessageDataValueV1Schema'

export class StatusMessageV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('device_udi', TypeCode.String);
        this.withOptionalProperty('device_version', TypeCode.Integer);
        this.withOptionalProperty('org_id', TypeCode.String);
        this.withOptionalProperty('organization_version', TypeCode.Integer);
        this.withRequiredProperty('time', null); //TypeCode.DateTime);
        
        this.withOptionalProperty('freezed', TypeCode.Boolean);
        this.withOptionalProperty('pressed', TypeCode.Boolean);
        this.withOptionalProperty('long_pressed', TypeCode.Boolean);
        
        this.withOptionalProperty('lat', TypeCode.Float);
        this.withOptionalProperty('lng', TypeCode.Float);
        this.withOptionalProperty('alt', TypeCode.Float);
        this.withOptionalProperty('angle', TypeCode.Float);
        this.withOptionalProperty('speed', TypeCode.Float);

        this.withOptionalProperty('params', new ArraySchema(new StatusMessageDataValueV1Schema()));
        this.withOptionalProperty('events', new ArraySchema(new StatusMessageDataValueV1Schema()));

        this.withOptionalProperty('beacons', new ArraySchema(TypeCode.String));
    }
}
