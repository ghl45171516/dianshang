const requestApi = require('../../request/index.js')
// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList: [],
    //右侧的商品数据
    rightContent: [],
    li: 0,
    num:0,
  },
  cates: [],
  // 获取数据
  getCates() {
    requestApi.request({
        url: 'categories',
        method: 'get'
      })
      .then(res => {
        this.cates = res.data.message
        // 获取数据存储本地
        wx.setStorageSync('cates', {
          time: Date.now(),
          data: this.cates
        })
        let leftMenuList = this.cates.map(v => v.cat_name)
        let rightContent = this.cates[this.data.li].children
        this.setData({
          leftMenuList: leftMenuList,
          rightContent: rightContent
        })
      })
  },
  // 设置高度
  selectorQuery() {
    let height = wx.getSystemInfoSync().windowHeight
    wx.createSelectorQuery().selectAll('.serch').boundingClientRect((rect) => {
      this.setData({
        height: height - rect[0].height
      })
    }).exec()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  dianji(e) {
    this.setData({
      li: e.target.dataset.index,
      num:0
    })
    this.getCates()
  },
  onLoad: function (options) {
    // 获取缓存
    this.selectorQuery()
    let data = wx.getStorageSync('cates')
    // 判断是否有缓存
    if (!data) {
      this.getCates()
    } else {
      if (Date.now() - data.time > 1000 * 10) {
        this.getCates()
      } else {
        let leftMenuList = data.data.map(v => v.cat_name)
        let rightContent = data.data[this.data.li].children
        console.log(rightContent);
        
        this.setData({
          leftMenuList: leftMenuList,
          rightContent: rightContent
        })
      }

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

  }
})