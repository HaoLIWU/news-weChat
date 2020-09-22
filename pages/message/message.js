// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: [],
    hasMessage: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var messageList = that.data.messageList;
    wx.request({
      url: 'https://cassia.top/milk-news/message/getByWxName?wxName='+options.cat,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        messageList = res.data.data;
        if (messageList.length == 0){
          that.setData({
            messageList: res.data.data,
            hasMessage: true
          })
        }else{
          that.setData({
            messageList: res.data.data,
            hasMessage: false
          })
        }
      },
      error: function(res) {
        console.log(res);
      }
    })
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