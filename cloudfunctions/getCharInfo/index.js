// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  // console.log(event.char_id);
  return await db.collection("character")
    .where({
      char_id:parseInt(event.char_id)
    })
    .field({             //显示哪些字段
      _id:true,         //默认显示_id，这个隐藏
      birth: true,
      char_id: true,
      cname:true,
      death:true,
      image_url:true,
      intro:true,
      intro:true,
      masterpieces:true,
      story:true
    })
    .limit(1) 
    .get()
    .then(res=>{
      return{
        _id: res.data[0]._id,
        birth: res.data[0].birth,
        char_id: res.data[0].char_id,
        cname: res.data[0].cname,
        death: res.data[0].death,
        image_url: res.data[0].image_url,
        intro: res.data[0].intro,
        masterpieces:res.data[0].masterpieces,
        story: res.data[0].story
      }
    })
    .catch(err => {
      console.error(err)
    })
}