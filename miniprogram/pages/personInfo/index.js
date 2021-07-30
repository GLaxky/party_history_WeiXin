// miniprogram/pages/personInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    envId: '',
    char_id: '',
    record: '',
    comment: ''
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
    if(this.data.char_id==-1){
      this.setData({
        char_id: ''
      })
      return
    }
    //查询人物信息
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
      this.setData({
        record: resp.result.data.data[0]
      })
   }).catch((e) => {
      console.log(e)
      this.setData({
        showUploadTip: true
      })
     wx.hideLoading()
   })
   //获得评论数据
   wx.cloud.callFunction({
    name: 'quickstartFunctions',
    config: {
      env: this.data.envId
    },
    data: {
      type: 'getCommentById',
      data: this.data.char_id
    }
  }).then((resp) => {
    this.setData({
      comment: resp.result.data.data
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

  },

  jumpToPersonPlace: function () {
    wx.navigateTo({
      url: '/pages/personPlaces/index?char_id='+(this.data.char_id)
    })
  }
})