
function getDataVersion (req, res) {
  try {
    let headerDetails = JSON.parse(JSON.stringify(req.body.header))
    let dataBody = (JSON.stringify(req.body.dataBody))
    let exeQry = "set @row_number = 0;SELECT (@row_number:=@row_number + 1) as version,YTLBUNDLE.description,YTLBUNDLEDATA.* FROM YTLBUNDLEDATA left join YTLBUNDLE on YTLBUNDLE.bundleName = YTLBUNDLEDATA.bundle WHERE JSON_CONTAINS(data,'" + dataBody + "')  and db like '" + headerDetails.db + "' and tableName like '" + headerDetails.table + "' order by YTLBUNDLEDATA.id asc"
   
   
    connectDatabase(exeQry)
  
      .then((rows) => {
        console.log('rows', rows)
        if (!_.isEmpty(rows.dbData)) {
          _.each(rows.dbData, rdb => {
            rdb.data = rdb.data
          })
          res.status(200).send({
            message: 'success',
            data: rows.dbData
          })
        } else {
          return res.status(500).send({ message: 1 + errorCodeJson['ERR008'].msg })
        }
      })
      .catch((err) => {        
        return res.status(500).send({ message:2 + err })
      })
  } catch (err) {
    return res.status(500).send({ message:3 + errorCodeJson['ERR008'].msg })
  }
}
module.exports.getDataVersion = getDataVersion
