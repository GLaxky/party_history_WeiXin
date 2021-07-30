// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  return await db.collection("user_current_pos")
    .where({
      uid:event.openId
    })
    .orderBy('time', 'desc')
    .get()
    .then(res=>{
      return {
        start_char_id:res.data[0].start_char_id,
        start_place_id:res.data[0].start_place_id,
        end_char_id:res.data[0].end_char_id,
        end_place_id:res.data[0].end_place_id,
      }
    }
    ).catch(err => {
      console.error(err)
    })
}