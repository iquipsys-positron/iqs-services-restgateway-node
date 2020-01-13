let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { DevicesMemoryClientV1 } from 'iqs-clients-devices-node';
import { StateUpdatesNullClientV1 } from 'iqs-clients-stateupdates-node';

import { StatusMessageV1 } from '../../../src/data/version1/StatusMessageV1';
import { RestGatewayController } from '../../../src/logic/RestGatewayController';
import { RestGatewayHttpServiceV1 } from '../../../src/services/version1/RestGatewayHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let STATUS_MSG1: StatusMessageV1 = {
    device_udi: '111',
    time: new Date(),
    lat: 32,
    lng: -110,
    alt: 750,
    angle: 0,
    speed: 1,
    pressed: false,
    long_pressed: false,
    freezed: false
};
let STATUS_MSG2: StatusMessageV1 = {
    device_udi: '222',
    time: new Date(),
    lat: 33,
    lng: -111,
    alt: 750,
    angle: 0,
    speed: 1,
    pressed: false,
    long_pressed: false,
    freezed: false
};

suite('RestGatewayHttpServiceV1', ()=> {    
    let service: RestGatewayHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let controller = new RestGatewayController();

        let devicesClient = new DevicesMemoryClientV1();
        devicesClient.createDevice(null, { id: '1', org_id: '1', object_id: '1',  udi: '111', type: 'smartphone', status: 'active' }, () => {});
        devicesClient.createDevice(null, { id: '2', org_id: '1', object_id: '2', udi: '222', type: 'smartphone', status: 'active' }, () => {});

        service = new RestGatewayHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-devices', 'client', 'memory', 'default', '1.0'), devicesClient,
            new Descriptor('iqs-services-stateupdates', 'client', 'null', 'default', '1.0'), new StateUpdatesNullClientV1(),
            new Descriptor('iqs-services-restgateway', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-restgateway', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('Process status messages', (done) => {
        async.series([
        // Process first message
            (callback) => {
                rest.post('/v1/rest_gateway/update_status',
                    {
                        message: STATUS_MSG1
                    },
                    (err, req, res, state) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Process second message
            (callback) => {
                rest.post('/v1/rest_gateway/update_status', 
                    {
                        message: STATUS_MSG2
                    },
                    (err, req, res, state) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });
});