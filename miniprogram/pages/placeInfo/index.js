// miniprogram/pages/personInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    envId: '',
    place_id: '',
    record: '',
    is_new_place: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      envId: options.envId,
      place_id: options.place_id
    })
    
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'isNewPlace',
        place_id: this.data.place_id
      }
    }).then((resp) => {
      this.setData({
        is_new_place: resp.result.data
      })
      if(this.data.is_new_place){
        wx.showToast({
          title: '恭喜发现新地点',
          icon: 'none'
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
    wx.showLoading({
      title: '',
    })
   wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getPlaceById',
        data: this.data.place_id
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