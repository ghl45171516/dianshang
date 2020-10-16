// pages/goods_list/goods_list.js
const requestApi = require('../../request/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: '综合'
      },
      {
        id: 1,
        value: '销量'
      },
      {
        id: 2,
        value: '价格'
      }
    ],
    li: 0,
    goodsList: [],
    page: 1,
  },
  // 总数据

  // 请求数据
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  myevent(e) {
    let index = e.detail.index
    this.setData({
      li: index
    })
  },
  getGoodsList() {
    wx.showLoading({
      title: '加载中',
    })
    requestApi.request({
        url: 'goods/search',
        method: 'get',
        data: this.QueryParams
      })
      .then(res => {
        let total = res.data.message.total
        this.setData({
          page: Math.ceil(total / this.QueryParams.pagesize)
        })
        let list = res.data.message.goods
        setTimeout(() => {
          this.setData({
            goodsList: [...this.data.goodsList, ...list],
          })
          wx.hideLoading()
          wx.stopPullDownRefresh()
        }, 2000)
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.QueryParams.pagenum++
    if (this.QueryParams.pagenum > this.data.page) {
      wx.showToast({
        title: "没有数据",
        icon:'none',
        duration: 3000,
      })
    } else {
      this.getGoodsList()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.id
    this.getGoodsList()
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
    this.setData({
      goodsList: [],
    })
    this.QueryParams.pagenum=1
    this.getGoodsList()
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})