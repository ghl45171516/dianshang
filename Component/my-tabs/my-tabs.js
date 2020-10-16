// Component/my-tabs/my-tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    li:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindtab(e){
      let index = e.target.dataset.index
      this.setData({
        li:index,
      })
      this.triggerEvent('myevent', {index});   
    }
  }
})
