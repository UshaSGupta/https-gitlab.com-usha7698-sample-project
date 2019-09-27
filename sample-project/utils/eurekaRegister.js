const Eureka = require('eureka-js-client').Eureka;
const os = require('os');
const config = require('../config/config')

// const env = process.env.NODE_ENV || 'dev';
// const config = require(`${__dirname}/../config/manifest.json`)[env];
// const port = process.env.PORT || 5001;

const eurekaurl = process.env.EUREKA_URL || config.eureka.host;
const eurekaport = process.env.EUREKA_PORT || config.eureka.port;
const client = new Eureka({
    // application instance information
    instance: {
        instanceId: os.hostname() + ':' + config.eureka.serviceName + ':' + config.server.port,
        app: config.eureka.serviceName,
        hostName: os.hostname(),
        ipAddr: os.hostname(),
        port: {
            '$': config.server.port,
            '@enabled': 'true',
        },
        statusPageUrl: "http://" + os.hostname() + ":"+config.server.port+"/info",
        homePageUrl: "http://" + os.hostname() + ":" + config.server.port + "/home",
        healthCheckUrl: "http://" + os.hostname() + ":" + config.server.port + "/healthcheck",
        vipAddress: config.eureka.serviceName,
        secureVipAddress: config.eureka.serviceName,
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        // eureka server host / port
        host: config.eureka.host,
        port: config.eureka.port,
        servicePath: config.eureka.servicePath,
    },
});

module.exports = client;
