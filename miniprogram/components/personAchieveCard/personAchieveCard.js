// components/personAchieveCard/personAchieveCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageUrl:{
      type:String,
      value:""
    },
    name:{
      type:String,
      value:""
    },
    char_id:{
      type:Number,
      value:0
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
    
  tap: function(event){
    if(this.properties.char_id==-1){
      wx.showToast({
        title: '提示：请探索该人物后再试',
        icon: 'none'
      })
      return
    }
    else{
      wx.navigateTo({
        url: '../../pages/personInfo/index?char_id='+this.properties.char_id
      })
    }
  }
  }
})
