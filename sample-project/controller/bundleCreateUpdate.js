
function createBundle (req, res) {
  let domainName = getDecryptKey(req.body.domainID);
 
 // let domainName = req.body.domainID
  let description = req.body.desc

  try {
   
    connectDatabase(dbQuery['STORE_PROCEDURES'].createBundle, [domainName, description])
      .then((rows) => {
        if (!_.isEmpty(rows.dbData) && !_.isEmpty(rows.dbData[0])) {
          res.status(200).send({
            message: 'success'
          })
        } else {
          return res.status(500).send({ message: errorCodeJson['ERR001'].msg })
        }
      })
      .catch(() => {
        return res.status(500).send({ message: errorCodeJson['ERR001'].msg })
      })
  } catch (err) {
    return res.status(400).send({ message: errorCodeJson['ERR001'].msg })
  }
}

function updateBundleStatus (req, res) {
   let domainName = getDecryptKey(req.body.domainID);
  //let domainName = (req.body.domainID)
  let bundleName = (req.body.bundleName)
  let bStatus = (req.body.Status);
 
  try {
    var qry = dbQuery['UPDATE'].updateBundle + ' ; ' + dbQuery['GET'].getSingleBundle;
  
    connectDatabase(qry, [bStatus, domainName,domainName, bundleName,bundleName])
      .then((rows) => {
        if (!_.isEmpty(rows)) {

           var dataB =getISTTim(rows.dbData[1][0]["releasedOn"]);

          return res.status(200).send({
            message: 'success',
            data :dataB
          })
        } else {
          return res.status(500).send({ message: errorCodeJson['ERR002'].msg })
        }
      })
      .catch(() => {
        return res.status(500).send({ message: errorCodeJson['ERR002'].msg })
      })
  } catch (err) {
    return res.status(400).send({ message: errorCodeJson['ERR002'].msg })
  }
}

function getISTTim (utctime) {
  let d = new Date(utctime)
  return d.toUTCString().replace('GMT','');
};


module.exports.createBundle = createBundle
module.exports.updateBundleStatus = updateBundleStatus
