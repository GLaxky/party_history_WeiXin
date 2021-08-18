// miniprogram/pages/placeAchievement/placeAchievement.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    left_list_val: 0,
    markers:[],
    bigPlaces:[],
    smallPlace:[
      [],[],[],[],[],
    ],
    coreLatituse:0,
    coreLongitude:0,
    option1: [
      { text: '请选择地区', value: 0 },
      { text: '上海地区', value: 1 },
      { text: '武汉地区', value: 2 },
      { text: '北京地区', value: 3 },
      { text: '山东地区', value: 4 },
      { text: '长沙地区', value: 5 },
    ],
    value1: 0,
    check:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    
    let types=[
      "ALL","上海","武汉","北京","山东","长沙",
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
    let tmp=[];
    for(let i=1;i<types.length;i++){
      tmp.push({
        id:0,
        latitude: points[i].latitude,
        longitude:points[i].longitude,
        width: 35,
        height: 45,
        // callout: {
        //   content: types[i],
        //   color: '#ff0000',
        //   fontSize: 14,
        //   borderWidth: 2,
        //   borderRadius: 10,
        //   borderColor: '#000000',
        //   bgColor: '#fff',
        //   padding: 10,
        //   display: 'BYCLICK',
        //   textAlign: 'center',
        //   anchorX:0,
        //   anchorY:0
        // }
      })
    }
    this.setData({
      markers:tmp,
      bigPlaces:tmp,
      coreLatituse:31.227552,
      coreLongitude:114.305177,
    })

    let checkPlace = await this.checkPlaceExplored();
    let tmp1=[];
    for(let j=1;j<types.length;j++){
      let tmp2=[]
      const db = wx.cloud.database();
      await db.collection("place")
      .where({
        big_place:parseInt(j)
      })
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
      
      for(let i=0;i<res.data.length;i++){
        if(checkPlace.indexOf(parseInt(res.data[i].place_id))>=0){
          tmp2.push({
            iconPath:"../../images/打卡奖杯.png",
            id: parseInt(res.data[i].place_id),
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
        }else{
          tmp2.push({
            id: -1,
            iconPath:"../../images/未打卡奖杯.png",
            latitude: parseFloat(res.data[i].latitude),
            longitude: parseFloat(res.data[i].longitude),
            width: 35,
            height: 45,
            callout: {
              content: "待探索",
              color: 'gray',
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
        
      }
      
    }
    )
    tmp1.push({index:j,
              data:tmp2});
    
    }
    this.setData({
      smallPlace:tmp1,
      check:checkPlace,
    })
  
    
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
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
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
  onChange(e){
    if(e.detail==0){
      this.setData({
        markers:this.data.bigPlaces
      })
      return
    }
    for(let i=0;i<this.data.smallPlace.length;i++){
      if(this.data.smallPlace[i].index==e.detail){
        this.setData({
          markers:this.data.smallPlace[i].data,
        })
        break
      }
    }
    
  },

  goToPlaceInfo(e){
    if(e.detail.markerId==-1){
      Toast({
        message: '该地点未解锁，快去探索吧！',
        forbidClick: true,
      });
    }else if(e.detail.markerId==0){
      Toast({
        message: '请先选择上方的地区噢~',
        forbidClick: true,
      });
    }else{
      wx.navigateTo({
            url:`/pages/placeInfo/index?place_id=${e.detail.markerId}&envId=cloud-environment-6e21xvc5d21990`
          })

    }
    
  },

  checkPlaceExplored:async function(){
      return new Promise(function(resolve, reject){
        wx.cloud.callFunction({
          name: 'checkPlace',
          data: {
            openId:getApp().globalData.user_openId
          },
          success: res => {
            console.log("checkPlaceExplored "+res.result)
            resolve(res.result)
          }
          })
        })
  }
})