// pages/aboutUs/aboutUs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes: [{
      name: "ul",
      attrs: {
        style: "", class: "nodes_ul"
      },
      children: [
        {
          name: "li",
          attrs: {
            style: "", class: "nodes_li"
          },
          children: [{
            type: "text",
            text: '1.报道新闻信息'
          }],
        }, {
          name: "li",
          attrs: {
            style: "", class: "nodes_li"
          },
          children: [{
            type: "text",
            text: '2.爆料身边新闻'
          }], 
        },
        {
          name: "li",
          attrs: {
            style: "", class: "nodes_li"
          },
          children: [{
            type: "text",
            text: '3.收藏新闻'
          }],
        },
        {
          name: "li",
          attrs: {
            style: "", class: "nodes_li"
          },
          children: [{
            type: "text",
            text: '4.评论区分享自己的看法'
          }],
        },
        {
          name: "li",
          attrs: {
            style: "", class: "nodes_li"
          },
          children: [{
            type: "text",
            text: '5.分享精彩新闻给好友'
          }],
        }
      ]
    }],
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