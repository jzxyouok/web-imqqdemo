/* Todo
 * 
 * 1.广告条txt下的几个小图片和字。
 *   
 * 2.适配1920分辨率。
 *   关于在1920分辨率下 banner 图片显示问题：
 *   是通过 jQuery 响应浏览器窗口尺寸，
 *   动态修改 banner-warp 元素的 height 值（固定的比例计算出结果），
 *   并切换显示适合当前屏幕浏览的 banner 图片，包括其背景图片
 *   目前先以当前浏览器尺寸为主，写完大部分布局后再做1920分辨率的适配。
 */

//页面加载
$(document).ready(function() {
  var index = 0;
  var maximg = 2;
  var showtime = 3000; //焦点图切换延迟时间
  var txtIcon = $(".txticon");
  
  //默认三个icon为透明
  $(txtIcon).css("opacity", "0");
  
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
    if(!$(aboutWeb).is(":animated")) { //如果元素当前不在动画才会执行以下代码，防止用户快速点击造成动画累积
      if ($(this).parent().css("bottom") != "0px") {
        $(this).parent().animate({bottom:'0px'},400);
        $(this).children("div").css("background-image", "url(images/more02.png)");
      } else {
        $(this).parent().animate({bottom:'-460px'},400);
        $(this).children("div").css("background-image", "url(images/more01.png)");
      }
    }
    e.stopPropagation(); //每次触发事件都会阻止事件的冒泡
  });
  
  $(aboutWeb).click(function (e){ //阻止内容区域的事件冒泡，避免点击内容区域也会收缩
    e.stopPropagation();
  });
  
  $(document).click(function (){
    if(!$(aboutWeb).is(":animated")){ //如果元素当前不在动画才会执行以下代码，防止用户快速点击造成动画累积
      $(aboutH3).parent().animate({bottom:'-460px'},400);
      $(aboutH3).children("div").css("background-image", "url(images/more01.png)");
    }
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
  var scrollTop = $(document).scrollTop();
  var txtIcon = $(".txticon");
  var iosHeight = $(".txticon").offset().top;
  var h3Height = $(".aboutweb > h3").offset().top;
  var aboutWeb = $(".aboutweb");
  
  
  //三个icon出现的动画  
  if($(txtIcon).css("opacity") == "0"){
    if (scrollTop >= (docHeight - sHeight)-600){
      setTimeout(function (){
        $(txtIcon).animate({opacity:"1"},300);
      },100);
    }
  }
  
  if($(txtIcon).css("opacity") == "1"){
    if (scrollTop < (docHeight - sHeight)-670){
      $(txtIcon).stop();
      $(txtIcon).css("opacity", "0");
    }
  }
  
  //底部关于条的出现动画
  if($(aboutWeb).css("bottom") == "-500px"){
    if (scrollTop >= (docHeight - sHeight) - 20){
        $(aboutWeb).animate({bottom:"-460px"},300);
    }
  }
  
  if($(aboutWeb).css("bottom") != "0px"){
    if (scrollTop <= (docHeight - sHeight) - 40){
      $(aboutWeb).css("bottom", "-500px");
    }
  }
});

//banner图片以及导航点的轮换效果
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