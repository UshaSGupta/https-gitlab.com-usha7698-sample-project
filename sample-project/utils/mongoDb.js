let url = 'mongodb://10.26.24.35:27017/'

let mongoPool = function (details) {
  let deferred = q.defer()
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      deferred.reject(err)
    } else {
      let dbo = db.db(String(details.dbName))
      if (details.commandType.toLowerCase() === 'getcollections') {
        dbo.listCollections().toArray((err, collInfos) => {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve(collInfos)
          }
        })
      } else if (details.commandType.toLowerCase() === 'findwithquery') {
        dbo.collection(String(details.collecName)).find({ $or: details.query }).limit(Number(details.limit)).toArray((err, result) => {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve(result)
          }
        })
      } else {
        dbo.collection(String(details.collecName)).findOne((err, result) => {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve(result)
          }
        })
      }
      db.close()
    }
  })
  return deferred.promise
}
module.exports.mongoPool = mongoPool
