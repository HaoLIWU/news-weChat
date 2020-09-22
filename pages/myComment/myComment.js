// pages/myComment/myComment.js
Page({
 
  /** 
   * 页面的初始数据
   */
  data: {
    myComment: [],
    commentNewsIdTemp: [], //中间变量，获取所有的新闻id,
    commentNewsId: [], //获取不重复的新闻id
    commentNews: [], //获取评论过的新闻
    commentNewsList: [],//获取全部评论过的新闻
    userName: '', //获取微信号名字
    hasComment: true //判断是否有我的评论
  },

  /**
   * 获取评论过的新闻
   */
  getNews: function(id){
    var that = this;
    var commentNewsList = that.data.commentNewsList;
    wx.request({
      url: 'https://cassia.top/milk-news/news/getById?id='+id,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        commentNewsList.push(res.data.data);
        if (commentNewsList.length != 0){
          that.setData({
            hasComment: false
          })
        }else{
          that.setData({
            hasComment: true
          })
        }
        that.setData({
          commentNewsList
        })
      },
      error: function(res) {
        console.log(res);
      }
    });
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://cassia.top/milk-news/comment/getByWxName?wxName=' + options.cat,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        that.setData({
          myComment: res.data.data
        })
        for (var i = 0; i < that.data.myComment.length;i++){
          that.getNews(that.data.myComment[i].newsId);
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