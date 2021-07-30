// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  return await db.collection("association")
    .where({
      start_place_id:parseInt(event.place_id),
      start_char_id:parseInt(event.char_id)
    })
    .get()
    .then(res=>{
      let tmp=[]
      for(let i=0;i<res.data.length;i++){
        tmp.push({
          relation:res.data[i].relation,
          end_char_id:res.data[i].end_char_id,
          end_place_id:res.data[i].end_place_id,
        })
      }
      return {
        list:tmp
      }
    }
    ).catch(err => {
      console.error(err)
    })
}