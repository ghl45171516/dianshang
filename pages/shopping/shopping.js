// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleChooseAddress() {
    wx.getSetting({
      success: (result) => { 
        const scopeAddress = result.authSetting["scope.address"];
        //获取权限状态很怪异时候  都需要 [“  ”]形式来获取属性值
        if (scopeAddress === true ) {
          wx.chooseAddress({
            success: (res) => {
              console.log(res);
            },
          })
        } else {
          wx.openSetting({
            success: (res) => {
              wx.chooseAddress({
                success: (res1) => {
                  console.log(res1);
                },
              })
            },
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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