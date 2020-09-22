// pages/newsdetails/newsdtlsindex01/newsdetails01.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job: [],
    jobList: [],//全部收藏新闻
    id: '',
    isClick: false,
    jobStorage: {},//当前新闻
    newsId: ''
  },
  
  
  //回到首页
  BackIndex() {
    wx.switchTab({
      url: '/pages/newsindex/newsindex'
    })
  },

  /**
   * 点击收藏，写进本地缓存
   */
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
    var that = this;
    var contentList = that.data.contentList;
    that.setData({
      newsId: options.cat
    })
    wx:wx.request({
      url: 'https://cassia.top/milk-news/news/getById?id='+options.cat,
      method: 'GET',
      dataType: 'json',    
      success: function(res) {
        that.setData({
          contentList: res.data.data
        })
        var jobList = wx.getStorageSync('jobList') || [];
        var i = 0;
        for (; i < jobList.length; i++) {
          if (jobList[i].id == that.data.newsId) {
            if (jobList[i].isClick){
              that.setData({
                isClick: true
              })
            }
            break;
          }
        }
      },
      fail: function(res) {
        console.log(res);
      }
    })
    // 要求小程序返回分享目标信息
    wx.showShareMenu({
      withShareTicket: true
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
   * 用户点击按钮，右上角分享
   */
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      //console.log(ops.target)
    }
    return {
      title: '转发',
      path: 'pages/newsdetail/newsdetail',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        //可以获取群组信息
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            console.log(res)
          }
        })
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})