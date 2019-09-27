//require('elastic-apm-node').start();
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let indexRouter = require('./routes/index')
let app = express()
const config = require('./config/config')
let cors = require('cors')

/* GLOBAL VARIABLES */
global.q = require('q')
global._ = require('underscore')
global.cryptoJs = require('crypto-js')
global.secretkey = '123456$#@$^@1ERF'
global.connectDatabase = require('./utils/db').connectDatabase
global.dbQuery = require('./model/DAL')
global.errorCodeJson = require('./utils/errorCode')
global.getDecryptKey = require('./commonFunctions.js/common').getDecryptKey
global.getEncryptKey = require('./commonFunctions.js/common').getEncryptKey

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', indexRouter)

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
})

const expressSwagger = require('express-swagger-generator')(app);

let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: config.envUrl,
    basePath: '/rtransport/util',
    produces: [
      "application/json",
      "application/xml"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",

      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./swaggerDocs/swagger.js'] //Path to the API handle folder
};
expressSwagger(options)

/* SERVER START */
let port = process.env.PORT || config.server.port
let server = app.listen(port)
console.log('Api is running on port', port)
module.exports = app
