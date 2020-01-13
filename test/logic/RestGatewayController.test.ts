let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { DevicesMemoryClientV1 } from 'iqs-clients-devices-node';
import { StateUpdatesNullClientV1 } from 'iqs-clients-stateupdates-node';

import { StatusMessageV1 } from '../../src/data/version1/StatusMessageV1';
import { RestGatewayController } from '../../src/logic/RestGatewayController';

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

suite('RestGatewayController', ()=> {    
    let controller: RestGatewayController;

    setup(() => {
        let devicesClient = new DevicesMemoryClientV1();
        devicesClient.createDevice(
            null, 
            { id: '1', org_id: '1', udi: '111', type: 'smartphone', status: 'active' }, 
            () => {}
        );
        devicesClient.createDevice(
            null, 
            { id: '2', org_id: '1', udi: '222', type: 'smartphone', status: 'active' }, 
            () => {}
        );

        controller = new RestGatewayController();

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-devices', 'client', 'memory', 'default', '1.0'), devicesClient,
            new Descriptor('iqs-services-stateupdates', 'client', 'null', 'default', '1.0'), new StateUpdatesNullClientV1(),
            new Descriptor('iqs-services-restgateway', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);
    });
    
    test('Process status messages', (done) => {
        async.series([
        // Process first message
            (callback) => {
                controller.updateStatus(
                    STATUS_MSG1,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Process second message
            (callback) => {
                controller.updateStatus(
                    STATUS_MSG2,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });
});