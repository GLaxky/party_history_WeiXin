// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database();
  let aid=0
  await db.collection("association")
    .where({
      start_char_id:parseInt(event.start_char_id),
      start_place_id:parseInt(event.start_place_id),
      end_char_id:parseInt(event.end_char_id),
      end_place_id:parseInt(event.end_place_id),
    }) 
    .get()
    .then(res=>{
      aid=res.data[0].association_id
    })
    .catch(err => {
      console.error(err)
    })

    try{
      await db.collection("user_record").add({
        data:{
          association_id:parseInt(aid),
          uid:event.openId
        }
      }
      )
    }catch(e){
      console.error(e)
    }


  return true
  
}