/* Todo
 * 
 * 
 * 2.兼容IE7、8,三icon黑边问题；处理透明度问题。
 *   
 * 3.适配1920分辨率。
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
  

//  if($.support.leadingWhitespace){
//  alert("ie8以上")
//}else {
//  alert("ie8及以下")
//}


  //宽屏显示器兼容处理
  $(window).resize(function() { //当浏览器尺寸发生变化时触发此事件
    var sSize = 1890;           //宽屏阈值
    var sWidth = $(document).width();
    var bWarp = $(".banner-warp");
    var dBtn = $(".btn-download");
    var bTxt = $(".banner > li > h2");
    var b01 = $("#banner01");
    var b02 = $("#banner02");
    var bgimg01 = $("#bgimg01");
    var bgimg02 = $("#bgimg02");
    var bgimg03 = $("#bgimg03");
    
    if(sWidth > sSize){
      $(bWarp).css("height", sWidth*0.46);
      $(bTxt).css("top", "220px");
      $(dBtn).css("top", "550px");
      $(b01).css("background", "url(images/mb60-b.jpg)");
      $(b02).css("background", "url(images/im_pc_banner_b.jpg)");
      $(bgimg01).css("background-image", "url(images/fisrtbg.jpg)");
      $(bgimg02).css("background-image", "url(images/avd.jpg)");
      $(bgimg03).css("background-image", "url(images/blog.jpg)");
    }else {
      $(bWarp).css("height", "560px");
      $(bTxt).css("top", "15%")
      $(dBtn).css("top", "414px");
      $(b01).css("background", "url(images/mb60-s.jpg)");
      $(b02).css("background", "url(images/im_pc_banner.jpg)");
      $(bgimg01).css("background-image", "url(images/bg1_1600.jpg)")
      $(bgimg02).css("background-image", "url(images/avds.jpg)")
      $(bgimg03).css("background-image", "url(images/bg3_1600.jpg)")
    }
  });
  
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