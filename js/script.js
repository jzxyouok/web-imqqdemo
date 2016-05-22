/* Todo
 * 通过导航条的ul列表实现原网页的间隙不跳转。
 * 
 */

//页面加载执行开始
$(document).ready(function() {
  var index = 0;
  var maximg = 2;
  
  //导航条鼠标滑过效果
  $(".nav-ul > li").hover(function (){
    if ($(this).attr("class") != "current"){
      $(this).css("background-color", "#09b4f9")
      .siblings("li")
      .css("background-color", "transparent");
    }
  }, function (){
    $(".nav-ul .current")
    .css("background-color", "#09b4f9")
    .siblings("li")
    .css("background-color", "transparent");
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
    .css({"z-index": "0"})
    .siblings()
    .animate({opacity: 1},1000)
    .css({"z-index": "1"});
    
$(".btn-txt > h2").eq(i)
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
