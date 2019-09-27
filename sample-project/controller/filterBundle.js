
function filterBundles (req, res) {
   
  
  let domainName = (req.body.domainID)
   // let open = (req.body.open)

   try{
    let status = (req.body.status)
    let viewDomainID = getDecryptKey(req.body.viewDomainID);// (req.body.viewDomainID)
    let from = (req.body.from)
    let to = (req.body.to);
    let newfrom;
    let newto;
    let arrayStatus = status.split(",");
    var qryDomain = "";
    var qrystatus = "";
    let dateqry = "";
    var  finalQry = "";


    if(!_.isEmpty(from))
    {
      //  newfrom = from.split("-").reverse().join("-");
      //  newto = to.split("-").reverse().join("-");
      newfrom = from;
      newto = to;
      dateqry = " and CAST(createdOn AS DATE)  BETWEEN '" +  newfrom + "' and '" +  newto + "'"
    } 
  
    if(viewDomainID !== 'all')
    {
      qryDomain = " createdBy = '" + viewDomainID +"'"
    }
    var qry = "SELECT * FROM YTLBUNDLE WHERE " 
   
    let qryStatusVal  = "";
   for(i in arrayStatus)
    {    
       let comma = "";
            if(i != 0)
              {
                  comma = ","
              }
      qryStatusVal = qryStatusVal   + comma + "'" + arrayStatus[i] + "'";
    }
    qrystatus = " and status in (" + qryStatusVal + ")";
     finalQry = qry + qryDomain + qrystatus + dateqry;

  } catch(err)
  {
    console.log(err);
  }
    try {
     
      connectDatabase(finalQry)
        .then((rows) => {
          if (!_.isEmpty(rows.dbData)) {
              for(i in rows.dbData)
              {
               
                rows.dbData[i]["createdOn"] = getISTTim(rows.dbData[i]["createdOn"]);
                rows.dbData[i]["changedOn"] = getISTTim(rows.dbData[i]["changedOn"]);
                rows.dbData[i]["releasedOn"] = getISTTim(rows.dbData[i]["releasedOn"]);
              }
        
            res.status(200).send({
              message: 'success',
              data: rows.dbData
            })
          } else {
            return res.status(200).send({ message: errorCodeJson['ERR010'].msg })
          }
        })
        .catch(() => {
          return res.status(500).send({ message: errorCodeJson['ERR005'].msg })
        })
    } catch (err) {
      return res.status(400).send({ message: errorCodeJson['ERR005'].msg })
    }
  }

  function getISTTim (utctime) {
    if(!_.isEmpty(utctime))
    {
      let d = new Date(utctime)
      return d.toUTCString().replace('GMT','');
    } else{
      return "";
    }
   
  };
  module.exports.filterBundles = filterBundles