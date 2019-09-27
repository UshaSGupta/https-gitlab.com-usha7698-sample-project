/* createBundle API - To Create Bundle */
/** 
 * @route POST /createBundle
 * @param {Data.model} data.body.required the body
 * @return {object} 200 
 * @return {Error} default - Unexpected error
 */
/**
* @typedef Data
* @property {string} domainID.required
*/
/**
* @typedef Error
* @property {string} message.required
*/

/* getAvailableBundle API - get Available Bundle */
/** 
 * @route POST /getAvailableBundle
 * @param {Data.model} data.body.required the body
 * @return {object} 200 
 * @return {Error} default - Unexpected error
 */
/**
* @typedef Error
* @property {string} message.required
*/

/* getAllBundles API - get All Bundles */
/** 
 * @route POST /getAllBundles
 * @param {Data.model} data.body.required the body
 * @return {object} 200 
 * @return {Error} default - Unexpected error
 */
/**
* @typedef Error
* @property {string} message.required
*/

/* getReleaseBundles API - get Release Bundles */
/** 
 * @route POST /getReleaseBundles
 * @param {Databundles.model} data.body.required the body 
 * @return {object} 200 
 * @return {Error} default - Unexpected error
 */
/**
* @typedef Databundles
* @property {string} domainID.required
* @property {string} bundleName.required
* @property {string} bStatus.required
*/
/**
* @typedef Error
* @property {string} message.required
*/

/* getAllTablesFromBundle API - get All Tables From Bundle */
/** 
 * @route POST /getAllTablesFromBundle
 * @param {Datatablefrombundle.model} data.body.required the body 
 * @return {object} 200 
 * @return {Error} default - Unexpected error
 */
/**
* @typedef Datatablefrombundle
* @property {string} bundleName.required
* @property {string} db.required
* @property {string} tableName.required
*/
/**
* @typedef Error
* @property {string} message.required
*/

/* downloadBundle  API - download Bundle  */
/** 
 * @route POST /downloadBundle 
 * @param {Databundlename.model} data.body.required the body 
 * @return {object} 200 
 * @return {Error} default - Unexpected error
 */
/**
* @typedef Databundlename
* @property {string} bundleName.required
*/
/**
* @typedef Error
* @property {string} message.required
*/

/* getTableDataFromBundle    API - get Table Data From Bundle    */
/** 
 * @route POST /getTableDataFromBundle   
 * @param {Datagettablebundle.model} data.body.required the body 
 * @return {object} 200 
 * @return {Error} default - Unexpected error
 */
/**
* @typedef Datagettablebundle
* @property {string} bundleName.required
* @property {string} db.required
* @property {string} tableName.required
*/
/**
* @typedef Error
* @property {string} message.required
*/

/* insertTobundle    API - insert To bundle    */
/** 
 * @route POST /insertTobundle   
 * @param {datainserttobundle.model} data.body.required the body  
 * @return {object} 200 
 * @return {Error} default - Unexpected error
 */
/**
* @typedef Insertdata
* @property {string} id.required
* @property {string} EPNo.required
* @property {string} name.required
* @property {string} company.required
* @property {string} track.required
* @property {string} date.required
* @property {string} inTime.required
* @property {string} outTime.required
* @property {string} totalHours.required
* @property {string} days.required
*/
/**
 * @typedef header
 * @property {string} domainID.required
 * @property {string} bundle.required
 * @property {string} db.required
 * @property {string} table.required
 */
/**
 * @typedef datainserttobundle
 * @property {header.model} header.required
 * @property {Array.<Insertdata>} dataBody.required
 */
/**
* @typedef Error
* @property {string} message.required
*/

/* getDataVersion    API - get Data Version    */
/** 
 * @route POST /getDataVersion   
 * @param {dataversion.model} data.body.required the body  
 * @return {object} 200 
 * @return {Error} default - Unexpected error
 */
/**
* @typedef Insertdata1
* @property {string} id.required
* @property {string} EPNo.required
* @property {string} name.required
* @property {string} company.required
* @property {string} track.required
* @property {string} date.required
* @property {string} inTime.required
* @property {string} outTime.required
* @property {string} totalHours.required
* @property {string} days.required
*/
/**
 * @typedef header1
 * @property {string} domainID.required
 * @property {string} db.required
 * @property {string} table.required 
 */
/**
 * @typedef dataversion
 * @property {header1.model} header.required
 * @property {Array.<Insertdata1>} dataBody.required
 */
/**
* @typedef Error
* @property {string} message.required
*/

/* filterBundles  API - filter Bundles  */
/** 
 * @route POST /filterBundles 
 * @param {Datafilterbundle.model} data.body.required the body 
 * @return {object} 200 
 * @return {Error} default - Unexpected error
 */
/**
* @typedef Datafilterbundle
* @property {string} domainID.required
* @property {string} status.required
* @property {string} viewDomainID.required
* @property {string} from.required
* @property {string} to.required
*/
/**
* @typedef Error
* @property {string} message.required
*/