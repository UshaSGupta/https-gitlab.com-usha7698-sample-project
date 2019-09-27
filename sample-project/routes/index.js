var express = require('express')
var router = express.Router()

const commonFunctions = require('../commonFunctions.js/common')
let getUrlPrefix = commonFunctions.getUrlPrefix()
const bundleCreateUpdate = require('../controller/bundleCreateUpdate')
const getBundles = require('../controller/getBundles')
const downloadBundleController = require('../controller/downloadBundle')
const getAllTablesFromBundleController = require('../controller/getAllTablesFromBundle')
const insertTobundle = require('../controller/insertTobundle')
const getBundleInfoData = require('../controller/getBundleInfoData')
// const getBundleInfoData = require('../controller/getBundleInfoData')
const getTableDataFromBundleController = require('../controller/getTableDataFromBundle');
const filterBundle = require('../controller/filterBundle')
/* GET home page. */
console.log('getUrlPrefix: ' + getUrlPrefix)
router.post(getUrlPrefix + '/createBundle', function (req, res, next) {
  bundleCreateUpdate.createBundle(req, res, next)
})

router.post(getUrlPrefix + '/updateBundleStatus', function (req, res, next) {
  bundleCreateUpdate.updateBundleStatus(req, res, next)
})

router.post(getUrlPrefix + '/getAvailableBundle', function (req, res, next) {
  getBundles.getAvailableBundle(req, res, next)
})

router.post(getUrlPrefix + '/getAllBundles', function (req, res, next) {
  getBundles.getAllBundle(req, res, next)
})

router.post(getUrlPrefix + '/getReleaseBundles', function (req, res, next) {
  getBundles.getReleaseBundle(req, res, next)
})

router.post(getUrlPrefix + '/downloadBundle', function (req, res) {
  downloadBundleController.downloadBundle(req, res)
})

router.post(getUrlPrefix + '/getAllTablesFromBundle', function (req, res) {
  getAllTablesFromBundleController.getAllTablesFromBundle(req, res)
})

router.post(getUrlPrefix + '/insertTobundle', function (req, res) {
  insertTobundle.insertTobundle(req, res)
})

router.post(getUrlPrefix + '/getDataVersion', function (req, res) {
  getBundleInfoData.getDataVersion(req, res)
})

router.post(getUrlPrefix + '/getTableDataFromBundle', function (req, res) {
  getTableDataFromBundleController.getTableDataFromBundle(req, res)
})

router.post(getUrlPrefix + '/filterBundles', function (req, res) {
  filterBundle.filterBundles(req, res)
})

module.exports = router
