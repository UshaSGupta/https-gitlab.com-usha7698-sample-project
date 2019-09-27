
async function getTablesFromBundle (bundleNo) {
  let deferred = q.defer()
  try {
    connectDatabase(dbQuery['GET'].getTablesFromBundle, [bundleNo])
      .then((dbRes) => {
        deferred.resolve(dbRes.dbData)
      })
      .catch((err) => {
        return deferred.reject(err)
      })
  } catch (error) {
    return deferred.reject(error)
  }

  return deferred.promise
}

async function filterDbWiseTableData (data) {
  let deferred = q.defer()
  let filterArray = []
  try {
    _.each(data, d => {
      let tableNameIdx = filterArray.findIndex((ele) => ele.name === d['db'])
      if (tableNameIdx === -1) {
        filterArray.push({
          id: d.id,
          name: d['db'],
          children: []
        })
      }
      _.each(filterArray, fa => {
        if (d['db'] == fa.name) {
          fa.children.push({
            name: d['tableName']
          })
        }
      })
    })
    deferred.resolve(filterArray)
  } catch (error) {
    return deferred.reject(error)
  }

  return deferred.promise
}

async function getAllTablesFromBundle (req, res) {
  let bundleNo = (req.body.bundleNumber)
  try {
    const bundleData = await getTablesFromBundle(bundleNo)
      .catch(() => {
        res.status(400).send({ message: errorCodeJson['ERR006'].msg })
      })

    const dbWiseTableData = await filterDbWiseTableData(bundleData)
      .catch(() => {
        res.status(400).send({ message: errorCodeJson['ERR006'].msg })
      })

    return res.status(200).send({
      message: 'success',
      data: dbWiseTableData
    })
  } catch (err) {
    return res.status(400).send({ message: errorCodeJson['ERR007'].msg })
  }
}

module.exports.getAllTablesFromBundle = getAllTablesFromBundle
