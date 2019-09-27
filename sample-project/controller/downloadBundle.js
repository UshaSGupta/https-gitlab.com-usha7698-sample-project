// let fs = require('fs')

async function getBundleData (bundleNo) {
  let deferred = q.defer()
  try {
    console.log(dbQuery['GET'].getBundleData);
    connectDatabase(dbQuery['GET'].getBundleData, [bundleNo])
      .then((dbRes) => {
        deferred.resolve(dbRes)
      })
      .catch((err) => {
        return deferred.reject(err)
      })
  } catch (error) {
    return deferred.reject(error)
  }

  return deferred.promise
}

async function formatBundleData (bundleDetails) {
  let deferred = q.defer()
  try {
    _.each(bundleDetails.dbData, (bd) => {
      bd.data = JSON.parse(bd.data)
      let arrVal = _.map(bd.data, baa => {
        return Object.values(baa)
      })
      bd.data = arrVal
    })
    deferred.resolve(bundleDetails.dbData)
  } catch (error) {
    return deferred.reject(error)
  }

  return deferred.promise
}

async function generateSqlFile (tableValues) {
  let deferred = q.defer()
  let resultArray = []
  let tableValueString = ''
  // let dir
  let comma = ''
  let resultFinal = ''
  try {
    // console.log('tableValues', tableValues)
    tableValues.forEach((arr) => {
      arr.data.forEach((ar) => {
        ar.forEach((ele, idx) => {
          if (ar.length !== idx + 1) {
            comma = ','
          } else {
            comma = ''
          }
          if ((ele == null)) {
            tableValueString += `${ele}${comma}`
          } else {
            tableValueString += `'${ele}'${comma}`
          }

          if (ar.length === idx + 1) {
            resultArray.push({
              insertQry: (tableValueString),
              tableName: arr.tableName
            })
          }
        })
        tableValueString = ''
      })
    })
    _.each(resultArray, ra => {
      let insertValue = JSON.parse(JSON.stringify(ra.insertQry))
      resultFinal += `INSERT INTO ${ra.tableName} VALUES  (${insertValue});\n`
    })
    // console.log('resultArray', resultArray)
    // return false
    // let currentDate = (new Date().toLocaleDateString()).split('/').reverse().join('-')
    // dir = (`./unProcessedFiles/${currentDate}.sql`)
    // let delQry = (`DELETE FROM ${tableName} WHERE ${columName} IN (${valueString});`)
    // if (fs.existsSync(dir)) {
    // console.log('exists')
    //   fs.unlinkSync(dir, 0, function (err) {
    //     if (err) {
    //       return deferred.reject({
    //         message: err
    //       })
    //     }
    //   })
    // }
    // fs.appendFileSync(dir, delQry + '\n', 'utf8',
    //   function (err) {
    //     if (err) {
    //       return deferred.reject({
    //         message: err
    //       })
    //     }
    //   })
    // resultArray.forEach((ra) => {
    //   let insertValue = JSON.parse(JSON.stringify(ra.insertQry))
    //   let query = [(`INSERT INTO ${ra.tableName} VALUES  (${insertValue});`)]
    //   // console.log('insertValue', query)
    //   fs.appendFileSync(dir, query.join(', ') + '\n', 'utf8',
    //     function (err) {
    //       if (err) {
    //         return deferred.reject({
    //           message: err
    //         })
    //       }
    //     })
    // })
  } catch (error) {
    return deferred.reject({
      message: error
    })
  }
  deferred.resolve(resultFinal)

  return deferred.promise
}

async function downloadBundle (req, res) {
  let bundleNo = req.body.bundleName
  // console.log('bundleNo', bundleNo)
  try {
    const bundleData = await getBundleData(bundleNo)
      .catch(() => {
      return  res.status(400).send({ message:  errorCodeJson['ERR006'].msg })
      })
    const formatDataForStoringFile = await formatBundleData(bundleData)
      .catch(() => {
        return   res.status(400).send({  message: errorCodeJson['ERR006'].msg })
      })
    const fileGenerated = await generateSqlFile(formatDataForStoringFile)
      .catch(() => {
        return   res.status(400).send({ message: errorCodeJson['ERR006'].msg })
      })
    return res.status(200).send({
      data: fileGenerated
    })
  } catch (error) {
    return res.status(400).send({ message: errorCodeJson['ERR006'].msg })
  }
}

module.exports.downloadBundle = downloadBundle
