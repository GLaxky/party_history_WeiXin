// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  aids=[]
  return await db.collection("user_record")
    .where({
      uid:event.openId
    })
    .field({
      association_id:true,
      // _id:false
    })
    .get()
    .then(res=>{
      for(let i=0;i<res.data.length;i++){
        aids.push(res.data[i].association_id)
      }
      for(let i=1;i<=37;i++){
        let a = aids.indexOf(i)
        if(aids.indexOf(i)<0){
          return false;
        }
      }
      return true;
    })
    .catch(err => {
      console.error(err)
    })

    
}