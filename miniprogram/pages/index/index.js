//index.js
const app = getApp()
const { envList } = require('../../envList.js')

Page({
  data: {
    haveGetOpenId:false,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,

    showUploadTip: false,
    powerList: [{
      title: '探索',
      tip: 'tip',
      showItem: false,
      item: [{
        title: '开始新的探索',
        page: 'chooseCoreChar'
      },
      {
        title: '继续上一次探索',
        page: 'lastPos'
      },
    ]
    }, {
      title: '探索成就',
      tip: 'tip',
      showItem: false,
      item: [{
        title: '党史人物探索成就',
        page: 'personAchievement'
      }, {
        title: '党史地点探索成就',
        page: 'placeAchievement'
      }, ]
    }, {
      title: '探索路线线索图',
      tip: 'tip',
      showItem: false,
      item: [{
        title: '查看',
        page: 'charMap'
      }]
    }, {
      title: '待定',
      tip: '待定',
      showItem: false,
      item: [{
        title: '待定',
        page: 'showAssociation'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
    this.getOpenId()
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.user_name= res.userInfo.nickName;
        
      }
    })
  },

  getOpenId:async function() {
    wx.showLoading({
      title: '',
    })
   wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getOpenId'
      }
    }).then((resp) => {
      this.setData({
        haveGetOpenId: true,
        openId: resp.result.openid
      })
      
      app.globalData.user_openId=resp.result.openid,
      
      // console.log(resp.result.openid)
     wx.hideLoading()
   }).catch((e) => {
      this.setData({
        showUploadTip: true
      })
     wx.hideLoading()
    })
  },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index
    const powerList = this.data.powerList
    powerList[index].showItem = !powerList[index].showItem
    if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList)
    } else {
      this.setData({
        powerList
      })
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return
    }
    const powerList = this.data.powerList
    powerList.forEach(i => {
      i.showItem = false
    })
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    })
  },

  jumpPage:async function(e) {
    if(e.currentTarget.dataset.page=="lastPos"){
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
      
    }else{
      wx.navigateTo({
        url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
      })
    }
    
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        })
      }
      this.setData({
        powerList
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

  redirectBtn:function(){
    wx.redirectTo({
      url: '../menu/index',
      success: function(res){},
      fail: function() {},
      complete: function() {}
    })
 },
  
})
