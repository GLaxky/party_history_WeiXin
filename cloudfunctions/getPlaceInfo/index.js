// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  return await db.collection("place")
    .where({
      place_id:parseInt(event.place_id)
    })
    .get()
    .then(res=>{
      return {
        _id: res.data[0]._id,
        address: res.data[0].address,
        descrip: res.data[0].descrip,
        image_url: res.data[0].image_url,
        latitude: res.data[0].latitude,
        longitude: res.data[0].longitude,
        place_name: res.data[0].place_name,
        story: res.data[0].story
      }
    }
    ).catch(err => {
      console.error(err)
    })

}