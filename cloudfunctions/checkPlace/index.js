// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  // console.log(event.char_id);
  aids=[]
  await db.collection("user_record")
    .where({
      uid:parseInt(event.openId)
    })
    .field({
      association_id:true
    })
    .get()
    .then(res=>{
      aids=res.data
    })
    .catch(err => {
      console.error(err)
    })

    for(let i=0;i<aids.length;i++){
      await db.collection("association")
    .where({
      association_id:aids[i]
    })
    .field({
      end_place_id:true
    })
    .get()
    .then(res=>{
      if(res.data[0].end_place_id==event.pid){
        return true
      }
    })
    .catch(err => {
      console.error(err)
    })
    }

    return false
}