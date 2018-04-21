
// var pS= new pageSwitch('pageAll', {
//         direction:'horizontal',
//         easing:'ease-in',
//         duration:300,
//         autoPlay:true,
//         loop:'false',
//         interval: 5000
//     });

var pS = new pageSwitch('pageAll', {
            duration: 1000,//int 页面过渡时间
            direction: 0,//int 页面切换方向，0横向，1纵向
            start: 0,//int 默认显示页面
            loop: true,//bool 是否循环切换
            ease: 'ease',//string|function 过渡曲线动画，详见下方说明
            transition: 'scroll',//string|function转场方式，详见下方说明
            freeze: false,//bool 是否冻结页面（冻结后不可响应用户操作，可以通过 `.freeze(false)` 方法来解冻）
            mouse: true,//bool 是否启用鼠标拖拽
            mousewheel: false,//bool 是否启用鼠标滚轮切换
            arrowkey: false,//bool 是否启用键盘方向切换
            autoplay: true,    //bool 是否自动播放幻灯 新增
            interval: 5000//bool 幻灯播放时间间隔 新增
});

    //action
    /* Interface
    *  showContent(obj) : obj is the name of the id you want show. ex: showContent('hiddenContent')
    *  hideContent(obj) : obj is the name of the id you want hide. ex: hideContent('hiddenContent')
    *  jumpContent(obj,img): obj is the name of the id you want jump out. img is the name of the staff you want cover. ex:jumpContent('jumpContent','image')
    *  jumpBack(obj,img): obj is the name of the id you want jump out. img is the name of the staff you want cover. ex:jumpBack('jumpContent','image')
    */
    function showContent(obj){
        $("#"+obj).fadeIn("slow");
    }
    function hideContent(obj){
        $("#"+obj).fadeOut("slow");
    }
    // fontsize 控制字体大小 vh 是特殊单位，代表把整个窗口高度的1%，vw 是特殊单位，代表把整个窗口宽度的1%，
    function jumpContent(obj,img){
        var win_height = $("#"+img).height();
        var win_width = $("#"+img).width();
        $("#"+obj).animate({opacity: 0.9,height: win_height+"px",width:win_width+"px",top:0 +"px",left:0 +"px",fontSize:"3vh"},"fast");
        $("#"+obj).fadeIn(100);
        pS.pause();
	}

    function jumpBack(obj,img){
        var win_height = $("#"+img).height();
        var win_width = $(window).width();
        $("#"+obj).animate({opacity: 0,height: 0+"px",width:0+"px",top:0.5*win_height+"px",left:0.5*win_width+"px" ,fontSize:"3vh"},"fast");
        pS.play();
    }
