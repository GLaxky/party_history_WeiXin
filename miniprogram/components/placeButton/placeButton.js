// components/placeButton/placeButton.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    place_id:{
      type:Number,
      value:0
    },
    place_name:{
      type: String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpToPlaceInfo: function () {
      wx.navigateTo({
        url: '/pages/placeInfo/index?place_id='+(this.properties.place_id)
      })
    }
  },

})
