//import jobList from '../../utils/util.js'

Page({
  data: {
    id: '',
    job: [],
    savejob: [],
    contentList: [],
    hasCollect: false
  },
  getNews: function(id) {
    var that = this;
    var contentList = that.data.contentList;
    wx.request({
      url: 'https://cassia.top/milk-news/news/getById?id='+id,
      method: 'GET',
      dataType: 'json', 
      success: function(res) {
        contentList.push(res.data.data);
        if (contentList.length == 0){
          that.setData({
            contentList: [],
            hasCollect: false
          })
        }else{
          that.setData({
            contentList,
            hasCollect: true
          })
        }
      },
      error: function(res) {
        console.log(res);
      }
      
    })
  },
  /**
   * 加载本地缓存
   */
  onLoad: function (options) {
    var that = this;
    var savejob = wx.getStorageSync('jobList') || [];//获得缓存    
    for(var i=0 ; i<savejob.length ; i++){
      if(savejob[i].isClick == true){
        that.getNews(savejob[i].id);
      }
    }
  },
})