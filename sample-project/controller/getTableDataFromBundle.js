function getTableDataFromBundle (req, res) {
  let reqBody = req.body
  let bundleName = reqBody.bundleName
  let dbName = reqBody.db
  let tableName = reqBody.tableName
  try {
    connectDatabase(dbQuery['GET'].viewTableDataFromBundle, [bundleName, dbName, tableName])
      .then((rows) => {
        try {
          let resultArray = []
          if (!_.isEmpty(rows.dbData)) {
            let dbData = rows.dbData
            _.each(dbData, dd => {
              dd.data = JSON.parse(dd.data)
              if (Array.isArray(dd.data)) {
                _.each(dd.data, ddd => {
                  resultArray.push(ddd)
                })
              }
            })
            res.status(200).send({
              message: 'success',
              data: resultArray
            })
          } else {
            return res.status(500).send({ message: errorCodeJson['ERR008'].msg })
          }
        } catch (error) {
          return res.status(500).send({ message: errorCodeJson['ERR008'].msg })
        }
      })
      .catch(() => {
        return res.status(500).send({ message: errorCodeJson['ERR008'].msg })
      })
  } catch (err) {
    return res.status(400).send({ message: errorCodeJson['ERR008'].msg })
  }
}

module.exports.getTableDataFromBundle = getTableDataFromBundle
