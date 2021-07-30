const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 返回数据库查询结果
  await db.collection('char_comment').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      char_id: Number(event.char_id),
      uid: wxContext.OPENID,
      comment: event.comment
    }
  })
}