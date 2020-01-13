// let _ = require('lodash');
// let async = require('async');
// let assert = require('chai').assert;

// import { Descriptor } from 'pip-services-commons-node';
// import { ConfigParams } from 'pip-services-commons-node';
// import { References } from 'pip-services-commons-node';
// import { ConsoleLogger } from 'pip-services-components-node';

// import { IDevicesClientV1 } from 'iqs-clients-devices-node';
// import { DevicesMemoryClientV1 } from 'iqs-clients-devices-node';
// import { StateUpdatesNullClientV1 } from 'iqs-clients-stateupdates-node';

// import { StatusMessageV1 } from '../../src/data/version1/StatusMessageV1';
// import { RestGatewayController } from '../../src/logic/RestGatewayController';
// import { RestGatewayLambdaFunction } from '../../src/container/RestGatewayLambdaFunction';

// let STATUS_MSG1: StatusMessageV1 = {
//     device_udi: '111',
//     time: new Date(),
//     lat: 32,
//     lng: -110,
//     alt: 750,
//     angle: 0,
//     speed: 1,
//     pressed: false,
//     long_pressed: false,
//     freezed: false
// };
// let STATUS_MSG2: StatusMessageV1 = {
//     device_udi: '222',
//     time: new Date(),
//     lat: 33,
//     lng: -111,
//     alt: 750,
//     angle: 0,
//     speed: 1,
//     pressed: false,
//     long_pressed: false,
//     freezed: false
// };

// suite('RestGatewayLambdaFunction', ()=> {
//     let devicesClient: IDevicesClientV1;
//     let lambda: RestGatewayLambdaFunction;

//     suiteSetup((done) => {
//         let config = ConfigParams.fromTuples(
//             'logger.descriptor', 'pip-services:logger:console:default:1.0',
//             'devices.descriptor', 'iqs-services-devices:client:memory:default:1.0',
//             'state-updates.descriptor', 'iqs-services-stateupdates:client:null:default:1.0',
//             'controller.descriptor', 'iqs-services-restgateway:controller:default:default:1.0'
//         );

//         lambda = new RestGatewayLambdaFunction();
//         lambda.configure(config);
//         lambda.open(null, (err) => {
//             if (err) {
//                 done(err);
//                 return;
//             }

//             devicesClient = lambda.getReferences().getOneRequired<IDevicesClientV1>(new Descriptor('iqs-services-devices', 'client', '*', '*', '1.0'));
//             devicesClient.createDevice(null, { id: '1', org_id: '1', udi: '111', type: 'smartphone', status: 'active' }, () => {});
//             devicesClient.createDevice(null, { id: '2', org_id: '1', udi: '222', type: 'smartphone', status: 'active' }, () => {});

//             done(err);
//         });
//     });
    
//     suiteTeardown((done) => {
//         lambda.close(null, done);
//     });
    
//     test('Process status messages', (done) => {
//         async.series([
//         // Process first message
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'rest_gateway',
//                         cmd: 'update_status',
//                         message: STATUS_MSG1
//                     },
//                     (err, state) => {
//                         assert.isNull(err);

//                         callback();
//                     }
//                 );
//             },
//         // Process second message
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'rest_gateway',
//                         cmd: 'update_status',
//                         message: STATUS_MSG1
//                     },
//                     (err, state) => {
//                         assert.isNull(err);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     });
// });