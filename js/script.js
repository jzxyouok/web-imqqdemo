/* Todo
 * 1.鼠标滑入导航菜单再滑出，banner 不会停止轮换。
 * 
 * 2.把 title 和download 元素放置到与其相对应的 banner li 标签里，
 *   直接控制 banner li 的动画即可。压缩 jQuery 和 CSS 的代码量。
 * 
 * 3.banner 按钮和标题1920分辨率下显示的问题，看是否能通过2方法解决。
 * 
 * 关于在1920分辨率下 banner 图片显示问题：
 * 是通过 jQuery 响应浏览器窗口尺寸，
 * 动态修改 banner-warp 元素的 height 值（固定的比例计算出结果），
 * 并切换显示适合当前屏幕浏览的 banner 图片，
 * 目前先以当前浏览器尺寸为主，写完大部分布局后再做1920分辨率的适配。
 */

//页面加载执行开始
$(document).ready(function() {
  var index = 0;
  var maximg = 2;
  
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
  
  //鼠标悬停在banner点上的事件
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
  $(".banner").hover(function() {
    if (MyTime) {
      clearInterval(MyTime);
    }
  }, function() {
    MyTime = setInterval(function() {
      ShowjQueryFlash(index);
      index++;
      if (index == maximg) {index = 0;}
    }, 3000);
  });
  
  //自动播放
  var MyTime = setInterval(function(){
    ShowjQueryFlash(index);
    index++;
    if (index==maximg) {index=0;}
  } , 3000);
  
});

//banner图片以及banner点的轮换效果
function ShowjQueryFlash(i) {
  $(".banner > li").eq(i)
    .animate({opacity: 0},1000)
    .css({"z-index": "-2"})
    .siblings()
    .animate({opacity: 1},1000)
    .css({"z-index": "-1"});
    
  $(".btn-txt > h2").eq(i)
    .animate({opacity: 0},1000)
    .css({"z-index": "-2"})
    .siblings()
    .animate({opacity: 1},1000)
    .css({"z-index": "-1"});
    
  $(".nav-dot > span").eq(i-1)
    .addClass("nav-dot-on")
    .siblings()
    .attr("class", "");
}
