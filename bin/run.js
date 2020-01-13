let RestGatewayProcess = require('../obj/src/container/RestGatewayProcess').RestGatewayProcess;

try {
    new RestGatewayProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
