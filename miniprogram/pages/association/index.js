// miniprogram/pages/association/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    context:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoContext = wx.createVideoContext('myVideo')
    this.setData({
      context:options.content
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
    // this.animate('#t1', [
    //   {opacity:0.3},
    //   {opacity:0.6},
    //   {opacity:1},
    //   ], 1000, function () {
    //     console.log("donghua")
    // }.bind(this))
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

  clearVideo(){
    this.setData({
      show:false
    })
  },

  goBack(){
    wx.navigateBack({
      delta: 1
    })
  }
})