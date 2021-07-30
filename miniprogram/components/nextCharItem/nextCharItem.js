// components/nextCharItem/nextCharItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    start_char_id:{
      type:Number,
      value:0
    },
    start_place_id:{
      type:Number,
      value:0
    },
    end_char_id:{
      type:Number,
      value:0
    },
    end_place_id:{
      type:Number,
      value:0
    },
    relation:{
      type:String,
      value:""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl:"",
    name:""
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  ready: function() {
    wx.cloud.callFunction({
      name: 'getCharInfo',
      data: {
        char_id: this.properties.end_char_id
      },
      success: res => {
        // console.log("getCharInfo"+res.result)
        this.setData({
          imageUrl:res.result.image_url,
          name:res.result.cname
        })
      }
    })
  }
})
