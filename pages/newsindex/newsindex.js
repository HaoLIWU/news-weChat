//顶部新闻轮播图 
var app = getApp()
Page({
  data: {
    imgUrls: [{  //数组
      id: '1',
      link: '/pages/newsdetail01/newsdetail01',//页面链接
      url: '/img/newsindex01.jpg',//图片路径
      title: '习近平会见中非总统图瓦德拉'//标题
    }, {
      id: '2',
      link: '/pages/newsdetail02/newsdetail02',
      url: '/img/newsindex02.jpg',
      title: '亲爱的孩子，欢迎你们回家” ——记四川青少年赴俄交流团重回“海洋”全俄儿童中心'
    }, {
      id: '3',
      link: '/pages/newsdetail03/newsdetail03',
      url: '/img/newsindex03.jpg',
      title: '中非合作论坛北京峰会举行圆桌会议 习近平主持通过北京宣言和北京行动计划'
    }],
    objLists: [
      {
        title: '美国改变计划，准备对中国实施最后的报复',
        organization: '新华日报',
        timeAgo: '202009',
        commentSize: 8
      },
      {
        title: '美国改变计划，准备对中国实施最后的报复',
        organization: '新华日报',
        timeAgo: '202008',
        commentSize: 8
      },
      {
        title: '美国改变计划，准备对中国实施最后的报复',
        organization: '新华日报',
        timeAgo: '202004',
        commentSize: 8
      },
    ],//用于渲染新闻信息
    index: 0,
    winHeight: "",//窗口高度    //目前没用到
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    classify: "热点", //定义一开始加载的该分类名字
    current: 1, //初始化获取到的是第一页的数据
    scrollTop: 0, //屏幕顶部距离
    scrollY: '',
    hasMore: true,
    loadingFalse: false,
    //类别的数组
    categoryTabs: [{
      lanmu_current: 0, //下标
      lanmu_name: '热点', //名字
      selected: true //选中后渲染出来
    },
    {
      lanmu_current: 1,
      lanmu_name: '国际',
      selected: true,
    },
    {
      lanmu_current: 2,
      lanmu_name: '社会',
      selected: true
    },
    {
      lanmu_current: 3,
      lanmu_name: '财经',
      selected: true
    },
    {
      lanmu_current: 4,
      lanmu_name: '独家',
      selected: true
    },
    {
      lanmu_current: 5,
      lanmu_name: '科技',
      selected: true
    },
    {
      lanmu_current: 6,
      lanmu_name: '军事',
      selected: true
    },
    {
      lanmu_current: 7,
      lanmu_name: '时尚',
      selected: true
    },
    {
      lanmu_current: 8,
      lanmu_name: '健康',
      selected: true
    }],
  },
  // 回到顶部
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  scroll: function (e, res) {
    var that = this;
    //console.log(e.detail.scrollTop);
    // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
    if (e.detail.scrollTop > 200) {
      this.setData({
        floorstatus: true,
        scrollY: e.detail.scrollTop
      });
    } else {
      this.setData({
        floorstatus: false,
        scrollY: e.detail.scrollTop
      });
    }
  },

  // 切换当前选择的分类
  changeCategory(e) {
    var chid = e.target.dataset.id // 通过e.target.dateset 来获取标签中属性的id
    this.setData({ //setData 函数将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值。
      currentTab: chid
    })
  },
  //  滑动时上面的按钮跟随滑动
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })
  },

  /**
   * 滑动切换tab
   */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    var cur = e.target.dataset.current;
    var current = that.data.current;
    var titleCurrent = e.target.dataset.current;
    var title = that.data.categoryTabs[titleCurrent].lanmu_name;
    var hasMore = that.data.hasMore;
    that.setData({
      hasMore: true,
      current: 1,
      // objLists: [],
      classify: title
    });
    if (that.data.currentTaB == cur) { return false; }
    else {
      that.setData({
        currentTab: cur
      })
    }
    // var params = { "classify": title, "size": 6, "current": current };
    // wx.request({
    //   url: 'https://cassia.top/milk-news/news/queryList',
    //   method: 'POST',
    //   data: JSON.stringify(params),
    //   dataType: 'json',
    //   success: function (res) {
    //     that.setData({
    //       objLists: res.data.data.records,
    //       loadingFalse: res.data.data.records.length == 0? true:false 
    //     })
    //   },
    //   error: function (res) {
    //     console.log('发送请求失败');
    //   }
    // })
    that.checkCor();
  },
  //左右滑动事件
  switchTab: function (e) {
    var that = this;
    var current = that.data.current;
    var title = that.data.categoryTabs[e.detail.current].lanmu_name;
    //console.log(that.data.categoryTabs[e.detail.current].lanmu_name);
    that.setData({
      currentTab: e.detail.current,
      hasMore: true,
      current: 1,
      // objLists: [],
      classify: title,
      loadingFalse: false
    });
    // var params = { "classify": title, "size": 6, "current": current };
    // wx.request({
    //   url: 'https://cassia.top/milk-news/news/queryList',
    //   method: 'POST',
    //   data: JSON.stringify(params),
    //   dataType: 'json',
    //   success: function (res) {
    //     that.setData({
    //       objLists: res.data.data.records,
    //       loadingFalse: res.data.data.records.length == 0 ? true : false 
    //     })
    //   },
    //   error: function (res) {
    //     console.log('发送请求失败');
    //   }
    // })
    that.checkCor();
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab >= 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  //上拉事件
  scrolltolower: function () {
    console.log('上拉来了');
    var that = this;
    var classify = that.data.classify;
    var current = that.data.current;
    //console.log(classify);
    if (!that.data.hasMore) return;
    // var params = { "classify": classify, "size": 6, "current": ++current };
    // wx.request({
    //   url: 'https://cassia.top/milk-news/news/queryList',
    //   method: 'POST',
    //   data: JSON.stringify(params),
    //   dataType: 'json',
    //   success: function (res) {
    //     var newList = that.data.objLists.concat(res.data.data.records);
    //     var totalCount = res.data.data.total - 0;
    //     //用于判断是否再加载数据
    //     var flag = current * 6 < totalCount;
    //     that.setData({
    //       objLists: newList,
    //       hasMore: flag
    //     })
    //     //console.log(that.data.objLists);
    //   },
    //   error: function (res) {
    //     console.log('发送请求失败');
    //   }
    // })
  },
  //获取滚动高度
  swiperUp: function (res) {
    var that = this;
    //console.log(that.data.scrollY);
    that.setData({
      scrollY: that.data.scrollY
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取当前主题的current，
    var currentTab = that.data.currentTab;
    var current = that.data.current;
    var classify = that.data.classify;
    // var t = new Date();
    // console.log(time.formatTime(t));
    // var params = { "classify": classify, "size": 6, "current": current };
    // wx.request({
    //   url: 'https://cassia.top/milk-news/news/queryList',
    //   method: 'POST',
    //   data: JSON.stringify(params),
    //   dataType: 'json',
    //   success: function (res) {
    //     that.setData({
    //       objLists: res.data.data.records
    //     })
    //   },
    //   error: function (res) {
    //     console.log(res);
    //   } 
    // });
    //获取屏幕高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight: res.screenHeight-265
        })
      },
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
  onPullDownRefresh: function (e) {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    console.log('上拉来了');
    //console.log(e);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
