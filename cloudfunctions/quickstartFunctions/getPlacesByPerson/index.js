const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  try {
    var result=await db.collection('people_in_place').where({
      char_id: parseInt(event.data)
    }).get();
    var data=[];
    for (let index = 0; index < result.data.length; index++) {
      const element = result.data[index];
      var temp=await db.collection('place').where({
        place_id: parseInt(element.place_id)
      }).get();
      data.push(temp.data[0]);
    }
    return {
      success: true,
      record: result,
      data: data
    }
  } catch (e) {
    return {
      success: false,
      errMsg: e
    }
  }
}