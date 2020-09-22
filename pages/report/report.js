// pages/report/report.js

//获取用户实例
var app = getApp()

//手机号码正则表达式判断
var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/

Page({
  /**
   * 页面的初始数据
   */
  data: {
    problemIpt: '', //初始化输入框的值
    phoneIpt: '',
    src: '',
    images: '',
    img_url: [],
    content: '',
    video_url: [],
    img_url_ok: []
  },
  //获取用户的输入事件的值
  problemInput: function (e) {
    var that = this;
    that.data.problemIpt = e.detail.value;
  },
  phoneInput: function (e) {
    var that = this;
    that.data.phoneIpt = e.detail.value;
  },

  //发送按钮事件
  SubmitClick: function (res) {
    var proIpt = this.data.problemIpt;
    var phoIpt = this.data.phoneIpt;
    var urlImg = this.data.img_url_ok;
    if (proIpt.length == 0) { //判断事件输入是否为空，为空时弹窗提示
      wx.showModal({ //显示弹窗
        title: '提示',
        content: '请输入事件详情',
        success: function (res) { //成功返回
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消');
          }
        }
      })
    } else if (phoIpt.length == 0) { //判断联系电话输入是否为空，为空时弹窗提示
      wx.showModal({ //显示弹窗
        title: '提示',
        content: '请输入联系电话',
        success: function (res) { //成功返回
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消');
          }
        }
      })
    } else if (phoIpt.length != 11) { //判断联系电话长度是否正确，为空时弹窗提示
      wx.showModal({ //显示弹窗
        title: '提示',
        content: '手机号长度有误！',
        success: function (res) { //成功返回
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消');
          }
        }
      })
    } else if (!myreg.test(phoIpt)) {
      wx.showModal({ //显示弹窗
        title: '提示',
        content: '您输入的手机号有误！',
        success: function (res) { //成功返回
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消');
          }
        }
      })
    } else {
      //console.log(urlImg);
      wx.request({
        url: 'https://cassia.top/milk-news/tip-off/add',
        data: {
          content: proIpt,
          phone: phoIpt,
          url: urlImg
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method: 'POST',
        dataType: 'json',

        success: function (res) {
          console.log(res.data);
        },
        fail: function (res) {
          console.log(res);
        }
      })
      wx.showModal({ //弹窗提示
        title: '提示',
        content: '发送成功，感谢您的报料',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      })
      //清空输入框对的值
      this.setData({
        problemIpt: '',
        phoneIpt: '',
        img_url_ok: [],
        img_url: [],
        src: '',
        video_url: ''
      })
    }
  },

  //图片上传
  img_upload: function () {
    let that = this;
    let img_url = that.data.img_url;
    var img_url_ok = that.data.img_url_ok ? that.data.img_url_ok : [];
    //由于图片只能一张一张地上传，所以用循环
    for (let i = 0; i < img_url.length; i++) {
      wx.uploadFile({
        url: 'https://cassia.top/milk-news/file/upload',
        filePath: img_url[i],
        name: 'file',
        dataType: 'json',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json',
        },
        success: function (res) {
          //把上传成功的图片的地址放入数组中
          var k = JSON.parse(res.data);
          img_url_ok.push(k.data);
         // console.log(img_url_ok);
          console.log('上传成功');
          that.setData({
            img_url_ok: img_url_ok
          });

        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },
  //选择图片
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //把每次选择的图push进数组
        var img_url = that.data.img_url;
        console.log(img_url);
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          img_url.push(res.tempFilePaths[i]);
        }
        that.setData({
          img_url: img_url
        })
        //判断是否隐藏那张加号图片
        if (img_url.length > 0) {
          //图如果满了9张，不显示加图
          if (img_url.length >= 9) {
            that.setData({
              hideAdd: 1
            })
          } else {
            that.setData({
              hideAdd: 0
            })
          }
          that.img_upload();
        }
      }
    })
  },

  //选择视频
  chooseVideo: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从视频中选择', '拍摄'],
      itemColor: "#CDCD00",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            wx.chooseVideo({
              count: 1, // 规定只能上传一个视频
              sourceType: ['album'],
              maxDuration: 120,
              camera: ['front', 'back'],
              success: function (res) {
                that.setData({
                  video_url: res.tempFilePath
                });
                that.video_upload();
              }
            })
          } else if (res.tapIndex == 1) {
            wx.chooseVideo({
              count: 1, // 规定只能上传一个视频
              sourceType: ['camera'],
              maxDuration: 120,
              camera: ['front', 'back'],
              success: function (res) {
                //console.log(res);
                that.setData({
                  video_url: res.tempFilePath
                });
                that.video_upload();
              }
            })
          }
        }
      }
    })
  },
  //视频上传
  video_upload: function () {
    var that = this;
    let video_url = that.data.video_url;
    var video_url_json = that.data.video_url_json;
    var img_url_ok = that.data.img_url_ok ? that.data.img_url_ok : [];
    //console.log(that.data);
    wx.uploadFile({
      url: 'https://cassia.top/milk-news/file/upload',
      filePath: video_url,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json',
      },
      success: function (res) {
        var video_data = JSON.parse(res.data);
        var json_video = video_data.data;
        console.log('视频上传成功');
        img_url_ok.push(json_video);
        that.setData({
          video_url_json: json_video,
          img_url_ok: img_url_ok,
          video_url
        });
        if (img_url_ok.length >= 9) {
          that.setData({
            hideAdd: 1
          })
        } else {
          that.setData({
            hideAdd: 0
          })
        }
      },
      fail: function () {
        console.log(res);
      }
    })
  },

  //移除数据，主要是视频的
  removeData: function (arr, data) {
    for (var i = 0; i < arr.length; i++) {
      if (data == arr[i]) {
        arr.splice(i, 1);
        return i;
      }
    }
  },
  //删除图片
  deleteImage: function (e) {
    var that = this;
    var img_url = that.data.img_url;
    var img_url_ok = that.data.img_url_ok;
    var index = e.currentTarget.id; //获取当前图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          //console.log('点击确定了');
          img_url.splice(index, 1);
          img_url_ok.splice(index, 1);
        } else if (res.cancel) {
          // console.log('点击取消了');
          return false;
        }
        that.setData({
          img_url,
          img_url_ok
        });
        if (img_url_ok.length > 0) {
          //图如果满了9张，不显示加图
          if (img_url_ok.length < 9) {
            that.setData({
              hideAdd: 0
            })
          }
        }
      }
    })
  },

  //删除视频
  deleteVideo: function (e) {
    var that = this;
    var video_url_json = that.data.video_url_json;
    var video_url = that.data.video_url;
    var img_url_ok = that.data.img_url_ok;
    wx.showModal({
      title: '提示',
      content: '确定要删除此视频吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          //设置此时的视频路径为空
          video_url = "";
          //console.log(video_url);
          that.removeData(img_url_ok, video_url_json);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          img_url_ok: img_url_ok,
          video_url: video_url,
          video_url_json
        });
        if (img_url_ok.length < 9 && img_url_ok.length > 0) {
          that.setData({
            hideAdd: 0
          })
        }
      }
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