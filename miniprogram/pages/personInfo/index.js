// miniprogram/pages/personInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    envId: '',
    char_id: '',
    record: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      envId: options.envId,
      char_id: options.char_id
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
    wx.showLoading({
      title: '',
    })
   wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getPersonById',
        data: this.data.char_id
      }
    }).then((resp) => {
      console.log(resp.result);
      this.setData({
        record: resp.result.data.data[0]
      })
     wx.hideLoading()
   }).catch((e) => {
      console.log(e)
      this.setData({
        showUploadTip: true
      })
     wx.hideLoading()
   })
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