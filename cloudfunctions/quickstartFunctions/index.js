const getOpenId = require('./getOpenId/index')
const getMiniProgramCode = require('./getMiniProgramCode/index')
const createCollection = require('./createCollection/index')
const selectRecord = require('./selectRecord/index')
const updateRecord = require('./updateRecord/index')
const sumRecord = require('./sumRecord/index')
const getPersonInfo = require('./getPersonInfo/index')
const getPersonById = require('./getPersonById/index')
const getPlaceById = require('./getPlaceById/index')
const getCommentById = require('./getCommentById/index')
const getPlacesByPerson = require('./getPlacesByPerson/index')
const getAchieveByUid = require('./getAchieveByUid/index')
const insertComment = require('./insertComment/index')
const isNewPerson = require('./isNewPerson/index')
const isNewPlace = require('./isNewPlace/index')


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context)
    case 'getMiniProgramCode':
      return await getMiniProgramCode.main(event, context)
    case 'createCollection':
      return await createCollection.main(event, context)
    case 'selectRecord':
      return await selectRecord.main(event, context)
    case 'updateRecord':
      return await updateRecord.main(event, context)
    case 'sumRecord':
      return await sumRecord.main(event, context)
    case 'getPersonInfo':
      return await getPersonInfo.main(event, context)
    case 'getPersonById':
      return await getPersonById.main(event, context)
    case 'getPlaceById':
      return await getPlaceById.main(event, context)
    case 'getCommentById':
      return await getCommentById.main(event, context)
    case 'getPlacesByPerson':
      return await getPlacesByPerson.main(event, context)
    case 'getAchieveByUid':
      return await getAchieveByUid.main(event, context)
    case 'insertComment':
      return await insertComment.main(event, context)
    case 'isNewPerson':
      return await isNewPerson.main(event, context)
    case 'isNewPlace':
      return await isNewPlace.main(event, context)
  }
}
