<template>
  <section class="recent">
    <h3 class="title">近期最受欢迎</h3>
    <ul class="recent-body" @touchstart.prevent="start" @touchmove="move" @touchend="end">
      <li class="item" v-for="item in coming" :key="item.id">
        <p class="love empty"></p>
        <img :src="item.img.replace(/\/w.h/,'')" alt="item.nm" class="img">
        <h3 class="name">{{item.nm}}</h3>
        <p class="wish">{{item.wish}}人想看</p>
        <p class="date">{{item.comingTitle.split(' ').join('').replace(/周\W/,'')}}</p>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'recent',
    data(){
      return {
        disX: 0, //当前手指距离左侧的距离
        startX: 0, //ul左边临界值
        endX: 0, //ul右边临界值
        coming: [{
          "bingeWatch": 0,
          "cat": "剧情,犯罪",
          "civilPubSt": 0,
          "comingTitle": "2017年 待定",
          "desc": "主演:邓超,阮经天,刘诗诗",
          "dir": "徐纪周",
          "dur": 0,
          "effectShowNum": 0,
          "followst": 0,
          "globalReleased": false,
          "haspromotionTag": false,
          "headLineShow": false,
          "headLines": [],
          "headLinesVO": [],
          "id": 1197732,
          "img": "http://p0.meituan.net/w.h/movie/e12322ea0809036e682b158ee4a5a92a560232.png",
          "isMark": false,
          "late": false,
          "localPubSt": 0,
          "mk": 0.0,
          "movieType": 0,
          "newsHeadlines": [],
          "nm": "心理罪之城市之光",
          "pn": 131,
          "preShow": false,
          "proScore": 0.0,
          "proScoreNum": 0,
          "pubDate": 1514732400000,
          "pubShowNum": 0,
          "recentShowDate": 0,
          "recentShowNum": 0,
          "rt": "2017",
          "sc": 0.0,
          "scm": "连环凶杀案，城市陷狂欢",
          "showCinemaNum": 0,
          "showNum": 0,
          "showst": 1,
          "snum": 2493,
          "star": "邓超,阮经天,刘诗诗",
          "time": "2017",
          "ver": "2D",
          "videoId": 89753,
          "videoName": "回归版预告片",
          "videourl": "http://maoyan.meituan.net/movie/videos/854x480d7e02a238e034dc7a08a0d9d8385667b.mp4",
          "vnum": 10,
          "weight": 1.0,
          "wish": 204604,
          "wishst": 0
        },
          {
            "bingeWatch": 0,
            "cat": "动作,冒险,科幻",
            "civilPubSt": 0,
            "comingTitle": "11月17日 周五",
            "desc": "主演:本·阿弗莱克,亨利·卡维尔,盖尔·加朵",
            "dir": "扎克·施奈德",
            "dur": 120,
            "effectShowNum": 0,
            "followst": 0,
            "fra": "美国,日本",
            "frt": "2017-11-17",
            "ftime": ",2017",
            "globalReleased": false,
            "haspromotionTag": false,
            "headLineShow": false,
            "headLines": [],
            "headLinesVO": [],
            "id": 341195,
            "img": "http://p0.meituan.net/w.h/movie/5b67cb4fb23b56a7a633bd6bbfb6ce28571075.png",
            "isMark": false,
            "late": false,
            "localPubSt": 0,
            "mk": 0.0,
            "movieType": 0,
            "newsHeadlines": [],
            "nm": "正义联盟",
            "pn": 259,
            "preShow": false,
            "proScore": 0.0,
            "proScoreNum": 0,
            "pubDate": 1510848000000,
            "pubShowNum": 0,
            "recentShowDate": 0,
            "recentShowNum": 0,
            "rt": "2017-11-17",
            "sc": 0.0,
            "scm": "",
            "showCinemaNum": 0,
            "showInfo": "2017-11-17 本周五上映",
            "showNum": 0,
            "showst": 4,
            "snum": 3139,
            "star": "本·阿弗莱克,亨利·卡维尔,盖尔·加朵",
            "ver": "3D/IMAX 3D/中国巨幕/全景声",
            "videoId": 89757,
            "videoName": "新预告片超级英雄各秀绝招 蝙蝠侠新战车酷毙了",
            "videourl": "http://maoyan.meituan.net/movie/videos/854x480495853c1d6d04b43ae8e083cf7ddd80e.mp4",
            "vnum": 30,
            "weight": 1.0,
            "wish": 161389,
            "wishst": 0
          }, {
            "bingeWatch": 0,
            "cat": "喜剧,爱情",
            "civilPubSt": 0,
            "comingTitle": "12月29日 周五",
            "desc": "主演:韩庚,郑恺,于文文",
            "dir": "田羽生",
            "dur": 0,
            "effectShowNum": 0,
            "followst": 0,
            "globalReleased": false,
            "haspromotionTag": false,
            "headLineShow": false,
            "headLines": [],
            "headLinesVO": [],
            "id": 344929,
            "img": "http://p0.meituan.net/w.h/movie/f0bd41925318f0169e2699da95431a372497294.jpg",
            "isMark": false,
            "late": false,
            "localPubSt": 0,
            "mk": 0.0,
            "movieType": 0,
            "newsHeadlines": [],
            "nm": "前任3：再见前任",
            "pn": 31,
            "preShow": false,
            "proScore": 0.0,
            "proScoreNum": 0,
            "pubDate": 1514476800000,
            "pubShowNum": 0,
            "recentShowDate": 0,
            "recentShowNum": 0,
            "rt": "2017-12-29",
            "sc": 0.0,
            "scm": "前任终结篇，爆笑说再见",
            "showCinemaNum": 0,
            "showNum": 0,
            "showst": 1,
            "snum": 733,
            "star": "韩庚,郑恺,于文文",
            "ver": "2D",
            "videoId": 89568,
            "videoName": "“对垒”版预告片 韩庚郑恺情陷修罗场",
            "videourl": "http://maoyan.meituan.net/movie/videos/854x4807b3d26fb191f482a907cd292d6140785.mp4",
            "vnum": 3,
            "weight": 1.0,
            "wish": 132255,
            "wishst": 0
          }, {
            "bingeWatch": 0,
            "cat": "爱情,奇幻",
            "civilPubSt": 0,
            "comingTitle": "12月22日 周五",
            "desc": "主演:黄轩,染谷将太,张雨绮",
            "dir": "陈凯歌",
            "dur": 90,
            "effectShowNum": 0,
            "followst": 0,
            "globalReleased": false,
            "haspromotionTag": false,
            "headLineShow": false,
            "headLines": [],
            "headLinesVO": [],
            "id": 345862,
            "img": "http://p0.meituan.net/w.h/movie/d1fb78be16d3d365539424bcbda9bdaf372032.jpg",
            "isMark": false,
            "late": false,
            "localPubSt": 0,
            "mk": 0.0,
            "movieType": 0,
            "newsHeadlines": [],
            "nm": "妖猫传",
            "pn": 180,
            "preShow": false,
            "proScore": 0.0,
            "proScoreNum": 0,
            "pubDate": 1513872000000,
            "pubShowNum": 0,
            "recentShowDate": 0,
            "recentShowNum": 0,
            "rt": "2017-12-22",
            "sc": 0.0,
            "scm": "妖猫入长安，空海查迷案",
            "showCinemaNum": 0,
            "showNum": 0,
            "showst": 1,
            "snum": 719,
            "star": "黄轩,染谷将太,张雨绮",
            "ver": "2D",
            "videoId": 89203,
            "videoName": "首发版预告片 现“大唐诡宴”，黄轩染谷一诗一僧寻妖探奇局",
            "videourl": "http://maoyan.meituan.net/movie/videos/854x4805bf2c613eed84d839e2d0f04219a562f.mp4",
            "vnum": 14,
            "weight": 1.0,
            "wish": 109287,
            "wishst": 0
          }, {
            "bingeWatch": 0,
            "cat": "喜剧,奇幻",
            "civilPubSt": 0,
            "comingTitle": "11月17日 周五",
            "desc": "主演:郑恺,张雨绮,谢依霖",
            "dir": "王晶,钟少雄",
            "dur": 91,
            "effectShowNum": 0,
            "followst": 0,
            "globalReleased": false,
            "haspromotionTag": false,
            "headLineShow": false,
            "headLines": [],
            "headLinesVO": [],
            "id": 246019,
            "img": "http://p1.meituan.net/w.h/movie/9c80c528f3cd023472f2fec77671211b1021404.jpg",
            "isMark": false,
            "late": false,
            "localPubSt": 0,
            "mk": 0.0,
            "movieType": 0,
            "newsHeadlines": [],
            "nm": "降魔传",
            "pn": 97,
            "preShow": false,
            "proScore": 0.0,
            "proScoreNum": 0,
            "pubDate": 1510848000000,
            "pubShowNum": 0,
            "recentShowDate": 0,
            "recentShowNum": 0,
            "rt": "2017-11-17",
            "sc": 0.0,
            "scm": "剧情很玄乎，读起来很酷",
            "showCinemaNum": 0,
            "showInfo": "2017-11-17 本周五上映",
            "showNum": 0,
            "showst": 4,
            "snum": 4628,
            "star": "郑恺,张雨绮,谢依霖",
            "ver": "2D/3D",
            "videoId": 89555,
            "videoName": "终极版预告 华丽视效打造魔幻大片",
            "videourl": "http://maoyan.meituan.net/movie/videos/854x480e339a4a932f546569e4e9da46c0473e3.mp4",
            "vnum": 8,
            "weight": 1.0,
            "wish": 102655,
            "wishst": 0
          }, {
            "bingeWatch": 0,
            "cat": "喜剧,动作,奇幻",
            "civilPubSt": 0,
            "comingTitle": "12月15日 周五",
            "desc": "主演:大鹏,倪妮,李治廷",
            "dir": "袁和平",
            "dur": 0,
            "effectShowNum": 0,
            "followst": 0,
            "globalReleased": false,
            "haspromotionTag": false,
            "headLineShow": false,
            "headLines": [],
            "headLinesVO": [],
            "id": 344183,
            "img": "http://p0.meituan.net/w.h/movie/63645fbe250617e4f2e6b40c51223a77932075.png",
            "isMark": false,
            "late": false,
            "localPubSt": 0,
            "mk": 0.0,
            "movieType": 0,
            "newsHeadlines": [],
            "nm": "奇门遁甲",
            "pn": 63,
            "preShow": false,
            "proScore": 0.0,
            "proScoreNum": 0,
            "pubDate": 1513267200000,
            "pubShowNum": 0,
            "recentShowDate": 0,
            "recentShowNum": 0,
            "rt": "2017-12-15",
            "sc": 0.0,
            "scm": "天地有妖气，逗逼救地球",
            "showCinemaNum": 0,
            "showNum": 0,
            "showst": 1,
            "snum": 879,
            "star": "大鹏,倪妮,李治廷",
            "ver": "2D/3D/IMAX 3D",
            "videoId": 89149,
            "videoName": "奇侠集结版预告片",
            "videourl": "http://maoyan.meituan.net/movie/videos/854x480eafc1e0bc89a4ab7805bf3e112b16f7d.mp4",
            "vnum": 6,
            "weight": 1.0,
            "wish": 90425,
            "wishst": 0
          }, {
            "bingeWatch": 0,
            "cat": "剧情,爱情,战争",
            "civilPubSt": 0,
            "comingTitle": "2017年 待定",
            "desc": "主演:黄轩,苗苗,钟楚曦",
            "dir": "冯小刚",
            "dur": 136,
            "effectShowNum": 0,
            "followst": 0,
            "globalReleased": false,
            "haspromotionTag": false,
            "headLineShow": false,
            "headLines": [],
            "headLinesVO": [],
            "id": 1170264,
            "img": "http://p0.meituan.net/w.h/movie/34c0ccda945a8b4333076dd7d6b44b5c2152996.jpg",
            "isMark": false,
            "late": false,
            "localPubSt": 0,
            "mk": 0.0,
            "movieType": 0,
            "newsHeadlines": [],
            "nm": "芳华",
            "pn": 320,
            "preShow": false,
            "proScore": 0.0,
            "proScoreNum": 3,
            "pubDate": 1514732400000,
            "pubShowNum": 0,
            "recentShowDate": 0,
            "recentShowNum": 0,
            "rt": "2017",
            "sc": 0.0,
            "scm": "少年文工团，青春很茫然",
            "showCinemaNum": 0,
            "showNum": 0,
            "showst": 1,
            "snum": 2014,
            "star": "黄轩,苗苗,钟楚曦",
            "time": "2017",
            "ver": "2D/中国巨幕",
            "videoId": 88452,
            "videoName": "终极预告片 冯小刚拍摄三十年无人敢碰题材",
            "videourl": "http://maoyan.meituan.net/movie/videos/854x480ee92c5f537f4477a8d6b2d711efb677a.mp4",
            "vnum": 11,
            "weight": 1.0,
            "wish": 87953,
            "wishst": 0
          }, {
            "bingeWatch": 0,
            "cat": "剧情,喜剧",
            "civilPubSt": 0,
            "comingTitle": "12月1日 周五",
            "desc": "主演:郭德纲,于谦,岳云鹏",
            "dir": "张鹤栾",
            "dur": 91,
            "effectShowNum": 0,
            "followst": 0,
            "globalReleased": false,
            "haspromotionTag": false,
            "headLineShow": false,
            "headLines": [],
            "headLinesVO": [],
            "id": 342362,
            "img": "http://p1.meituan.net/w.h/movie/2a781edb2544c60182feac6fe8b23f27275081.jpg",
            "isMark": false,
            "late": false,
            "localPubSt": 0,
            "mk": 0.0,
            "movieType": 0,
            "newsHeadlines": [],
            "nm": "相声大电影之我要幸福",
            "pn": 11,
            "preShow": false,
            "proScore": 0.0,
            "proScoreNum": 0,
            "pubDate": 1512057600000,
            "pubShowNum": 0,
            "recentShowDate": 0,
            "recentShowNum": 0,
            "rt": "2017-12-01",
            "sc": 0.0,
            "scm": "于谦郭德纲，笑到你癫狂",
            "showCinemaNum": 0,
            "showNum": 0,
            "showst": 1,
            "snum": 765,
            "star": "郭德纲,于谦,岳云鹏",
            "ver": "2D",
            "videoId": 89653,
            "videoName": "群星版预告片",
            "videourl": "http://maoyan.meituan.net/movie/videos/854x480e4721e7cb3694e9ba357ac5b65206c8c.mp4",
            "vnum": 1,
            "weight": 1.0,
            "wish": 61002,
            "wishst": 0
          }, {
            "bingeWatch": 0,
            "cat": "剧情,奇幻",
            "civilPubSt": 0,
            "comingTitle": "12月29日 周五",
            "desc": "主演:王俊凯,迪丽热巴,董子健",
            "dir": "韩杰",
            "dur": 0,
            "effectShowNum": 0,
            "followst": 0,
            "globalReleased": false,
            "haspromotionTag": false,
            "headLineShow": false,
            "headLines": [],
            "headLinesVO": [],
            "id": 343945,
            "img": "http://p1.meituan.net/w.h/movie/e1134da5e8a314a2fda87ce79fd9f085262355.jpg",
            "isMark": false,
            "late": false,
            "localPubSt": 0,
            "mk": 0.0,
            "movieType": 0,
            "newsHeadlines": [],
            "nm": "解忧杂货店",
            "pn": 57,
            "preShow": false,
            "proScore": 0.0,
            "proScoreNum": 0,
            "pubDate": 1514476800000,
            "pubShowNum": 0,
            "recentShowDate": 0,
            "recentShowNum": 0,
            "rt": "2017-12-29",
            "sc": 0.0,
            "scm": "",
            "showCinemaNum": 0,
            "showNum": 0,
            "showst": 1,
            "snum": 2479,
            "star": "王俊凯,迪丽热巴,董子健",
            "ver": "2D",
            "videoId": 89508,
            "videoName": "定档1229预告片 治愈烦恼暖心跨年",
            "videourl": "http://maoyan.meituan.net/movie/videos/854x480fb2d56376671417bb1c091a8f0694a21.mp4",
            "vnum": 1,
            "weight": 1.0,
            "wish": 59198,
            "wishst": 0
          }, {
            "bingeWatch": 0,
            "cat": "剧情,动作,悬疑",
            "civilPubSt": 0,
            "comingTitle": "11月24日 周五",
            "desc": "主演:张涵予,福山雅治,戚薇",
            "dir": "吴宇森",
            "dur": 0,
            "effectShowNum": 0,
            "followst": 0,
            "globalReleased": false,
            "haspromotionTag": false,
            "headLineShow": false,
            "headLines": [],
            "headLinesVO": [],
            "id": 248075,
            "img": "http://p0.meituan.net/w.h/movie/1b062f640e5f93036086c7265ad7131a584340.png",
            "isMark": false,
            "late": false,
            "localPubSt": 0,
            "mk": 0.0,
            "movieType": 0,
            "newsHeadlines": [],
            "nm": "追捕",
            "pn": 176,
            "preShow": false,
            "proScore": 0.0,
            "proScoreNum": 0,
            "pubDate": 1511452800000,
            "pubShowNum": 0,
            "recentShowDate": 0,
            "recentShowNum": 0,
            "rt": "2017-11-24",
            "sc": 0.0,
            "scm": "吴导携白鸽，经典再重塑",
            "showCinemaNum": 0,
            "showInfo": "2017-11-24 下周五上映",
            "showNum": 0,
            "showst": 4,
            "snum": 481,
            "star": "张涵予,福山雅治,戚薇",
            "ver": "2D",
            "videoId": 89602,
            "videoName": "剧情版预告片 张涵予“勾结”福山雅治玩命“洗白”",
            "videourl": "http://maoyan.meituan.net/movie/videos/854x4800987a10dce7847ef9434620f580b57c8.mp4",
            "vnum": 10,
            "weight": 1.0,
            "wish": 50559,
            "wishst": 0
          }]
      }
    },
    mounted(){
      //初始化body宽度
      let oWrap = document.querySelector('.recent'),
          oBody = document.querySelector('.recent-body'),
          oLi = oBody.querySelectorAll('.item'),style,
          aLi = oLi[0];
      try{
        style = window.getComputedStyle(aLi,null);
      }catch(e){
        style = aLi.currentStyle;
      }
      oBody.style.width = parseFloat(style.width) * oLi.length + 'px';
      //确定ul左边临界值
      this.startX = oBody.getBoundingClientRect().left - document.documentElement.clientLeft || 2; //解决ie7的left多出2px的bug
      //确定ul右边临界值
      this.endX = oWrap.getBoundingClientRect().width - oBody.getBoundingClientRect().width;
      console.log(oWrap.getBoundingClientRect().width);
      console.log(oBody.getBoundingClientRect().width);
    },
    methods: {
      start(ev){
        this.disX = ev.changedTouches[0].clientX;
      },
      move(ev){
        let obj, //当前手指对象
            target, //ul对象
            left, //ul左边距
            right; //ul右边距

        obj = ev.changedTouches[0];
        target = document.querySelector('.recent-body');
        left = target.getBoundingClientRect().left - document.documentElement.clientLeft || 2; //解决ie7的left多出2px的bug
        left = left  + obj.clientX - this.disX;
        //临界判断
        if(left > this.startX){
          target.style.left = this.startX;
        }else if(left < this.endX){
          target.style.left = this.endX;
        }else{
          //移动ul
          target.style.left = left + 'px';
        }
        this.disX = obj.clientX; //重新赋值
      },
      end(ev){
        this.disX = ev.changedTouches[0].clientX;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../style/base";

  .recent{
    position: relative;
    width: 100%;
    height: 700 / @rem;
    margin: 0 0 35/@rem 0;
    padding-left: 32 / @rem;
    padding-bottom: 66 / @rem;
    border-top: 1px solid @grey;
    border-bottom: 1px solid @grey;
    overflow-x: hidden;
    .title{
      padding: 40 / @rem 0;
      color: @6e;
      font-weight: 300;
      font-size: 40 / @rem;
    }
    .recent-body{
      position: absolute;
      left: 32 / @rem;
      .clearfix;
      .item{
        position: relative;
        float: left;
        width: 275 / @rem;
        padding-right: 30 / @rem;
        &:after{
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 85 / @rem;
          height: 85 / @rem;
          background-color: #6d8293;
          opacity: .5;
        }
        .love{
          position: absolute;
          top: 15 / @rem;
          left: 15 / @rem;
          width: 55 / @rem;
          height: 55 / @rem;
          z-index: 99999;
        }
        .empty{
          background: url('../../../images/sprite.png') no-repeat 0 -110/@rem;
          background-size: 220 / @rem 165 / @rem;
        }
        .full{
          background: url('../../../images/sprite.png') no-repeat -165/@rem -55/@rem;
          background-size: 220 / @rem 165 / @rem;
          opacity: .7;
        }
      }
      .img{
        width: 100%;
        height: 330 / @rem;
      }
      .name{
        width: 100%;
        .ellipsis;
      }
      .wish{
        color: @movieInfo;
      }
      .date{
        color: @movieInfo;
      }
    }
  }
</style>
