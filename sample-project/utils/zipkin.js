const zipkin = require('zipkin')
const { Tracer } = require('zipkin');
const { BatchRecorder } = require('zipkin');
const { jsonEncoder } = require('zipkin')
const { JSON_V2 } = jsonEncoder
const { HttpLogger } = require('zipkin-transport-http');
const CLSContext = require('zipkin-context-cls');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const config = require('../config/config')

const ctxImpl = new CLSContext();

const recorder = new BatchRecorder({
    logger: new HttpLogger({
        endpoint: config.zipkin.endpoint
    })
});

module.exports.tracer = new Tracer({ ctxImpl, recorder, sampler: new zipkin.sampler.CountingSampler(1)});