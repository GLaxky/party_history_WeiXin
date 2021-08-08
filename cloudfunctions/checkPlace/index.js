// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  aids=[]
  await db.collection("user_record")
    .where({
      uid:event.openId
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
    list=[]
    for(let i=0;i<aids.length;i++){
      await db.collection("association")
    .where({
      association_id:aids[i].association_id
    })
    .field({
      end_place_id:true
    })
    .get()
    .then(res=>{
      // if(res.data[0].end_place_id==event.pid){
      //   return true
      // }
      list.push(res.data[0].end_place_id)
    })
    .catch(err => {
      console.error(err)
    })
    }

    return list
}