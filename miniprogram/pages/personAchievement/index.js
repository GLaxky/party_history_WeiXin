<<<<<<< HEAD
// pages/personAchievement/index.js
=======
// miniprogram/pages/personAchievement/index.js
>>>>>>> a918f1c782f8f3c915ded0b7e2bfa9e31c214c2b
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD

=======
    showUploadTip: false,
    envId: '',
    record: '',
    openId: '',
    achieveList: []
>>>>>>> a918f1c782f8f3c915ded0b7e2bfa9e31c214c2b
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
<<<<<<< HEAD

=======
    this.setData({
      envId: options.envId
    })
>>>>>>> a918f1c782f8f3c915ded0b7e2bfa9e31c214c2b
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
<<<<<<< HEAD

=======
    
>>>>>>> a918f1c782f8f3c915ded0b7e2bfa9e31c214c2b
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
<<<<<<< HEAD

=======
    wx.showLoading({
      title: '',
    })
    //获取到达过的人物
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getAchieveByUid'
      }
    }).then((resp) => {
      this.setData({
        record: resp.result.data
      })
      console.log(resp.result);
      wx.hideLoading()
    }).catch((e) => {
      console.log(e);
      wx.hideLoading()
    })
>>>>>>> a918f1c782f8f3c915ded0b7e2bfa9e31c214c2b
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

  }
})