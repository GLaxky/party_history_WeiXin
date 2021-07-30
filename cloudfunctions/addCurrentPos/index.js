// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const db = cloud.database();
    await db.collection("user_current_pos").add({
      data:{
        start_char_id:parseInt(event.start_char_id),
        start_place_id:parseInt(event.start_place_id),
        end_char_id:parseInt(event.end_char_id),
        end_place_id:parseInt(event.end_place_id),
        time:new Date(),
        uid:event.openId
      }
    }
    )
  }catch(e){
    console.error(e)
  }
  
  return true
}