// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  return await db.collection("association")
    .where({
      start_char_id:parseInt(event.start_char_id),
      start_place_id:parseInt(event.start_place_id),
      end_char_id:parseInt(event.end_char_id),
      end_place_id:parseInt(event.end_place_id),
    }) 
    .get()
    .then(res=>{
      return res.data[0].content
    })
    .catch(err => {
      console.error(err)
    })
}