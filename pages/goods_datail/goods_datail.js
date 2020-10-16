// pages/goods_datail/goods_datail.js
const requestApi = require('../../request/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: null,
    datailList: {}
  },
  GoodsInfo: {},
  datu(e) {
    let current = e.currentTarget.dataset.src
    let urls = this.data.datailList.pics.map(v => v.pics_mid)
    wx.previewImage({
      urls: urls,
      current: current
    })
  },
  getData() {
    let goods_id = this.data.goods_id
    wx.showLoading({
      title: '加载中',
    })
    requestApi.request({
      url: 'goods/detail',
      method: 'get',
      data: {
        goods_id: goods_id
      }
    }).then(res => {
      this.GoodsInfo = res.data.message
      let data = res.data.message
      this.setData({
        datailList: {
          pics: data.pics,
          goods_price: data.goods_price,
          goods_name: data.goods_name,
          goods_introduce: data.goods_introduce
        }
      })
      wx.hideLoading()
    })
  },
  // 点击加入购入车
  // 1 先绑定点击时间
  // 2获取缓存中的购物车数据 数组格式
  // 3先判断当前的商品是否存在于购物车
  // 4已经存在修改商品数据 执行购物车数量++ 重新把购物车数组 填充会缓存中
  // 5不存在于购物车的数组中 直接给购物车数组添加元素 新元素带上属性 numm 重新把购物车数组 填充回缓存中 
  cartAdd() {
    // 获取缓存数据
    let cart = wx.getStorageSync('cart') || []
    // 判断商品对象是否存在于购物车数组中
    let index =cart.findIndex(v=>v.goods_id==this.GoodsInfo.goods_id)
    if(index===-1){
      // 不存在第一次添加
      this.GoodsInfo.num=1
      cart.push(this.GoodsInfo)
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon:"success",
      mask:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id: options.id
    })
    this.getData()
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