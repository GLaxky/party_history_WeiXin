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

    for(let i=1;i<=37;i++){
      if(aids.indexOf(i)<0){
        return false;
      }
    }
  return true;
}