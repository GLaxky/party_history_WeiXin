const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  try {
    return {
      success: true,
      data: await db.collection('character').where({
        char_id: parseInt(event.data)
      }).get(),
      event_data: parseInt(event.data)
    }
  } catch (e) {
    return {
      success: false,
      errMsg: e
    }
  }
}