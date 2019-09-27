
function getAvailableBundle (req, res) {
 // let domainName = (req.body.domainID)
  let domainName = getDecryptKey(req.body.domainID);
  let bStatus = 'open'
  try {
    connectDatabase(dbQuery['GET'].getOpenReleaseBundle, [bStatus])
      .then((rows) => {
        if (!_.isEmpty(rows.dbData)) {
          res.status(200).send({
            message: 'success',
            data: rows.dbData
          })
        } else {
          return res.status(500).send({ message: errorCodeJson['ERR003'].msg })
        }
      })
      .catch(() => {
        return res.status(500).send({ message: errorCodeJson['ERR003'].msg })
      })
  } catch (err) {
    return res.status(400).send({ message: errorCodeJson['ERR003'].msg })
  }
}

function getAllBundle (req, res) {
 // let domainName = (req.body.domainID);
  let domainName = getDecryptKey(req.body.domainID);
 
  try {
    connectDatabase(dbQuery['GET'].getBundles,[domainName])
      .then((rows) => {
        if (!_.isEmpty(rows.dbData)) {
          res.status(200).send({
            message: 'success',
            data: rows.dbData
          })
        } else {
          return res.status(500).send({ message: errorCodeJson['ERR005'].msg })
        }
      })
      .catch(() => {
        return res.status(500).send({ message: errorCodeJson['ERR005'].msg })
      })
  } catch (err) {
    return res.status(400).send({ message: errorCodeJson['ERR005'].msg })
  }
}

function getReleaseBundle (req, res) {
  //let domainName = (req.body.domainID)
  let domainName = getDecryptKey(req.body.domainID);
  let bStatus = 'release'
  try {
    connectDatabase(dbQuery['GET'].getOpenReleaseBundle, [bStatus])
      .then((rows) => {
        if (!_.isEmpty(rows.dbData)) {
          res.status(200).send({
            message: 'success',
            data: rows.dbData
          })
        } else {
          return res.status(500).send({ message: errorCodeJson['ERR004'].msg })
        }
      })
      .catch(() => {
        return res.status(500).send({ message: errorCodeJson['ERR004'].msg })
      })
  } catch (err) {
    return res.status(400).send({ message: errorCodeJson['ERR004'].msg })
  }
}

module.exports.getAvailableBundle = getAvailableBundle
module.exports.getAllBundle = getAllBundle
module.exports.getReleaseBundle = getReleaseBundle
