// miniprogram/pages/map/map.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
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
    next_items_list:[],
    associationContent:"",
    haveRecorded:false,
    haveGoneIntoCharInfo:false,
    association_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    
    // console.log(getApp().globalData)
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
          content: tmpCharInfo.cname+"\n"+tmpPlaceInfo.place_name,
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
          anchorY:-25
        }
      });
      tmp.push({
        id: 3,
        latitude: parseFloat(tmpPlaceInfo.latitude),
        longitude: parseFloat(tmpPlaceInfo.longitude),
        width: 35,
        height: 45,
        iconPath:"../../images/image-20210730152715120.png",
        callout: {
          content: "我的位置",
          color: 'black',
          fontSize: 14,
          // borderWidth: 2,
          // borderRadius: 10,
          borderColor: '#000000',
          bgColor: '#fff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center',
          anchorX:0,
          anchorY:0,
          // alpha:0.5
        }
      });
      this.setData({
        associationContent:content.contents,
        start_char_id:0,
        start_place_id:0,
        end_char_id:options.end_char_id,
        end_place_id:options.end_place_id,
        markers:tmp,
        coreLongitude:parseFloat(tmpPlaceInfo.longitude),
        coreLatitude:parseFloat(tmpPlaceInfo.latitude),
        association_id:content.aid
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
          anchorY:-25
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
          anchorY:-25
        }
      });
      tmp.push({
        id: 3,
        latitude: parseFloat(tmpStartPlaceInfo.latitude),
        longitude: parseFloat(tmpStartPlaceInfo.longitude),
        width: 35,
        height: 45,
        iconPath:"../../images/image-20210730152715120.png",
        callout: {
          content: "我的位置",
          color: 'black',
          fontSize: 14,
          // borderWidth: 2,
          // borderRadius: 10,
          borderColor: '#000000',
          bgColor: '#fff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center',
          anchorX:0,
          anchorY:0,
          // alpha:0.5
        }
      });
      this.setData({
        associationContent:content.contents,
        start_char_id:options.start_char_id,
        start_place_id:options.start_place_id,
        end_char_id:options.end_char_id,
        end_place_id:options.end_place_id,
        markers:tmp,
        coreLongitude:parseFloat(tmpEndPlaceInfo.longitude),
        coreLatitude:parseFloat(tmpEndPlaceInfo.latitude),
        association_id:content.aid
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
      if(this.data.haveRecorded&&this.data.haveGoneIntoCharInfo){
        this.setData({ show: true });
      }else if(!(this.data.haveRecorded)&&this.data.haveGoneIntoCharInfo){
        Toast({
          message: '还未“记录追忆手账”噢~',
          forbidClick: true,
        });
      }else if(this.data.haveRecorded&&!(this.data.haveGoneIntoCharInfo)){
        Toast({
          message: '还未“探索当前人物”噢~请点击地图上的气泡',
          forbidClick: true,
        });
      }else{
        Toast({
          message: '还未“记录旅行手账”噢~',
          forbidClick: true,
        });
      }
      
    },
  
    onClose() {
      this.setData({ show: false });
    },

    goTocharInfo:function (e){
      // console.log(e)
      console.log("this.data.association_id"+this.data.association_id)
      if(e.detail.markerId==0){
        wx.navigateTo({
          url:`/pages/personInfo/index?char_id=${this.data.start_char_id}&envId=cloud-environment-6e21xvc5d21990&place_id=${this.data.start_place_id}`
        })
      }else if (e.detail.markerId==1){
        if(!this.data.haveRecorded){
          Toast({
            message: '还未“记录旅行手账”噢~',
            forbidClick: true,
          });
          return
        }
        this.setData({
          haveGoneIntoCharInfo:true,
        })
        wx.navigateTo({
          url:`/pages/personInfo/index?char_id=${this.data.end_char_id}&envId=cloud-environment-6e21xvc5d21990&place_id=${this.data.end_place_id}&association_id=${this.data.association_id}`
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
          that.setData({
            haveRecorded:true,
          })
          that.animate('.v', [
            {opacity:0.5, scale: [1, 1], rotate: 0, ease: 'ease-out',  translate:[-100,-100]},
            {opacity:0.8, scale: [2, 2], rotate: 180, ease: 'ease-in', offset: 0.9},
            {opacity:1, scale: [3, 3], rotate: 180 },
            ], 4000, function () {
              wx.navigateTo({
                url: `../association/index?content=${that.data.associationContent}`,
                success: function(res){},
                fail: function() {},
                complete: function() {}
              })
          }.bind(this))
        },
        success:function () {
          that.addHistory()
          that.addUserRecord()
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
            console.log("getAssociationContent"+res.result)
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
      wx.navigateTo({
        url: '../chooseCoreChar/index',
        success: function(res){},
        fail: function() {},
        complete: function() {}
      })

    }
   
  }
)