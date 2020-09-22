# news-weChat
简知新闻小程序

### Clone it
`git clone https://github.com/HaoLIWU/news-weChat.git`

### Run it
直接导入微信开发工具，输入自己的AppID就行了。

### Introduce It
简知新闻是之前做的一个微信小程序项目，由于后台已经暂停维护，
所以这里只是保留前端部分。<br>
简知新闻是采用了微信小程序原生的wxml+wxss+js进行开发的，在
小程序的app.wxss封装了大量的公共样式，加强对代码的复用。

---
记录一下，微信小程序的一个坑：
js函数不能使用箭头函数，会报错，改成function就可以了。
