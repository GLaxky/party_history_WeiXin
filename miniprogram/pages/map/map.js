// miniprogram/pages/map/map.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logContent:"探索手账",
    scrollTop:0,
    show: false,
    coreLongitude:0,
    corLatitude:0,
    markers:[],
    start_char_id:0,
    start_place_id:0,
    end_char_id:0,
    end_place_id:0,
    next_items_list:[],
    associationContent:"",
    explored:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(getApp().globalData)
    this.getNextItemIist(options.end_place_id,options.end_char_id);
    if(options.start_char_id==null){
      //如果起始点为null
      let tmp=[];
      let content=await this.getAssociationContent(0,0,options.end_char_id,options.end_place_id)
      let tmpCharInfo=await this.getCharInfo(options.end_char_id);
      //console.log(tmpCharInfo)
      let tmpPlaceInfo=await this.getPlaceInfo(options.end_place_id);
      //console.log(tmpPlaceInfo)
      tmp.push({
        id: 1,
        latitude: parseFloat(tmpPlaceInfo.latitude),
        longitude: parseFloat(tmpPlaceInfo.longitude),
        width: 35,
        height: 45,
        callout: {
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
      tmp.push({
        id: 3,
        latitude: parseFloat(tmpPlaceInfo.latitude),
        longitude: parseFloat(tmpPlaceInfo.longitude),
        width: 35,
        height: 45,
        iconPath:"../../images/image-20210730152715120.png"
      });
      this.setData({
        associationContent:content,
        start_char_id:0,
        start_place_id:0,
        end_char_id:options.end_char_id,
        end_place_id:options.end_place_id,
        markers:tmp,
        coreLongitude:parseFloat(tmpPlaceInfo.longitude),
        coreLatitude:parseFloat(tmpPlaceInfo.latitude),
        explored:false,
      })
    }else{
      let tmp=[];
      let tmpStartCharInfo=await this.getCharInfo(options.start_char_id);
      let tmpStartPlaceInfo=await this.getPlaceInfo(options.start_place_id);
      let tmpEndCharInfo=await this.getCharInfo(options.end_char_id);
      let tmpEndPlaceInfo=await this.getPlaceInfo(options.end_place_id);
      let content=await this.getAssociationContent(options.start_char_id,options.start_place_id,options.end_char_id,options.end_place_id);
      tmp.push({
        id: 0,
        latitude: parseFloat(tmpStartPlaceInfo.latitude),
        longitude: parseFloat(tmpStartPlaceInfo.longitude),
        width: 35,
        height: 45,
        callout: {
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
        callout: {
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
      tmp.push({
        id: 3,
        latitude: parseFloat(tmpStartPlaceInfo.latitude),
        longitude: parseFloat(tmpStartPlaceInfo.longitude),
        width: 35,
        height: 45,
        iconPath:"../../images/image-20210730152715120.png"
      });
      this.setData({
        logContent:content,
        start_char_id:options.start_char_id,
        start_place_id:options.start_place_id,
        end_char_id:options.end_char_id,
        end_place_id:options.end_place_id,
        markers:tmp,
        coreLongitude:parseFloat(tmpEndPlaceInfo.longitude),
        coreLatitude:parseFloat(tmpEndPlaceInfo.latitude),
        explored:false,
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
          // return
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

  goBackToHome(){
    wx.redirectTo({
      url:'/pages/menu/index'
    })
  },

  getCharInfo:async function(cid){
    return new Promise(function(resolve, reject){
      wx.cloud.callFunction({
        name: 'getCharInfo',
        data: {
          char_id: cid
        },
        success: res => {
          // console.log("getCharInfo"+res.result)
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
          // console.log("getPlaceInfo"+res.result)
          resolve(res.result)
        }
        })
      })
    
    },
    getNextItemIist:async function(pid,cid){
      const that=this;
      return new Promise(function(resolve, reject){
        wx.cloud.callFunction({
          name: 'getNextCharIds',
          data: {
            place_id: pid,
            char_id:cid
          },
          success: res => {
            // console.log("getNextItemIist"+res.result.list)
            that.setData({
              next_items_list:res.result.list
            })
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

    goTocharInfo:function (e){
      // console.log(e)
      if(e.detail.markerId==0){
        wx.redirectTo({
          url:`/pages/personInfo/index?char_id=${this.data.start_char_id}&envId=cloud1-0gn7op1be7f4656e&place_id=${this.data.start_place_id}`
        })
      }else if (e.detail.markerId==1){
        wx.redirectTo({
          url:`/pages/personInfo/index?char_id=${this.data.end_char_id}&envId=cloud1-0gn7op1be7f4656e&place_id=${this.data.end_place_id}`
        })
      }
      
    },

    showAssociation:async function(){
      var that = this;
      let tmpEndPlaceInfo=await this.getPlaceInfo(this.data.end_place_id);
      var mapCtx = wx.createMapContext('map');
      mapCtx.translateMarker({
        markerId: 3,
        destination: {
            latitude: tmpEndPlaceInfo.latitude,
            longitude:  tmpEndPlaceInfo.longitude,
        },
        autoRotate:true,
        moveWithRotate: true,
        duration:3000,
        animationEnd() {
          console.log('animation end')
        },
        success:function () {
          mapCtx.moveToLocation({
            latitude: tmpEndPlaceInfo.latitude,
            longitude:  tmpEndPlaceInfo.longitude,
          });
          that.addHistory()
          that.addUserRecord()
          that.setData({
            explored:true
          })
        }
      })
    },

    addHistory:async function(){
      var that =this;
      return new Promise(function(resolve, reject){
        wx.cloud.callFunction({
          name: 'addCurrentPos',
          data: {
            start_char_id:parseInt(that.data.start_char_id),
            start_place_id:parseInt(that.data.start_place_id),
            end_char_id:parseInt(that.data.end_char_id),
            end_place_id:parseInt(that.data.end_place_id),
            openId:getApp().globalData.user_openId
          },
          success: res => {
            resolve(res.result)
          }
          })
        })
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

    getAssociationContent:async function(start_char_id,start_place_id,end_char_id,end_place_id){
      return new Promise(function(resolve, reject){
        wx.cloud.callFunction({
          name: 'getAssociationContent',
          data: {
            start_char_id:parseInt(start_char_id),
            start_place_id:parseInt(start_place_id),
            end_char_id:parseInt(end_char_id),
            end_place_id:parseInt(end_place_id),
          },
          success: res => {
            resolve(res.result)
          }
          })
        })
    },

    addUserRecord:async function(){
      var that =this
      return new Promise(function(resolve, reject){
        wx.cloud.callFunction({
          name: 'addUserRecord',
          data: {
            start_char_id:parseInt(that.data.start_char_id),
            start_place_id:parseInt(that.data.start_place_id),
            end_char_id:parseInt(that.data.end_char_id),
            end_place_id:parseInt(that.data.end_place_id),
            openId:getApp().globalData.user_openId
          },
          success: res => {
            resolve(res.result)
          }
          })
        })
    },

    goToChooseCoreChar(){
      wx.redirectTo({
        url: '../menu/index',
        success: function(res){},
        fail: function() {},
        complete: function() {}
      })

    }
   
  }
)