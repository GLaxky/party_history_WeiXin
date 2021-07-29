// components/smallCharCard/smallCharCard.js

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
    p_id:{
      type:Number,
      value:0
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
    mark:{
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },

  ready: function() {
    // console.log("onReady")
    const db = wx.cloud.database();
    db.collection("place")
    .where({
      place_id:this.properties.p_id
    })
    .field({             
      _id:false,         
      latitude:true,
      longitude:true
    })
    .get()
    .then(res=>{
      const position=res.data[0]
      // console.log(position)
      this.setData({
        mark:position
      })
      // console.log("data:"+this.mark)
    }
    )
  }
})
