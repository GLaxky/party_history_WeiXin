//index.js
const app = getApp()
const { envList } = require('../../envList.js')

Page({
  data: {
    showUploadTip: false,
    powerList: [{
      title: '探索',
      tip: 'tip',
      showItem: false,
      item: [{
        title: '开始新的探索',
        page: 'chooseCoreChar'
      },
      //  {
      //   title: '微信支付'
      // },
       {
        title: '继续上一次探索',
        page: 'getMiniProgramCode'
      },
      // {
      //   title: '发送订阅消息',
      // }
    ]
    }, {
      title: '成就',
      tip: 'tip',
      showItem: false,
      item: [{
        title: '党史人物探索成就',
        page: 'createCollection'
      }, {
        title: '党史地点探索成就',
        page: 'updateRecord'
      }, {
        title: '待定',
        page: 'selectRecord'
      }, {
        title: '待定',
        page: 'sumRecord'
      }]
    }, {
      title: '待定',
      tip: '自带CDN加速文件存储',
      showItem: false,
      item: [{
        title: '待定',
        page: 'uploadFile'
      }]
    }, {
      title: '待定',
      tip: '不限语言的全托管容器服务',
      showItem: false,
      item: [{
        title: '待定',
        page: 'deployService'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
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

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    })
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

  jumpToMap(){
    wx.navigateTo({
      url:'/pages/map/map'
    })
  },
  jumpToCoreChar(){
    wx.navigateTo({
      url:'/pages/chooseCoreChar/chooseCoreChar'
    })
  },
  jumpToPlaceAchievement(){
    wx.navigateTo({
      url:'/pages/placeAchievement/placeAchievement?type=0'
    })

  }
})
