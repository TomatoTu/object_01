$(document).data('webupload', new Array());
$.extend({
    // 自动图片大小
    imgCount: function (item) {
        var imgH = item.height();
        var imgW = item.width();
        var parent = item.parent();
        var imgHeight = parent.height();
        var imgWidth = parent.width();

        if ((imgWidth / imgHeight) > (imgW / imgH)) {
            item.css({'width': (imgH / imgW) * ((imgWidth * 1.00) / imgHeight) * 100 + '%', 'max-width': (imgH / imgW) * ((imgWidth * 1.00) / imgHeight) * 100 + '%', 'left': -((imgH / imgW) * ((imgWidth * 1.00) / imgHeight) * 100 - 100) / 2 + '%'})
        } else {
            item.css({'height': (imgW / imgH) * ((imgHeight * 1.00) / imgWidth) * 100 + '%', 'max-height': (imgW / imgH) * ((imgHeight * 1.00) / imgWidth) * 100 + '%', 'top': -((imgW / imgH) * ((imgHeight * 1.00) / imgWidth) * 100 - 100) / 2 + '%'})
        }
    },
    //验证E-mail格式
    isEmail: function (vl) {
        return /^(([a-zA-Z\-_0-9\.]+)@[a-zA-Z\-_0-9]+\.([a-zA-Z]+(\.)?)?[a-zA-Z]+)$/.test($.trim(vl));
    },
    //验证是否为空
    isEmpty: function (vl) {
        return $.trim(vl).length == 0;
    },
    isNllEmpty: function (vl) {
        if (vl == null || vl == 'undefined')
            return true;
        return $.trim(vl).length == 0;
    },
    //验证长度范围
    isBetween: function (vl, min, max) {
        var len = $.trim(vl).length;
        if (len < min || len > max)
            return false;
        return true;
    },
    //验证是否由字母数字组合
    isCharAndNum: function (vl) {
        return /^([a-z A-Z 0-9]+)$/.test($.trim(vl));
    },
    //判断是否正整数
    isZInt: function (vl) {
        var pattern = /^[0-9]*[1-9][0-9]*$/;
        return pattern.test($.trim(vl));
    },
    isImgUrl: function (vl) {
        vl = vl.toLowerCase();
        var urls = vl.split('.');
        var imgType = urls[urls.length - 1];
        if (imgType == 'jpg' || imgType == 'gif' || imgType == 'png' || imgType == 'jpeg' || imgType == 'bmp') {
            return true;
        }
        return false;
    },
    escapeHtml: function (str) {
        var entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };
        return String(str).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    },
    //获取时间戳
    getTimeStamp: function () {
        return new Date().getTime();
    },
    //加载
    Loading: function () {
        var editLoading = $('#edit_loading');
        if (editLoading.length == 0) {
            editLoading = $('<div class="load-b" id="edit_loading" style="z-index:8888"><div class="load-img-b"><img src="/images/loading.gif"></div></div>');
            $('body').append(editLoading);
        }
        var mask = $('#mask-loading');
        if (mask.length == 0) {
            mask = $('<div class="mask-b" id="mask-loading" style="z-index: 8887;"></div>');
            $('body').append(mask);
        }
        editLoading.css('top', ($('html,body').scrollTop() + $(window).height() / 2));
        editLoading.show();
        mask.show();
    },
    //删除加载
    UnLoading: function () {
        var editLoading = $('#edit_loading');
        var mask = $('#mask-loading');
        if (editLoading.length > 0) {
            editLoading.hide();
        }
        if (mask.length > 0) {
            mask.hide();
        }
    },
    WinBox: function () {
        var winBox = $('<div></div>').addClass('whitemask').hide();
        winBox.css('z-index', 100);
        $('body').append(winBox);
        winBox.show();
        return winBox;
    },
    //显示弹出窗
    WinDialog: function (html, callFun, closeFun) {
        var winBox = $.WinBox();
        var winDialog = $('<div></div>').addClass('images-pop').hide();
        winDialog.append('<div class="images-pop-in"><div class="pop-close"><i class="icon-other icon-popclose"></i></div><div class="windialog_inner"></div></div>');
        winDialog.find('div.windialog_inner:first').append(html);
        $('body').append(winDialog);
        winDialog.on('click', '.pop-close', function () {
            winBox.remove();
            winDialog.remove();
            if (typeof closeFun == 'function') {
                closeFun();
            }
        });
        if (typeof callFun == 'function') {
            callFun(winDialog, winBox);
        }
        winBox.show();
        winDialog.show();
    },
    GetToken: function () {
        var csrfToken = $('meta[name=csrf-token]');
        if (csrfToken.length > 0)
            return csrfToken.attr('content');
        return null;
    },
    //ajax请求
    WebRequest: function (posturl, postdata, callFun) {
        top.$.Loading();
        var token = $.GetToken();
        if (token != null) {
            if (postdata == null)
                postdata = {};
            postdata['_csrf'] = token;
        }
        $.ajax({
            type: "post",
            url: posturl,
            data: postdata,
            async: true,
            dataType: "json",
            success: function (response) {
                if (!$.RequestErrorFun(response)) {
                    top.$.UnLoading();
                    return;
                }
                if (typeof callFun == 'function') {
                    callFun(response.data);
                }
                top.$.UnLoading();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                top.$.UnLoading();
            }
        });
    },
    //请求出错处理
    RequestErrorFun: function (response) {
        if (response.code == null)
            return false;
        if (!response.code)
            alert("请求失败！");
        return response.code;
        switch (response.code) {
            case -404:
                alert("Login timeout, please login again!");
                return false;
            case -500:
                alert("Server error!");
                return false;
        }
        return true;
    },
    //加载页面
    GetPage: function (menuID) {
        if (viewbox != null) {
            viewbox.webEditor("GetMenu", menuID);
        }
    },
    //跳转到首页
    GotoMainPage: function () {
        if (viewbox != null) {
            viewbox.webEditor("GotoMainPage");
        }
    },
    //刷新当前页面
    RefreshPage: function () {
        if (viewbox != null) {
            viewbox.webEditor("RefreshPage");
        }
    },
    ReleasePage:function(callFun){
        if (viewbox != null) {
            viewbox.webEditor("ReleasePage",callFun);
        }
    },
    //保存
    SaveEditer: function () {
        if (viewbox != null) {
            viewbox.webEditor("SavaCurPage");
        }
    },
    //设置模板
    SetPageTemplate: function (id, colorID) {
        if (viewbox != null) {
            viewbox.webEditor("SetPageTemplate", id, colorID);
        }
    },
    //显示操作结果
    ShowResultMag:function(mag,rel){
        var magHtml='<div class="popstatus_in"><div class="icon"><i class="icon_statue_b '+(rel?'icon_statue_success_b':'icon_statue_error_b"')+'"></i></div><div class="popstatus_text">'+mag+'</div></div>';
        var item=$('<div></div>');
        item.addClass('popstatus').html(magHtml).hide();
        $('body').append(item);
        item.css({'left':'50%','top':'50px','margin-left':(0-item.width()/2)+'px'}).fadeIn();
        window.setTimeout(function(){item.fadeOut('normal',function(){$(this).remove()});},2000);
    },
    //设置显示宽度
    SetIframeWith: function (type) {
        var width = '100%';
        switch (type) {
            case 2:
                width = '768px';
                break;
            case 3:
                width = '1024px';
                break;
            case 4:
                width = '320px';
                break;
            case 5:
                width = '480px';
                break;
        }
        $('.viewbox_in:first').css('width', width);
     
    },
    //设置图片比例
    AutoImgSize: function (box) {
        box.find('.img-count').each(function (index, element) {
            element = $(element);
            var imgH = element.height();
            var imgW = element.width();
            var curImg = element.find('img');
            var img = new Image();
            img.src = curImg.attr('src');
            var imgWidth = img.width;
            var imgHeight = img.height;
            img.onload = function () {
                if ((imgWidth / imgHeight) > (imgW / imgH)) {
                    curImg.css({'width': (imgH / imgW) * ((imgWidth * 1.00) / imgHeight) * 100 + '%', 'max-width': (imgH / imgW) * ((imgWidth * 1.00) / imgHeight) * 100 + '%', 'left': -((imgH / imgW) * ((imgWidth * 1.00) / imgHeight) * 100 - 100) / 2 + '%'})
                } else {
                    curImg.css({'height': (imgW / imgH) * ((imgHeight * 1.00) / imgWidth) * 100 + '%', 'max-height': (imgW / imgH) * ((imgHeight * 1.00) / imgWidth) * 100 + '%', 'top': -((imgW / imgH) * ((imgHeight * 1.00) / imgWidth) * 100 - 100) / 2 + '%'})
                }
            }
        });
    },
    AutoImageSize: function (item) {
        var imgWidth = item.width;
        var imgHeight = item.height;
        item = $(item);
        var parent = item.parent();
        var boxH = parent.height();
        var boxW = parent.width();
        if (imgWidth > boxW) {
            imgHeight = imgHeight * (boxW / imgWidth);
            imgWidth = boxW;
        }
        if (imgHeight > boxH) {
            imgWidth = imgWidth * (boxH / imgHeight);
            imgHeight = boxH;
        }
        item.css({'width': imgWidth + 'px', 'height': imgHeight + 'px', 'left': (boxW - imgWidth) / 2 + "px", 'top': (boxH - imgHeight) / 2 + "px"});
    },
    //上传文件
    onUpload: function (options, actions) {
        var defaultOpts = {
            // 选完文件后，是否自动上传。
            auto: true,
            // swf文件路径
            swf: '/js/lib/webupload/Uploader.swf',
            // 文件接收服务端。
            server: '/upload/uploadimage',
            //通过粘贴来添加截屏的图片
//                paste:document.body,
            // form数据
            formData: {
                host_id: HOSTCONFIG.HOST_ID,
                encode: 'utf-8'
            },
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                'id': '.btn-upload-image',
                'multiple': false
            },
            // 上传的input的name
            fileVal: 'upLoad',
            //重复验证
            duplicate: true,
            // 禁用全局拖拽
            disableGlobalDnd: true,
            //文件限制
            fileNumLimit: 10,
            fileSingleSizeLimit: 5 * 1024 * 1024, // 5 M
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        }
        var uploader = WebUploader.create($.extend({}, defaultOpts, options));
        if ($.isPlainObject(actions) || $.isArray(actions)) {
            for (var key in actions) {
                $.isFunction(actions[key]) && uploader.on(key, actions[key]);
            }
        }
        // 拖拽时不接受 js, txt 文件。
        uploader.on('dndAccept', function (items) {
            var denied = false,
                    len = items.length,
                    i = 0,
                    // 修改js类型
                    unAllowed = 'text/plain;application/javascript';
            for (; i < len; i++) {
                // 如果在列表里面
                if (~unAllowed.indexOf(items[ i ].type)) {
                    denied = true;
                    break;
                }
            }

            return !denied;
        });
        // 拖拽时不接受 js, txt 文件。
        uploader.on('error', function (items) {
            if (items == 'Q_TYPE_DENIED') {
                top.$.ShowResultMag('上传文件格式不正确。',false);
            }
            var denied = false,
                    len = items.length,
                    i = 0,
                    // 修改js类型
                    unAllowed = 'text/plain;application/javascript ';
            for (; i < len; i++) {
                // 如果在列表里面
                if (~unAllowed.indexOf(items[ i ].type)) {
                    denied = true;
                    break;
                }
            }
            return !denied;
        });
        uploader.on('uploadError', function (file) {
            top.$.ShowResultMag('上传失败。',false);
        });
        $(document).data('webupload').push(uploader);
        return uploader;
    }
});
//组件类型
var COMPONENTTYPE = {
    FRAME: 1,
    TITLE: 2,
    TEXT: 3,
    RICHTXT: 4,
    IMAGE: 5,
    GALLERY: 6,
    SLIDESHOW: 7,
    MAP: 8,
    CODE: 9,
    DIVIDER: 10,
    SPACER: 11,
    BUTTON: 12,
    SEARCH: 13,
    VIDEOLINK: 14,
    FLASH: 15,
    FILE: 16,
    SOCIALICONS: 17,
    PRODUCT: 18,
    ARTICLE: 19,
    FEEDBACK:20,
    VOTE:21,
    QUESTIONNAIRE:22
};
var UPFILETYPE = {
    IMAGE: 0,
    FILE: 1,
    FLASH: 2
};
$(function () {
    $(document).bind("ajaxSend", function (event, jqxhr, settings) {
        if (settings.data) {
            settings.data += '&host_id=' + HOSTCONFIG.HOST_ID;
        } else {
            jqxhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            settings.data = 'host_id=' + HOSTCONFIG.HOST_ID;
        }
    });
});
