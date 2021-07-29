// miniprogram/pages/map/map.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    coreLongitude:0,
    corLatitude:0,
    markers:[],
    start_char_id:0,
    start_place_id:0,
    end_char_id:0,
    end_place_id:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if(options.start_char_id==null){
      //如果起始点为null
      let tmp=[];
      
      let tmpCharInfo=await this.getCharInfo(options.end_char_id);
      console.log(tmpCharInfo)
      let tmpPlaceInfo=await this.getPlaceInfo(options.end_place_id);
      console.log(tmpPlaceInfo)
      tmp.push({
        id: 1,
        latitude: parseFloat(tmpPlaceInfo.latitude),
        longitude: parseFloat(tmpPlaceInfo.longitude),
        width: 35,
        height: 45,
        label: {
          content: tmpCharInfo.cname+tmpPlaceInfo.place_name,
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
      });
      this.setData({
        start_char_id:0,
        start_place_id:0,
        end_char_id:options.end_char_id,
        end_place_id:options.end_place_id,
        markers:tmp,
        coreLongitude:parseFloat(tmpPlaceInfo.longitude),
        coreLatitude:parseFloat(tmpPlaceInfo.latitude)
      })
    }else{
      let tmp=[];
      let tmpStartCharInfo=await this.getCharInfo(options.Start_char_id);
      let tmpStartPlaceInfo=await this.getPlaceInfo(options.Start_place_id);
      let tmpEndCharInfo=await this.getCharInfo(options.end_char_id);
      let tmpEndPlaceInfo=await this.getPlaceInfo(options.end_place_id);
      tmp.push({
        id: 0,
        latitude: parseFloat(tmpStartPlaceInfo.latitude),
        longitude: parseFloat(tmpStartPlaceInfo.longitude),
        width: 35,
        height: 45,
        label: {
          content: tmpStartCharInfo.cname+"\n"+tmpStartPlaceInfo.place_name,
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
      });
      tmp.push({
        id: 1,
        latitude: parseFloat(tmpEndPlaceInfo.latitude),
        longitude: parseFloat(tmpEndPlaceInfo.longitude),
        width: 35,
        height: 45,
        label: {
          content: tmpEndCharInfo.cname+"\n"+tmpEndPlaceInfo.place_name,
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
      });
      this.setData({
        start_char_id:options.start_char_id,
        start_place_id:options.start_place_id,
        end_char_id:options.end_char_id,
        end_place_id:options.end_place_id,
        markers:tmp,
        coreLongitude:parseFloat(tmpEndPlaceInfo.longitude),
        coreLatitude:parseFloat(tmpEndPlaceInfo.latitude)
      })

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

  goBackToHome(){
    
  },

  getCharInfo:async function(cid){
    return new Promise(function(resolve, reject){
      wx.cloud.callFunction({
        name: 'getCharInfo',
        data: {
          char_id: cid
        },
        success: res => {
          console.log("getCharInfo"+res.result)
          resolve(res.result)
        }
      })
      
      })
    

  },
  getPlaceInfo:async function(pid){
    return new Promise(function(resolve, reject){
      wx.cloud.callFunction({
        name: 'getPlaceInfo',
        data: {
          place_id: pid
        },
        success: res => {
          console.log("getPlaceInfo"+res.result)
          resolve(res.result)
        }
        })
      })
    
    },
    
    showPopup() {
      this.setData({ show: true });
    },
  
    onClose() {
      this.setData({ show: false });
    },
    
  }
)