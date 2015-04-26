var express = require('express');
var app = express();

var wechat = require('wechat');
var config = {
  token: 'Jian',
  appid: 'wx2add4651a703c13d',
  encodingAESKey: 'jQmmIvpsoigQS7TAakpusvMDTtlpaYgtL2Aes13QIcn',
};

app.use(express.query()); // Or app.use(connect.query());
app.use('/wechat', wechat(config, function (req, res, next) {
  // å¾®ä¿¡è¾å¥ä¿¡æ¯é½å¨req.weixinä¸
  console.log(req);
  var message = req.weixin;
  if (req.query.echostr) {
    res.reply(req.query.echostr);
  } else if (message.FromUserName === 'diaosi') {
    // åå¤å±ä¸(æ®éåå¤)
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    //ä½ ä¹å¯ä»¥è¿æ ·åå¤textç±»åçä¿¡æ¯
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // åå¤ä¸æ®µé³ä¹
    res.reply({
      type: "music",
      content: {
        title: "æ¥æ®µé³ä¹å§",
        description: "ä¸æ ææ",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    // åå¤é«å¯å¸(å¾æåå¤)
    res.reply([
      {
        title: 'ä½ æ¥æå®¶æ¥æå§',
        description: 'è¿æ¯å¥³ç¥ä¸é«å¯å¸ä¹é´çå¯¹è¯',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}
));

app.listen(8080);
