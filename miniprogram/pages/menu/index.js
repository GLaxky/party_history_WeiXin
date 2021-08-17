// miniprogram/pages/menu/index.js

const app = getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    show2: false,
    checkFull: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let flag=false;
    let that =this;
    wx.cloud.callFunction({
      name: 'checkFullAchievement',
      data: {
        openId: app.globalData.user_openId
      },
      success: res => {
        console.log("checkFullAchievement"+res.result)
        flag=res.result
        that.setData({
          checkFull:flag
        })
      }
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

  showPopup1() {
    this.setData({ show1: true });
  },

  onClose1() {
    this.setData({ show1: false });
  },

  showPopup2() {
    this.setData({ show2: true });
  },

  onClose2() {
    this.setData({ show2: false });
  },

  goToChooseCoreChar(){
    wx.navigateTo({
      url: '../chooseCoreChar/index',
      success: function(res){},
      fail: function() {},
      complete: function() {}
    })
  },

  goToMap:async function(){
    let tmp =await this.getLastPosition()
      if(tmp==null){
        wx.navigateTo({
          url: `/pages/chooseCoreChar/index`,
        })
      }else{
        if(tmp.start_char_id==0){
          wx.navigateTo({
            url: `/pages/map/map?end_char_id=${tmp.end_char_id}&end_place_id=${tmp.end_place_id}`,
          })
        }else{
          wx.navigateTo({
            url: `/pages/map/map?start_char_id=${tmp.start_char_id}&start_place_id=${tmp.start_place_id}&end_char_id=${tmp.end_char_id}&end_place_id=${tmp.end_place_id}`,
          })
        }
      }
  },

  goToPersonAchievement(){
    wx.navigateTo({
      url: '../personAchievement/index',
      success: function(res){},
      fail: function() {},
      complete: function() {}
    })
  },

  goToPlaceAchievement(){
    wx.navigateTo({
      url: '../placeAchievement/index',
      success: function(res){},
      fail: function() {},
      complete: function() {}
    })
  },

  goToCharMap(){
    wx.navigateTo({
      url: '../charMap/index',
      success: function(res){},
      fail: function() {},
      complete: function() {}
    })
  },

  getLastPosition:async function(){
    return new Promise(function(resolve, reject){
      wx.cloud.callFunction({
        name: 'getLastPosition',
        data: {
          openId: app.globalData.user_openId,
        },
        success: res => {
          console.log("getLastPosition"+res.result)
          resolve(res.result)
        }
        })
      })
  },

  goToEnd(){
    wx.navigateTo({
      url: '../end/index',
      success: function(res){},
      fail: function() {},
      complete: function() {}
    })
  }

})