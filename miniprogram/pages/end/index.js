// miniprogram/pages/end/index.js
const back = wx.getBackgroundAudioManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapCount:0,
  },


  backmusic:function(){
    player();
    function player(){
      back.title = "Last Reunion";
      back.src = "https://weixin-lxk.oss-cn-beijing.aliyuncs.com/Last Reunion.mp3?versionId=CAEQFBiBgMDJgbWT2hciIGFlNjQ5MTI2OWRhMzQwYmE5NjhmZDg3OTgwZTc4ZGRi";
      back.onEnded(() => {
        player();
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.backmusic();   
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
    back.stop()
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

  showText(e){
    console.log(this.data.tapCount)
    switch(this.data.tapCount){
      case 0:
        this.animate('#p1', [
          {opacity:0.3},
          {opacity:0.6},
          {opacity:1},
          ], 1000, function () {
            console.log("点击第一下")
        }.bind(this))
        break;
      case 1:
        this.animate('#p2', [
          {opacity:0.3},
          {opacity:0.6},
          {opacity:1},
          ], 1000, function () {
            console.log("点击第2下")
        }.bind(this))
        break;
      case 2:
        this.animate('#p3', [
          {opacity:0.3},
          {opacity:0.6},
          {opacity:1},
          ], 1000, function () {
            console.log("点击第3下")
        }.bind(this))
        break;
      case 3:
        this.animate('#p4', [
          {opacity:0.3},
          {opacity:0.6},
          {opacity:1},
          ], 1000, function () {
            console.log("点击第4下")
        }.bind(this))
        break; 
      case 4:
        this.animate('#p5', [
          {opacity:0.3},
          {opacity:0.6},
          {opacity:1},
          ], 1000, function () {
            console.log("点击第5下")
        }.bind(this))
        break;   
      case 5:
        this.animate('#p6', [
          {opacity:0.3},
          {opacity:0.6},
          {opacity:1},
          ], 1000, function () {
            console.log("点击第6下")
        }.bind(this))
        break;
      case 6:
        this.animate('#p7', [
          {opacity:0.3},
          {opacity:0.6},
          {opacity:1},
          ], 1000, function () {
            console.log("点击第7下")
        }.bind(this))
        break;
      case 7:
        this.animate('#p8', [
          {opacity:0.3},
          {opacity:0.6},
          {opacity:1},
          ], 1000, function () {
            console.log("点击第8下")
        }.bind(this))
        break;
      case 8:
        this.animate('#p9', [
          {opacity:0.3},
          {opacity:0.6},
          {opacity:1},
          ], 1000, function () {
            console.log("点击第9下")
        }.bind(this))
        break;
        case 9:
        this.animate('#p10', [
          {opacity:0.3},
          {opacity:0.6},
          {opacity:1},
          ], 1000, function () {
            console.log("点击第10下")
        }.bind(this))
        break;
        case 10:
        this.animate('#p11', [
          {opacity:0.3},
          {opacity:0.6},
          {opacity:1},
          ], 1000, function () {
            console.log("点击第11下")
        }.bind(this))
        break;
      default:
        wx.redirectTo({
          url: '../menu/index',
        }) 
        
    }

    this.setData({
      tapCount:this.data.tapCount+1
    })
  }
})