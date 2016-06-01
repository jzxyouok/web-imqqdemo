/* Todo
 * 
 * 1.广告条txt下的几个小图片和字。
 * 
 * 2.3个icon跳出动画。
 * 
 * 关于这个网页板块制作:
 *   标题条平时为隐藏状态，当页面滚动到最底部时，以自下而上的效果显示标题条。
 *   页面滚动出时将标题条隐藏。
 *   标题后面加一个收起和展开的图标，点击展开从页面最下端向上滑动展开内容，
 *   此时展开图标变换为收起图标。
 *   点击收起图标内容向下滑动收回内容。
 *   除了点击内容外，点击页面其他区域也能向下回收内容。
 *   
 * 3.适配1920分辨率。
 *   关于在1920分辨率下 banner 图片显示问题：
 *   是通过 jQuery 响应浏览器窗口尺寸，
 *   动态修改 banner-warp 元素的 height 值（固定的比例计算出结果），
 *   并切换显示适合当前屏幕浏览的 banner 图片，包括其背景图片
 *   目前先以当前浏览器尺寸为主，写完大部分布局后再做1920分辨率的适配。
 * 
 * 4.适配 IE7 的雪碧图。IE的透明hack
 */

//页面加载
$(document).ready(function() {
  var index = 0;
  var maximg = 2;
  var showtime = 3000;
  
  
  //鼠标滑过导航条效果
  $(".nav-ul > li").hover(function (){
      if ($(this).children().attr("class") != "current"){
        $(this).children("a").css("background-color", "#09b4f9");
        $(this).siblings().children("a")
        .css("background-color", "transparent");
      }
  }, function (){
    if($(this).children().attr("class") != "current"){
      $(".nav-ul > li .current")
      .css("background-color", "#09b4f9");
      $(this).children("a")
      .css("background-color", "transparent");
    }
  });
  
  //鼠标悬停在banner点上的动画效果
  $(".nav-dot > span").mouseover(function() {
    if ($(this).attr("class") != "nav-dot-on") {
      $(this).addClass("nav-dot-on").siblings().attr("class", "");
    }
  });
  
  //滑动banner点切换图片
  $(".nav-dot > span").mouseover(function (){
    if (MyTime) {
      clearInterval(MyTime);
    }
    index = $(".nav-dot > span").index(this);
    index++;
    if (index == maximg) {index = 0;}
    MyTime = setTimeout(function() {
      ShowjQueryFlash(index);
      $(".banner").stop();
    }, 300);
  });
  
  //滑入banner停止动画，滑出开始动画
  $(".banner, .shadow").hover(function() {
    if (MyTime) {
      clearInterval(MyTime);
    }
  }, function() {
    MyTime = setInterval(function() {
      ShowjQueryFlash(index);
      index++;
      if (index == maximg) {index = 0;}
    }, showtime);
  });
  
  //自动播放
  var MyTime = setInterval(function(){
    ShowjQueryFlash(index);
    index++;
    if (index==maximg) {index=0;}
  } , showtime);
  
  //底部关于条折叠动画
  var aboutH3 = $(".aboutweb > h3");
  var aboutWeb = $(".aboutweb");
  
  $(aboutH3).click(function (e){
    if ($(this).parent().css("bottom") != "0px") {
      $(this).parent().animate({bottom:'0px'},400);
      $(this).children("div").css("background-image", "url(images/more02.png)");
    } else {
      $(this).parent().animate({bottom:'-460px'},400);
      $(this).children("div").css("background-image", "url(images/more01.png)");
    }
    e.stopPropagation(); //每次触发事件都会阻止事件的冒泡
  });
  
  $(aboutWeb).click(function (e){ //阻止内容区域的事件冒泡，避免点击内容区域也会收缩
    e.stopPropagation();
  });
  
  $(document).click(function (){
    $(aboutH3).parent().animate({bottom:'-460px'},400);
    $(aboutH3).children("div").css("background-image", "url(images/more01.png)");
  });
});

//滚动条事件
$(window).scroll(function (){
  
  var scrollTop = $(window).scrollTop();
  
  //浏览器滚动到一定位置，显示新导航条
  if(scrollTop > 700){
    $(".nav-b").show();
  } else {
    $(".nav-b").hide();
  }
  
  //响应滚动条来调整背景图片的位置
  $(".bgimgs > div").css("background-position-y", scrollTop*0.02);
  
  var sHeight = $(window).height();
  var docHeight = $(document).height();
  var iosHeight = $(".txticon").offset().top;
  var h3Height = $(".aboutweb > h3").offset().top;
  var scrollTop = $(window).scrollTop();
  
  
  //三个icon跳出的动画  
  //543px
  
  //底部关于条的出现动画
  //627px
  console.log(h3Height);
  
  
});

//banner图片以及banner点的轮换效果
function ShowjQueryFlash(i) {
$(".banner > li").eq(i)
    .animate({opacity: 0},1000)
    .css({"z-index": "0"})
    .siblings()
    .animate({opacity: 1},1000)
    .css({"z-index": "1"});
    
$(".nav-dot > span").eq(i-1)
    .addClass("nav-dot-on")
    .siblings()
    .attr("class", "");
}

