let errorMsg = 'Failed To Fetch Database List.'
let connection = require('../utils/db')
function getCon (dbinfo) {
  var poolDynamic = mysql.createPool({
    connectionLimit: 200,
    host: dbinfo.host,
    user: dbinfo.user,
    password: dbinfo.password,
    database: dbinfo.sql_db,
    timezone: 'UTC+0',
    multipleStatements: true
  })
  return poolDynamic
}

let connectDB = function (dbDetails, connType) {
  let deferred = q.defer()
  mongoPool(dbDetails, connType)
    .then(dbRes => {
      deferred.resolve(dbRes)
    })
    .catch(err => {
      deferred.reject(err)
    })
  return deferred.promise
}

let formmatRes = function (details) {
  let deferred = q.defer()
  let resultArray = []
  try {
    _.each(details.data, d => {
      if (details.keyName.toLowerCase() === 'database') {
        resultArray.push({
          Database: d.name
        })
      } else {
        resultArray.push({
          TABLE_NAME: d.name
        })
      }
    })
    deferred.resolve(resultArray)
  } catch (err) {
    deferred.reject({ message: errorMsg })
  }
  return deferred.promise
}

function getDecryptKey (value) {
  let secreKey = cryptoJs.enc.Utf8.parse(secretkey)
  let iv = cryptoJs.enc.Utf8.parse(secretkey)
  let decrypted = cryptoJs.AES.decrypt(value, secreKey, {
    keySize: 128 / 8,
    iv: iv,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7
  })
  return decrypted.toString(cryptoJs.enc.Utf8)
}

function checkConnectionExisting (domainID, dtjson) {
  let deferred = q.defer()
  console.log('domainID', domainID)
  console.log('detailJson', dtjson)
  let selectqry = 'select dbInfo from YDATAVIEWPROFILE where UserName = ? '
  console.log('selectqry', selectqry)

  connection.getConnection(function (err, conn) {
    if (err) {
      console.log('err===>', err)
      return deferred.reject({ message: "Can't connect to database." })
    } else {
      conn.query(selectqry, domainID, function (err, result) {
        if (err) {
          return deferred.reject({ Status: 'Failure' + err })
        } else {
          let sendFlag = result.findIndex(data => JSON.parse(data.dbInfo).host == dtjson.host && JSON.parse(data.dbInfo).sql_db == dtjson.sql_db && JSON.parse(data.dbInfo).user == dtjson.user && JSON.parse(data.dbInfo).password == dtjson.password)
          deferred.resolve({ message: sendFlag })
        }
      })
    }
  })
  return deferred.promise
}

// let encryptString = getDecryptKey('xFTCjaCxIyu20otwG9R/GQ==')
// console.log('encryptString', encryptString)

function getEncryptKey (value) {
  let secreKey = cryptoJs.enc.Utf8.parse(secretkey)
  var iv = cryptoJs.enc.Utf8.parse(secretkey)
  var encrypted = cryptoJs.AES.encrypt(cryptoJs.enc.Utf8.parse(value.toString()), secreKey,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7
    })

  return encrypted.toString()
}

var config = require('../config/config')

function getUrlPrefix () {
  var prefix = ''
  for (var jsonkey in config) {
    if (jsonkey == 'app') {
      var app = config[jsonkey]
      for (var jsonkey1 in app) {
        if (jsonkey1 == 'prefix') { prefix = app[jsonkey1] }
        break
      }
    }
  }
  return prefix.toString()
}

// let encryptString = encryptVal('akash.mandpe')
// console.log('encryptString', encryptString)

module.exports.connectDB = connectDB
module.exports.checkConnectionExisting = checkConnectionExisting
module.exports.getCon = getCon
module.exports.formmatRes = formmatRes
module.exports.getDecryptKey = getDecryptKey
module.exports.getEncryptKey = getEncryptKey
module.exports.getUrlPrefix = getUrlPrefix
