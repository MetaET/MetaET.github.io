//  Preloader
jQuery(window).on("load", function () {
    $('#preloader').fadeOut(500);  //淡出效果
    $('#main-wrapper').addClass('show');  //添加类show
});


(function ($) {

    "use strict"

    //  Header fixed
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) {
            $('.header').addClass("animated slideInDown fixed"), 3000;
        } else {
            $('.header').removeClass("animated slideInDown fixed"), 3000;
        }
    });

    $('.duration-option a')
        .on('click', function () {
            $(".duration-option a.active")
                .removeClass("active");
            $(this)
                .addClass('active');
        });


    // Custom Selectbox  自定义选择框

    //点击时
    $('.drop-menu').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');  //toggleClass 如果存在（不存在）就删除（添加）一个类。
        $(this).find('.dropeddown').slideToggle(300);  //通过高度变化来切换所有匹配元素的可见性，并在切换完成后可选地触发一个回调函数。
    });
    //focusout失去焦点
    $('.drop-menu').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropeddown').slideUp(300);  //通过高度变化（向上减小）来动态地隐藏所有匹配的元素，在隐藏完成后可选地触发一个回调函数。
    });
    $('.drop-menu .dropeddown li').click(function () {
        $(this).parents('.drop-menu').find('span').text($(this).text());  //取得一个包含着所有匹配元素的祖先元素的元素集合（不包含根元素）。可以通过一个可选的表达式进行筛选。
        $(this).parents('.drop-menu').find('input').attr('value', $(this).attr('id'));
    });


    // File Upload  文件上传
    $(".file-upload-wrapper").on("change", ".file-upload-field", function () {
        $(this).parent(".file-upload-wrapper").attr("data-text", $(this).val().replace(/.*(\/|\\)/, ''));
    });


    //to keep the current page active  保持当前页面活动
    $(function () {
        for (var nk = window.location,
            o = $(".navbar-nav a").filter(function () {
                return this.href == nk;
            })
                .addClass("active")
                .parent()
                .addClass("active"); ;) {
            // console.log(o)
            if (!o.is("li")) break;
            o = o.parent()
                .addClass("show")
                .parent()
                .addClass("active");
        }

    });

    // $(function() {
    //     // var win_w = window.outerWidth;
    //     var win_h = window.outerHeight;
    //     var win_h = window.outerHeight;
    //     if (win_h > 0 ? win_h : screen.height) {
    //         $(".authincation").css("min-height", (win_h + 60) + "px");
    //     };
    // });



})(jQuery);











//ripple effect on button  按钮的涟漪效应
Waves.init();
Waves.attach('.wave-effect');
Waves.attach('.btn');
Waves.attach('button');