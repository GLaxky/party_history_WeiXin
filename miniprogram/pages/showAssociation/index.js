// miniprogram/pages/showAssociation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:0,
    show: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 获取scroll-view的节点信息
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.container').boundingClientRect()
    query.select('.list').boundingClientRect()
    query.exec((res) => {
      var containerHeight = res[0].height;
      var listHeight = res[1].height;
 
      // 滚动条的高度增加
      var interval = setInterval(() => {
        if (this.data.scrollTop < listHeight - containerHeight) {
          this.setData({
            scrollTop: this.data.scrollTop + 2
          })
        } else {
          return
          // clearInterval(interval);
          this.setData({
            scrollTop: 0
          })
        }
      }, 100)
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
  scroll: function () {
    // 获取scroll-view的节点信息
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.list').boundingClientRect()
    query.exec((res) => {
      this.setData({
        scrollTop: -(res[0].top)
      })
      // console.log(res);
    })
  },
  
})