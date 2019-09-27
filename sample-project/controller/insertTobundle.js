
function insertTobundle (req, res) {
  try {
    var headerDetails = JSON.parse(JSON.stringify(req.body.header))
    var dataBody = (JSON.stringify(req.body.dataBody))
    let domainName = getDecryptKey(headerDetails.domainID);
    var dateTime = (new Date().toLocaleDateString()).split('/').reverse().join('-') + ' ' + new Date().toLocaleTimeString()
    connectDatabase(dbQuery['INSERT'].saveBundleData, [null, headerDetails.bundle, headerDetails.db, headerDetails.table, dataBody, domainName, dateTime])
      .then((rows) => {
        if (!_.isEmpty(rows.dbData)) {
          res.status(200).send({
            message: 'success'
          })
        } else {
          return res.status(500).send({ message: errorCodeJson['ERR009'].msg })
        }
      })
      .catch(() => {
        return res.status(500).send({ message: errorCodeJson['ERR009'].msg })
      })
  } catch (err) {
    return res.status(400).send({ message: errorCodeJson['ERR009'].msg })
  }
}

module.exports.insertTobundle = insertTobundle
