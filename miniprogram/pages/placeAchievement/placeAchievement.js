// miniprogram/pages/placeAchievement/placeAchievement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left_list_val: 0,
    markers:[],
    coreLatituse:0,
    coreLongitude:0,
    option1: [
      { text: '大地点', value: 0 },
      { text: '上海', value: 1 },
      { text: '武汉', value: 2 },
      { text: '北京', value: 3 },
      { text: '济南', value: 4 },
      { text: '长沙', value: 5 },
    ],
    value1: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    let types=[
      "ALL","上海","武汉","北京","济南","长沙",
    ];
    let points=[
      {
        latitude:0,
        longitude:0
      },
      {
        latitude:31.227552,
        longitude:121.48231
      },
      {
        latitude:30.552022,
        longitude:114.305177
      },
      {
        latitude:39.998877,
        longitude:116.316833
      },
      {
        latitude:36.65633,
        longitude:117.121728
      },
      {
        latitude:28.036954,
        longitude:113.507539
      },
    ];
    if(parseInt(options.type)==0){
      let tmp=[];
      for(let i=1;i<types.length;i++){
        tmp.push({
          id: i,
          latitude: points[i].latitude,
          longitude:points[i].longitude,
          width: 35,
          height: 45,
          callout: {
            content: types[i],
            color: '#ff0000',
            fontSize: 14,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#000000',
            bgColor: '#fff',
            padding: 10,
            display: 'ALWAYS',
            textAlign: 'center',
            anchorX:0,
            anchorY:0
          }
        })
      }
      this.setData({
        value1:0,
        markers:tmp,
        coreLatituse:31.227552,
        coreLongitude:114.305177,
      })
    }else{
      for(let j=1;j<types.length;j++){
        let tmp=[];
        db.collection("place")
       .field({             
        _id:false, 
        place_id:true,        
        latitude:true,
        longitude:true,
        place_name:true,
        big_place:true,
      })
      .get()
      .then(res=>{
        if(res)
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].big_place!=j){
            continue;
          }
          tmp.push({
            id: parseFloat(res.data[i].place_id),
            latitude: parseFloat(res.data[i].latitude),
            longitude: parseFloat(res.data[i].longitude),
            width: 35,
            height: 45,
            callout: {
              content: res.data[i].place_name,
              color: '#ff0000',
              fontSize: 14,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#000000',
              bgColor: '#fff',
              padding: 10,
              display: 'ALWAYS',
              textAlign: 'center',
              anchorX:0,
              anchorY:0
            }
          })
        }
        this.setData({
          value1:j,
          markers:tmp
        })
      }
      )
      break;
      }
    }
  
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onChange(value){
    // let u="/pages/placeAchievement/placeAchievement?type="+toString(this.data.value1)
    // wx.navigateTo({
    //   url:u
    // })
    this.setData({
      
    })

  }
})