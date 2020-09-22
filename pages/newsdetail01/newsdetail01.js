// pages/newsdetail01/newsdetail01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClick: false,
    // job: [],
    // jobList: [],//全部收藏新闻
    jobStorage: {},//当前新闻
  },
  haveSave: function(e) {
    var that = this;
    let jobData = this.data.jobStorage;
    if (!this.data.isClick == true) {
      var jobStorage = { id: that.data.newsId ,isClick : true};
      var jobList = wx.getStorageSync('jobList')|| [];
      var i = 0
      for( ; i<jobList.length;i++){
        if (jobList[i].id == that.data.newsId){
          jobList[i].isClick = true;
          wx.setStorageSync('jobList', jobList);
          break;
        }
      }
      if (i == jobList.length){
        jobList.push(jobStorage);
        wx.setStorageSync('jobList', jobList);
      }
      wx.showToast({
        title: '已收藏',
      });
    } else {
      wx.setStorageSync(this.data.newsId, false);//设置缓存
      var jobStorage = { id: that.data.newsId, isClick: false };
      var jobList = wx.getStorageSync('jobList') || [];
      var i = 0
      for (; i < jobList.length; i++) {
        if (jobList[i].id == that.data.newsId) {
          jobList[i].isClick = false;
          wx.setStorageSync('jobList', jobList);
          break;
        }
      }
      if (i == jobList.length) {
        jobList.push(jobStorage);
        wx.setStorageSync('jobList', jobList);
      }
      wx.showToast({
        title: '已取消收藏',
      });
    }
    this.setData({
      isClick: !this.data.isClick
    })
    //console.log(jobData);
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