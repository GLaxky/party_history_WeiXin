const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 返回数据库查询结果
  var personList=await db.collection('user_persons').where({
    user_id: wxContext.OPENID
  }).get()
  var bool=false
  for (let index = 0; index < personList.data.length; index++) {
    const element = personList.data[index];
    if(element.char_id==event.char_id){
      bool=true
    }
  }
  if(!bool){
  await db.collection('user_persons').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      char_id: Number(event.char_id),
      user_id: wxContext.OPENID
    }
  })
  }
  return {
    data: !bool
  }
}