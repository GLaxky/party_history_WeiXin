const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 返回数据库查询结果
  var placeList=await db.collection('user_places').where({
    user_id: wxContext.OPENID
  }).get()
  var bool=false
  for (let index = 0; index < placeList.data.length; index++) {
    const element = placeList.data[index];
    if(element.place_id==event.place_id){
      bool=true
    }
  }
  if(!bool){
  await db.collection('user_places').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      place_id: Number(event.place_id),
      user_id: wxContext.OPENID
    }
  })
  }
  return {
    data: !bool
  }
}