// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    commentList: [],
    inputContent: '',
    newsId: '',
    hasComment: true,
    newsName: ''
  },

  formName:function(e) {
    var that = this;
    var newsId = that.data.newsId;
    that.setData({
      inputContent: e.detail.value
    })
  },
  loadAgain: function(e) {
    var that = this;
    var newsId = that.data.newsId;
    wx.request({
      url: 'https://cassia.top/milk-news/comment/getByNewsId?newsId=' + newsId,
      method: 'GET', 
      dataType: 'json',
      success: function (res) {
        that.setData({
          commentList: res.data.data,
          hasComment: false
        })
      },
      error: function (res) {
        console.log(res);
      }    
    })
  },
  /**
   * 点击按钮，发表评论
   */
  sendContent:function(e){
    var that = this;
    var inputContent = that.data.inputContent;
    var newsId = that.data.newsId;
    var userName = that.data.userName;
    var newsName = that.data.newsName;
    var params = {
      "content": inputContent,
      "newsId": newsId,
      "wxName": userName,
      "newsName": newsName   
    };
    wx.request({
      url: 'https://cassia.top/milk-news/comment/add',
      data: params,
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',   
      success: function(res) {
        console.log(res);
        that.loadAgain();
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userName = that.data.userName;
    console.log(options);
    that.setData({
      newsId: options.cat,
      newsName: options.title
    })
    wx.getUserInfo({
      success: function(res) {
        userName = res.userInfo.nickName;
        that.setData({
          userName
        })
      },
      fail: function(res) {
        console.log(res);
      }
    });
    wx.request({
      url: 'https://cassia.top/milk-news/comment/getByNewsId?newsId='+options.cat, 
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res.data.data);
        that.setData({
          commentList: res.data.data
        })
        if (that.data.commentList.length != 0){
          that.setData({
            hasComment: false
          })
        }else{
          that.setData({
            hasComment: true
          })
        }
        
      },
      fail: function(res) {
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