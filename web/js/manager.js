$(function () {
    initManager();
});

/**
 * 初始化主界面基础事件
 * @returns {undefined}
 */
function initManager() {
  
    initEditTool();

    //头部多语言切换事件
    var languageButton = $('#languageButton');
    languageButton.click(function () {
        $('#languageDown').toggle();
    });
}

/**
 * 初始化左侧组件区和模板区的事件
 * @returns {undefined}
 */
function initEditTool(){
    //左侧组件区滚动条
    if (navigator.appVersion.search(/MSIE 7/i) != -1)
    {
        var widow_height = document.body.clientHeight;
        var top_height = $('.edit-top').height();
        var navbar_height = $('.navbar-tool').outerHeight();
        var scroll_edit_height = widow_height - top_height - navbar_height;
        $('.section5').css('min-height', scroll_edit_height);
        $('.scroll-edit').slimScroll({height: scroll_edit_height, allowPageScroll: true, color: '#576568'});
    } else {
        $('.section5').css('min-height', '100%');
        $('.scroll-edit').slimScroll({height: '100%', allowPageScroll: true, color: '#576568'});
    }
    
     //左侧组件和模板切换事件
    var nvabarList = $('#navbarList').find('li');
    var curIndex = 0;
    var oldIndex = 0;
    nvabarList.each(function () {
        $(this).click(function () {
            if ($(this).hasClass('active'))
                return false;
            nvabarList.removeClass('active');
            $(this).addClass('active');
            oldIndex = curIndex;
            curIndex = $(this).index();
            if (oldIndex > curIndex) {
                $('#navbar_con' + (oldIndex + 1)).animate({'left': 234}, 500);
                $('#navbar_con' + (curIndex + 1)).animate({'left': 0}, 500);
            } else if (oldIndex < curIndex) {
                $('#navbar_con' + (oldIndex + 1)).animate({'left': -234}, 500);
                $('#navbar_con' + (curIndex + 1)).animate({'left': 0}, 500);
            }
        })
    });
}