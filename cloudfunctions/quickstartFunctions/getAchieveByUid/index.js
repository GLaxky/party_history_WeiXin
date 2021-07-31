const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 返回数据库查询结果
  try {
    var personInfo = (await db.collection('character').get()).data;
    var result = await db.collection('user_record').where({
      uid: wxContext.OPENID
    }).get();
    var achieveList = [];
    for (let index = 0; index < result.data.length; index++) {
      const element = result.data[index];
      var temp = await db.collection('association').where({
        association_id: parseInt(element.association_id)
      }).get();
      if (!achieveList.includes(temp.data[0].end_char_id)) {
        achieveList.push(temp.data[0].end_char_id);
      }
    }
    var count = personInfo.length;
    var notAchieveList = []
    //初始化未到达列表
    for (let index = 1; index <= count; index++) {
      notAchieveList.push(index);
    }
    //计算未到达列表
    for (let index = 0; index < achieveList.length; index++) {
      const element = parseInt(achieveList[index]);
      notAchieveList[element - 1] = 0;
    }
    for (let index = 0; index < notAchieveList.length; index++) {
      const element = notAchieveList[index];
      for (let i = 0; i < personInfo.length; i++) {
        if (personInfo[i].char_id == element) {
          personInfo[i].char_id = -1;
          personInfo[i].image_url = "../../images/wenhao.jpg";
          personInfo[i].cname = "???";
        }
      }
    }
    return {
      success: true,
      data: personInfo,
    }
  } catch (e) {
    return {
      success: false,
      errMsg: e
    }
  }
}