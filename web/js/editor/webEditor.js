/**
 * 页面编辑器插件
 * 2015
 * xiaojx@35.cn
 */
(function ($, window) {
    /** 默认配置 */
    var defaults = {
        type: 'web',
        coms: null,
        moving: false,
        deleting: false,
        editing: false,
        copying: false,
        disable: false,
        pageid: 0,
        mouseTop: 0,
        mouseLeft: 0,
        moveMaskWidth: 0,
        moveMaskHeight: 0,
        editorTop: 0,
        editorLeft: 0,
        status: 0,
        gap: 5,
        layer: 3,
        jsurl: '/js/editor'
    };
    function webEditor(element, options) {
        this.element = element;
        this.$element = $(element);
        //整体区域
        this.$mainBox = this.$element;
        //logo区域
        this.$logoBox = null;
        //logo操作面板
        this.$logoWindow = null;
        //banner区域
        this.$bannerBox = null;
        //banner操作面板
        this.$bannerWindow = null;
        //Footer区域
        this.$footerBox = null;
        //Staor页面操作面板
        this.$storeWindow = null;
        //产品页面操作面板
        this.$productWindow = null;
        //关闭
        this.$footerCloseWin = null;
        //上传进度
        this.$upLoadingWindow = null;
        this.bannerClass = [{'id': 1, 'class': 'body-tallHeader'}, {'id': 2, 'class': 'body-shortHeader'}, {'id': 3, 'class': 'body-noHeader'}, {'id': 4, 'class': 'body-titleHeader'}];
        //Main区域
        this.$contentBox = null;
        //切换的容器
        this.$comBox = null;
        //拖拉蒙版
        this.$moveMask = null;
        //内页拖拉蒙版
        this.$innerMoveMask = null;
        //删除确认窗
        this.$deleteAlert = null;
        //复制窗
        this.$copyWindow = null;
        //组件操作面板
        this.$doWindow = null;
        //当前组件
        this.$curCom = null;
        //位置标识
        this.$posMask = null;
        //拖拉到哪个容器
        this.$dropBox = null;
        //拖拉到哪个相对组件
        this.$dropCom = null;
        //编辑定位用的挡板
        this.$baffle = null;
        this.$firstChild = null;
        this.$eidtLeftMask = null;
        //组件编辑器
        this.$comBar = {
            titleBar: null,
            txtToolBar: null,
            txtBar: null,
            buttonBar: null,
            dividerBar: null,
            searchBar: null,
            imageBar: null,
            galleryBar: null,
            galleryLinkBar: null,
            galleryCaptionBar: null,
            slideBar: null,
            slideLinkBar: null,
            slideCaptionBar: null,
            codeBar: null,
            mapBar: null,
            productBar: null,
            articleBar: null,
            flashBar: null,
            fileBar: null,
            videoLinkBar: null,
            socialIconsBar: null,
            socialIconsItemBar: null
        };
        //拖拉到容器的上下左右
        this.dropPos = '';
        //拖拉到哪一层
        this.dropLayer = 1;
        //是否新创建容器
        this.isNewBox = true;
        //当前组件ID
        this.curComID = 0;
        this.$doc = $(document);
        this.$topDoc = top.$(document);
        this.$body = $('body');
        this.$topBody = top.$('body');
        this.docTime = null;
        this.topTime = null;
        this.barTime = null;
        this.subbarTime = null;
        this.baffleTime = null;
        this.options = $.extend({}, defaults, options);
        this.boxParm = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        };
        this.comInfo = {};
        this.$colorBox = null;
        this.$textColorBox = null;
        this.pageData = {logo: null, banner: null, com: null};
        this.pageDataType = {LOGO: 'logo', BANNER: 'banner', COM: 'com'};
        this.upImgType = {UP: 1, LINK: 2};
        this.moveType = 0;
        //1：主体组件区，2：底部区
        this.moveBoxType = 1;
        this.saveComID = 0;
        this.menuType = 1;
        this.copyType = 0;
        this.iframeLeft = 237;
        this.iframeTop = 40;
        this.uuid = $.getTimeStamp();
        this.update = false;
        this._init();
    }
    webEditor.prototype = {
        //初始化
        _init: function () {
            this.$body.append('<' + 'script src="' + this.options.jsurl + '/bar/extend.js"><' + '/script>');
            //初始化组件拖拉蒙版和位置标识
            this._initMoveMask();
            //初始化组件操作面板(复制，移动和删除)
            this._initComWindow(this);
            this.$eidtLeftMask = top.$('#editTool').find('.edit-left-mask-b:first');
            ;
            //web站初始化

            if (this.options.type == 'web') {
                // this._initLogoWindow(this);
                // this._initBannerWindow(this);

                //初始化左侧组件新增区
                this._initLeftComs(this);
                //初始化上传进度条
                this._initUpLoading(0);
                this._autoCountWidth();
            } else if (this.options.type == 'wap') {
                this.options.disable = true;
                //  this.$eidtLeftMask.show();
            }

            this.GetPage(0);
            //禁用后退键
            this._eDocKeyDown();
        },
        //获取数据后初始化主体信息
        initMain: function () {
            var me = this;
            this.$contentBox = $(this.$element.find('div.wrap-content-in:first'));
            this.$comBox = this.$contentBox;
            //menuType(1:普通页面，2：系统页面)
            if (this.menuType == 2) {
                this.$eidtLeftMask.show();
            }
            if (this.menuType == 1) {
                this._initCopyWindow();
            }
            if (this.menuType == 1) {
//                if (SITECURMENU.prduct_id > 0) {
//                    this.$productWindow = null;
//                    this._initProductWindow(this);
//                }
            }
//            if (this.menuType == 2) {
//                this.$storeWindow = null;
//                this._initStoreWindow(this);
//                $.AutoImgSize(this.$contentBox);
//            }
            //logo
            var temlogo = this.$element.find('div.w-logo:first');
            if (temlogo.length > 0) {
                this.$logoBox = temlogo;
                this.$logoWindow = null;
                this._initLogoWindow(this);
                this._initLogoEvent(this);
            }
            //banner
            var tembanner = this.$element.find('div.banner:first');
            if (tembanner.length > 0) {
                this.$bannerBox = tembanner;
                this.$bannerWindow = null;
                this._initBannerWindow(this);
                this._initBannerEvent(this);
            }
            this.$baffle = null;
            //页面组件
            this.$contentBox.find('div.li-div[data-id]').each(function () {
                if (!$(this).hasClass('col-li-div')) {
                    //初始化组件事件
                    me._initBindComEvent(me, $(this));
                } else {
                    //初始化框架事件
                    me._initTableBox(me, $(this));
                }
            })
            this.moveBoxType = 1;
            this._initComWindow();
            //初始化底部
            this._initFooter();
            //   this._initBaffle(this.$comBox);
            //   this.$baffle.show();

        },
        //清除主体信息
        clearMain: function () {
            this.$contentBox = null;
            this.$comBox = null;
            this.$bannerBox = null;
            this.$footerBox = null;
            if (this.$baffle != null) {
                this.$baffle.hide();
                if (this.baffleTime != null)
                    clearInterval(this.baffleTime);
            }
            if (this.$footerCloseWin != null)
                this.$footerCloseWin.hide();
            this.moveBoxType = 1;
        },
        //复制
        _initCopyWindow: function () {
            var me = this;
            var menuBox = this.$copyWindow.find('div.list-box-b:first');
            menuBox.html('');
            var menuHtml = '<ul><li style="display:none;" data-pageid="' + HOSTCONFIG.PAGE_ID + '"  data-disable="0"><i>(当前页面)</i></span></li>' + this._createCopyMenuHtml(0, 1) + '</ul>';
            menuBox.html(menuHtml);
            var copyBtn = this.$copyWindow.find('.pop-btn-group-b .btn-b');
            var copyMenuBox = this.$copyWindow.find('div.list-box-b:first');
            this.$copyWindow.off('click').on('click', function () {
                return false;
            });
            $(copyBtn[0]).removeClass('btn-gray-b').addClass('btn-green-b').addClass('btn-cur');
            $(copyBtn[1]).removeClass('btn-green-b').removeClass('btn-cur').addClass('btn-gray-b');
            $(copyBtn[0]).off('click').on('click', function () {
                //移动
                me.copyType = 0;
                $(this).removeClass('btn-gray-b').addClass('btn-green-b').addClass('btn-cur');
                $(copyBtn[1]).removeClass('btn-green-b').removeClass('btn-cur').addClass('btn-gray-b');
                copyMenuBox.find('li:first').hide();
                return false;
            })
            $(copyBtn[1]).off('click').on('click', function () {
                //复制
                me.copyType = 1;
                $(this).removeClass('btn-gray-b').addClass('btn-green-b').addClass('btn-cur');
                $(copyBtn[0]).removeClass('btn-green-b').removeClass('btn-cur').addClass('btn-gray-b');
                copyMenuBox.find('li:first').show();
                return false;
            })
            menuBox.find('li').each(function () {
                $(this).click(function () {
                    var temBtn = $(this);
                    if (temBtn.attr('data-disable') == 0) {
                        me.CopyCom(me.$copyWindow.attr('data-id'), temBtn.attr('data-pageid'));
                    }
                    return false;
                });
            })
        },
        //创建复制列表的html
        _createCopyMenuHtml: function (parentID, index) {
            var me = this;
            var html = '';
            for (var i = 0; i < SITEMENUS.length; i++) {
                if (SITEMENUS[i].parent_id == parentID) {
                    var curClass = '';
                    var disable = 0;
                    if (SITEMENUS[i].type != 1) {
                        curClass = 'page-cur';
                        disable = 1;
                    } else {
                        if (SITEMENUS[i].id == HOSTCONFIG.PAGE_ID) {
                            continue;
                            curClass = 'page-cur';
                            disable = 1;
                        }
                    }
                    html += '<li class="' + curClass + '" data-pageid="' + SITEMENUS[i].id + '" data-disable="' + disable + '">' + (index > 1 ? '<span class="sub2-devider">' + me._getNbsp(index) + '</span>' : '') + '<span>' + SITEMENUS[i].name + '</span></li>';
                    html += me._createCopyMenuHtml(SITEMENUS[i].id, index + 1);
                }
            }
            return html;
        },
        //获取空格
        _getNbsp: function (index) {
            var item = '';
            for (var i = 1; i < index; i++) {
                item += '&nbsp;&nbsp;';
            }
            return item;
        },
        //初始化组件拖拉蒙版和位置标识
        _initMoveMask: function () {
            //组件拖拉蒙版
            if (this.$moveMask == null) {
                this.$moveMask = $('<div class="li-div-move" style="z-index:10000"></div>');
                this.$moveMask.hide();
                this.$topBody.append(this.$moveMask);
                this.$innerMoveMask = $('<div class="li-div-move" style="z-index:10000"></div>');
                this.$innerMoveMask.hide();
                this.$body.append(this.$innerMoveMask);
                //移动蒙版
                this.options.moveMaskWidth = this.$moveMask.outerWidth();
                this.options.moveMaskHeight = this.$moveMask.outerHeight();
            }
            //组件拖拉位置标识
            if (this.$posMask == null) {
                this.$posMask = $('<div class="posmask" style="z-index:1000"></div>');
                this.$body.append(this.$posMask);
            }
        },
        //初始化上传进度条
        _initUpLoading: function (width) {
            if (this.$upLoadingWindow == null) {
                var html = '<div style=" position:fixed;bottom:5px;right:20px;" class="pop-down-b pop-down-gray-b">'
                        + '<div class="pop-in-b">'
                        + '<div class="pop-inner-b">'
                        + '<div class="process-b">'
                        + '<div class="pop-div-label">上传进度</div>'
                        + '<div class="progress"><div id="upLoadingWidth" style="width:0%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="40" role="progressbar" class="progress-bar progress-bar-success progress-bar-striped"><span class="sr-only">0% Complete (success)</span></div></div>'
                        + '<div class="clearfix"><div class="fl">上传中...</div></div>'
                        + '</div></div></div></div>';
                this.$upLoadingWindow = $(html);
                this.$upLoadingWindow.hide();
                this.$topBody.append(this.$upLoadingWindow);
            }
            if (width > 0) {
                this.$upLoadingWindow.show();
                top.$('#upLoadingWidth').css('width', width + '%');
            } else {
                top.$('#upLoadingWidth').css('width', '0%');
                this.$upLoadingWindow.hide();
            }

        },
        //初始化Logo操作面板
        _initLogoWindow: function ($self) {
            if (this.$logoWindow == null) {
                var html = '<div class="pop-down-b pop-down-gray-b logo-pop-b" style="width:238px;">'
                        + '<div class="pop-down-arrow-b" style="left:50px;"></div>'
                        + '<div class="pop-in-b">'
                        + '<div class="pop-inner-b">'
                        + '<div class="logo-edit-b">'
                        + '<div class="pop-btn-group-b">'
                        + '<span class="btn-b btn-gray-b">关闭</span>'
                        + '<span class="btn-group-divider"></span>'
                        + '<span class="btn-b btn-gray-b btn-cur">文字</span>'
                        + '<span class="btn-group-divider"></span>'
                        + '<span class="btn-b btn-gray-b">图片</span>'
                        + '<span class="logoEdit" style="display:none;">'
                        + '<span class="btn-group-divider"></span>'
                        + '<span class="btn-orange-b btn-b">编辑</span>'
                        + '<span class="btn-group-divider"></span>'
                        + '<span class="btn-b btn-gray-b"><i aria-hidden="true" class="glyphicon glyphicon-trash"></i></span></span>'
                        + '</div></div></div></div></div>';
                this.$logoWindow = $(html);
                this.$logoWindow.hide();
                this.$logoBox.append(this.$logoWindow);
                var btnList = this.$logoWindow.find('span.btn-b');
                var logoEdit = this.$logoWindow.find('span.logoEdit');
                //上传图片窗口
                var initUpWin = function (curCom) {
                    $self._initUpImgWin(curCom, function (comInner, resID, path, type) {
                        $self.$logoBox.find('.w-logo-img img').attr('src', path);
                        $self._cacheLogoData('logo_resource_id', resID);
                        if (type == $self.upImgType.UP) {
                            $self._cacheLogoData('logo_img_url', '');
                        } else if (type == $self.upImgType.LINK) {
                            $self._cacheLogoData('logo_img_url', path);
                        }
                        logoImgEvent();
                        //  $self.SaveLogo();
                        $self._setLogoWinPos();
                        $self.$logoBox.find('.w-logo-img img').off('load').on('load', function () {
                            $self._setLogoWinPos();
                        });
                    })
                };
                //上传图片成功后执行事件
                var logoImgEvent = function () {
                    $self._cacheLogoData('logo_type', 2);
                    btnList.removeClass('btn-cur');
                    $(btnList[2]).addClass('btn-cur');
                    $self.$logoWindow.css('width', 366);
                    $self.$logoBox.find('h1').hide();
                    $self.$logoBox.find('.w-logo-img').show();
                    logoEdit.show();
                };
                //关闭logo
                $(btnList[0]).click(function () {
                    if (!$(this).hasClass('btn-cur')) {
                        $self.$logoWindow.css('width', 238);
                        $self._cacheLogoData('logo_type', 0);
                        $self.CloseLogo();
                        btnList.removeClass('btn-cur');
                        $self.$logoBox.find('h1').hide();
                        $self.$logoBox.find('.w-logo-img').hide();
                        $(this).addClass('btn-cur');
                        logoEdit.hide();
                        // $self.SaveLogo();
                    }
                });
                //设置logo文字
                $(btnList[1]).click(function () {
                    if (!$(this).hasClass('btn-cur')) {
                        $self.$logoWindow.css('width', 238);
                        btnList.removeClass('btn-cur');
                        $self.$logoBox.find('h1').show();
                        $self.$logoBox.find('.w-logo-img').hide();
                        $(this).addClass('btn-cur');
                        $self._cacheLogoData('logo_type', 1);
                        logoEdit.hide();
                        $self._setLogoWinPos();
                        // $self.SaveLogo();
                    }
                });
                //设置logo图片
                $(btnList[2]).click(function () {
                    if (!$(this).hasClass('btn-cur')) {
                        var imgsrc = $self.$logoBox.find('.w-logo-img img').attr('src');
                        if ($.isEmpty(imgsrc)) {
                            initUpWin($self.$logoBox);
                        } else {
                            $self.$logoWindow.css('width', 366);
                            logoImgEvent();
                            // $self.SaveLogo();
                        }
                        $self._setLogoWinPos();
                    }
                });
                //设置logo图片
                $(btnList[3]).click(function () {
                    initUpWin($self.$logoBox);
                });
                //删除logo图片
                $(btnList[4]).click(function () {
                    $self.$logoBox.find('.w-logo-img img').attr('src', '');
                    $(btnList[1]).click();
                    $self._cacheLogoData('logo_type', 1);
                    $self._cacheLogoData('logo_resource_id', null);
                    $self._cacheLogoData('logo_img_url', '');
                    //  $self.SaveLogo();
                    $self._setLogoWinPos();
                });
                this.$logoWindow.on('click', function () {
                    return false;
                });
            }
        },
        //设置logo控制面板的位置
        _setLogoWinPos: function () {
            var align = this.$logoWindow.css('text-align');
            var left = 0;
            switch (align) {
                case 'center':
                    left = (this.$logoBox.width() - this.$logoWindow.width()) / 2;
                    break;
                case 'right':
                    left = this.$logoBox.width() - this.$logoWindow.width();
                    break;
            }
            if (left < 0)
                left = 0;
            this.$logoWindow.css({'top': this.$logoBox.height(), 'left': left});
            this.$logoWindow.show();
        },
        //初始化Logo事件
        _initLogoEvent: function ($self) {
            if (this.$logoBox != null) {
                this.$logoBox.hover(function () {
                    if ($self.options.moving || $self.options.disable)
                        return false;
                    $self._setLogoWinPos();
                }, function () {
                    if ($self.options.moving || $self.options.disable)
                        return false;
                    $self.$logoWindow.hide();
                });
                this.$logoBox.on('click', function (event) {
                    $self.CloseBanner();
                    $self.CloseBar();
                    event.stopPropagation();
                    return false;
                });
                //改变文字
                $(this.$logoBox.find('h1:first')).on('keyup', function () {
                    $self._cacheLogoData('logo_txt', $(this).text());
                });
                $self.$logoWindow.css('width', 238);
                var logoEdit = this.$logoWindow.find('span.logoEdit');
                var btnList = this.$logoWindow.find('span.btn-b');
                if (SITECONFIG != null) {
                    btnList.removeClass('btn-cur');
                    $(btnList[SITECONFIG['logo_type']]).addClass('btn-cur');
                    if (SITECONFIG['logo_type'] == 2) {
                        $self.$logoWindow.css('width', 366);
                        logoEdit.show();
                        var logoImgBtn = logoEdit.find('span.btn-b');
                        $(logoImgBtn[0]).show();
                        if (SITECONFIG['resource_id'] > 0)
                            $(logoImgBtn[1]).show();
                    }
                }
            }
        },
        //初始化banner操作面板
        _initBannerWindow: function ($self) {
            if (this.$bannerWindow == null) {
                //初始化banner样式
                var html = '<div class="banner_control">'
                        + '<div class="banner_edit">编辑banner</div>'
                        + '<div class="show_control" data-show="1">隐藏</div>'
                        + '</div>';
                this.$bannerWindow = $(html);
                this.$bannerWindow.hide();
                this.$bannerWindow.insertBefore(this.$bannerBox);
                // this.$bannerBox.append(this.$bannerWindow);
//                this.$bannerWindow.hover(function (event) {
//                    $self.$bannerWindow.show();
//                    event.stopPropagation();
//                }, null);
                this.$bannerWindow.on('click', function (event) {
                    event.stopPropagation();
                    return false;
                });
                var editBanner = this.$bannerWindow.find('div.banner_edit:first');
                var showBanner = this.$bannerWindow.find('div.show_control:first');
                //编辑Banner
                editBanner.click(function () {

                });
                //显示或隐藏
                showBanner.click(function () {
                    var show = $(this).attr('data-show');
                    show == 1 ? show = 0 : show = 1;
                    if (show == 0) {
                        $self.$bannerBox.hide();
                        editBanner.hide();
                        showBanner.html("显示Banner");
                    } else {
                        $self.$bannerBox.show();
                        editBanner.show();
                        showBanner.html("隐藏");
                    }
                    $self._cacheBannerData('is_show', show);
                    $(this).attr('data-show', show);
                });

            }
        },
        //设置Banner控制面板的位置
        _setBannerWinPos: function () {
            if (this.$bannerBox != null) {
                //  var pos = this.$bannerBox.offset();
                //    this.$bannerWindow.css({'top':20});
                if (this.options.disable) {
                    this.$bannerWindow.hide();
                } else {
                    this.$bannerWindow.show();
                }
            }
        },
        //初始化banner事件
        _initBannerEvent: function ($self) {
            var pause = 5;
            var speed = 500;
            var scale = '';
            if (this.$bannerBox != null) {
                var editBanner = this.$bannerWindow.find('div.banner_edit:first');
                var showBanner = this.$bannerWindow.find('div.show_control:first');
                this.$bannerWindow.show();
//                this.$bannerBox.parent().hover(function () {
//                    if ($self.options.moving || $self.options.disable)
//                        return false;
//                    $self.$bannerWindow.show();
//                }, function () {
//                    if ($self.options.moving || $self.options.disable)
//                        return false;
//                    $self.$bannerWindow.hide();
//                });
                this.$bannerBox.on('click', function (event) {
                    if ($self.options.moving || $self.options.disable)
                        return false;
                    $self.CloseLogo();
                    $self.CloseBar();
                    event.stopPropagation();
                    return false;
                });
                var temBanner = PAGEJSON.banner;
                if (temBanner) {
                    if (temBanner['is_show'] == 0) {
                        editBanner.hide();
                        showBanner.html("显示Banner");
                    } else {
                        editBanner.show();
                        showBanner.html("隐藏");
                    }
                    showBanner.attr('data-show', temBanner['is_show']);
                }
                var bannerSlider = null;
                var createBannerHtml = function () {
                    var curBanner = PAGEJSON.banner;
                    var bannerHtml = '';
                    var isSlider = false;
                    if (bannerSlider != null)
                        bannerSlider.destroySlider()
                    if (curBanner.type == 1) {
                        if (curBanner.items && curBanner.items.length > 0) {
                            if (curBanner.items.length == 1) {
                                bannerHtml += '<img src="' + HOSTCONFIG.WEB_URL + curBanner.items[0]['path'] + '" />';
                            } else {
                                isSlider = true;
                                bannerHtml += '<ul class="bxslider">';
                                for (var i = 0; i < curBanner.items.length; i++) {
                                    bannerHtml += '<li><img src="' + HOSTCONFIG.WEB_URL + curBanner.items[i]['path'] + '" ></li>'
                                }
                                bannerHtml += '</ul>';
                            }
                        } else {
                            bannerHtml += '<img src="/template/' + HOSTCONFIG.THEME + '/images/banner.jpg" />';
                        }
                    } else if (curBanner.type == 2) {
                        if (curBanner.items && curBanner.items.length > 0) {
                            bannerHtml += '<object type="application/x-shockwave-flash" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" align="middle" width="100%">';
                            bannerHtml += '<param name="movie" value="' + HOSTCONFIG.WEB_URL + curBanner.items[0]['path'] + '">';
                            bannerHtml += '<param name="quality" value="high"><param name="play" value="true"> <param name="loop" value="true"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="flashvars" value="">';
                            bannerHtml += '<embed src="' + HOSTCONFIG.WEB_URL + curBanner.items[0]['path'] + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" play="true" loop="true" wmode="transparent" allowfullscreen="true" flashvars="" type="application/x-shockwave-flash" align="middle" width="100%"></object>';
                        }
                    }
                    $self.$bannerBox.html(bannerHtml);
                    if (isSlider) {
                        bannerSlider = $self.$bannerBox.find('.bxslider:first').bxSlider({
                            mode: 'fade', /*滚动方式fade、vertical、horizontal*/
                            auto: true, /*自动滚动*/
                            autoControls: false, /*自动滚动按钮*/
                            infiniteLoop: true, /*循环滚动*/
                            hideControlOnEnd: true, /*无效按钮隐藏*/
                            adaptiveHeight: true, /*图片是否实际缩放比高度显示控制，图片比例不一样高度变化*/
                            minSlides: 1,
                            maxSlides: 2,
                            scale: scale,
                            speed: speed,
                            pause: pause * 1000
                        });
                    }

                }
                editBanner.click(function () {
                    var url = $self.options.jsurl + "/bar/banner.html";
                    var win = $('<div></div>');
                    top.$.Loading();
                    win.load(url + '?t=' + $.getTimeStamp(), null, function (response, status, xhr) {
                        top.$.UnLoading();
                        top.$.WinDialog(win, function (winDialog, winBox) {
                            var addImg = win.find('li.add-more:first');
                            var tabMenu = win.find('div.images-pop-menu:first li');
                            var tabList = win.find('div.conSlide');
                            var btnSave = win.find('.pop-edit-btns-b:first');
                            var btnSet = $(tabList[0]).find('div.con-top:first');
                            var setWin = win.find('div.bannerSet_slide:first');
                            var flashShow = $(tabList[1]).find('div.slide-imgs');
                            var bannerScale = win.find('div.bannerscale li');
                            var bannerType = 1;
                            var setImg = function (responseID, responseUrl) {
                                var bannerImg = $('<li><div class="gallery-img"><img src="' + HOSTCONFIG.WEB_URL + responseUrl + '"></div><div class="gallery-tool-b" style="display:none;"><div class="gallery-tool-in-b"><span title="删除图片" aria-hidden="true" class="glyphicon glyphicon-trash"></span></div></div></li>');
                                bannerImg.attr({'data-responseid': responseID, 'data-path': responseUrl});
                                bannerImg.insertBefore(addImg);
                                var imgControl = bannerImg.find('div.gallery-tool-b:first');
                                var btnDelete = bannerImg.find('div.gallery-tool-in-b:first');
                                bannerImg.hover(function () {
                                    imgControl.show();
                                }, function () {
                                    imgControl.hide();
                                });
                                btnDelete.click(function () {
                                    var parent = $(this).parents('li:first');
                                    var rID = parent.attr('data-responseid');
                                    var curBanner = PAGEJSON.banner;
                                    for (var i = 0; i < curBanner.length; i++) {
                                        for (var j = 0; j < curBanner.items.length; j++) {
                                            if (curBanner.items[j].responseid == rID) {
                                                curBanner.items[j]['delete'] = 1
                                                break;
                                            }
                                        }
                                    }
                                    parent.remove();
                                });
                                setAddImgShow();
                                btnSet.show();
                            }
                            var setFlash = function (responseID, responseUrl) {
                                var flashHtml = '<object type="application/x-shockwave-flash" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" align="middle" width="300">';
                                flashHtml += '<param name="movie" value="' + HOSTCONFIG.WEB_URL + responseUrl + '">';
                                flashHtml += '<param name="quality" value="high"><param name="play" value="true"> <param name="loop" value="true"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="flashvars" value="">';
                                flashHtml += '<embed src="' + HOSTCONFIG.WEB_URL + responseUrl + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" play="true" loop="true" wmode="transparent" allowfullscreen="true" flashvars="" type="application/x-shockwave-flash" align="middle" width="300"></object>';
                                flashShow.html(flashHtml);
                                flashShow.attr({'data-responseid': responseID, 'data-path': responseUrl}).show();
                            }
                            var setAddImgShow = function () {
                                win.find('#slide_images_list').find('li').length >= 11 ? addImg.hide() : addImg.show();
                            }
                            top.$.onUpload({
                                pick: {'id': '#bannerUpImg', 'label': '<img src="/images/pop_add.png">', 'multiple': false},
                                disableGlobalDnd: false
                            }, {
                                'uploadStart': function () {
                                },
                                'uploadFinished': function () {
                                    $self._initUpLoading(0);
                                },
                                'uploadProgress': function (file, percentage) {
                                    $self._initUpLoading(percentage * 100);
                                },
                                'uploadSuccess': function (file, response) {
                                    if (response.state == 'SUCCESS') {
                                        setImg(response.id, response.url);
                                    } else {
                                        top.$.ShowResultMag('上传失败。', false);
                                    }
                                }
                            });

                            top.$.onUpload({
                                server: '/upload/uploadflash',
                                pick: {'id': '#bannerUpFlash', 'label': '选择Flash文件', 'multiple': false},
                                accept: {
                                    title: 'File',
                                    extensions: 'swf',
                                    mimeTypes: '*.swf'
                                },
                                disableGlobalDnd: false
                            }, {
                                'uploadStart': function () {
                                },
                                'uploadFinished': function () {
                                    $self._initUpLoading(0);
                                },
                                'uploadProgress': function (file, percentage) {
                                    $self._initUpLoading(percentage * 100);
                                },
                                'uploadSuccess': function (file, response) {
                                    if (response.state == 'SUCCESS') {
                                        setFlash(response.id, response.url);
                                    } else {
                                        top.$.ShowResultMag('上传失败。', false);
                                    }
                                }
                            });

                            tabMenu.each(function () {
                                $(this).click(function () {
                                    tabMenu.removeClass('cur');
                                    $(this).addClass('cur');
                                    var tabIndex = tabMenu.index($(this));
                                    if (tabIndex == 0) {
                                        $(tabList[0]).css({'left': '0'});
                                        $(tabList[1]).css({'left': '-100%'});
                                        win.find('bannerUpImg').removeClass('webuploader-element-invisible').addClass('webuploader-container');
                                        win.find('#bannerUpFlash').removeClass('webuploader-container').addClass('webuploader-element-invisible');
                                    } else if (tabIndex == 1) {
                                        $(tabList[0]).css({'left': '-100%'});
                                        $(tabList[1]).css({'left': '0'});
                                        setWin.animate({'left': '-100%'}, 500);
                                        win.find('bannerUpImg').removeClass('webuploader-container').addClass('webuploader-element-invisible');
                                        win.find('#bannerUpFlash').removeClass('webuploader-element-invisible').addClass('webuploader-container');
                                    }
                                    bannerType = tabIndex + 1;
                                });
                            });

                            btnSet.click(function () {
                                setWin.animate({'left': 0}, 500);
                            });
                            setWin.find('div.back').click(function () {
                                setWin.animate({'left': '-100%'}, 500);
                            });
                            btnSave.click(function () {
                                var items = [];
                                var imgList = win.find('#slide_images_list').find('li');
                                $self._cacheBannerData('type', 1);
                                $self._cacheBannerData('config', '');
                                var orderNum = 1;
                                if ((bannerType == 1 && imgList.length > 1) || (bannerType == 2 && !flashShow.attr('data-responseid'))) {
                                    var orderNum = 1;
                                    imgList.each(function () {
                                        if (!$(this).hasClass('add-more')) {
                                            items[items.length] = {'resource_id': $(this).attr('data-responseid'), 'path': $(this).attr('data-path'), 'order_num': orderNum++};
                                        }
                                    });
                                }
                                if ((bannerType == 1 && imgList.length <= 1 && flashShow.attr('data-responseid')) || (bannerType == 2 && flashShow.attr('data-responseid'))) {
                                    items[0] = {'resource_id': flashShow.attr('data-responseid'), 'path': flashShow.attr('data-path'), 'order_num': orderNum++};
                                    $self._cacheBannerData('type', 2);
                                }

                                $self._cacheBannerData('items', items);
                                if (PAGEJSON.banner['type'] == 1 && items.length > 1) {
                                    scale = win.find('div.bannerscale li.selected:first').attr('data-value');
                                    var inputList = win.find('input.inputgray60');
                                    pause = $(inputList[0]).val();
                                    speed = $(inputList[1]).val();
                                    pause > 0 ? pause : pause = 5;
                                    speed > 0 ? speed : speed = 500;
                                    var bannerConfig = '{"scale":"' + scale + '","pause":"' + pause + '","speed":"' + speed + '"}';
                                    $self._cacheBannerData('config', bannerConfig);
                                }
                                createBannerHtml();
                                winBox.remove();
                                winDialog.remove();
                            });
                            bannerScale.each(function () {
                                $(this).click(function () {
                                    bannerScale.removeClass('selected');
                                    $(this).addClass('selected');
                                });
                            });
                            //加载banner数据
                            var curBanner = PAGEJSON.banner;
                            if (curBanner) {
                                bannerType = curBanner.type;
                                $(tabMenu[bannerType - 1]).addClass('cur');
                                if (bannerType == 1) {
                                    $(tabList[0]).css({'left': '0'});
                                    $(tabList[1]).css({'left': '-100%'});
                                    if (curBanner.items != null) {
                                        for (var i = 0; i < curBanner.items.length; i++) {
                                            if (!curBanner.items[i]['delete'])
                                                setImg(curBanner.items[i].resource_id, curBanner.items[i].path);
                                        }
                                    }
                                } else if (bannerType == 2) {
                                    $(tabList[0]).css({'left': '-100%'});
                                    $(tabList[1]).css({'left': '0'});
                                    if (curBanner.items != null && curBanner.items.length > 0) {
                                        setFlash(curBanner.items[0].resource_id, curBanner.items[0].path);
                                    }
                                }
                                var bannerConfig = curBanner.config;
                                if (!$.isNllEmpty(bannerConfig)) {
                                    bannerConfig = eval('(' + bannerConfig + ')');
                                    if (bannerConfig.scale) {
                                        scale = bannerConfig.scale;
                                        for (var i = 0; i < bannerScale.length; i++) {
                                            if ($(bannerScale[i]).attr('data-value') == scale) {
                                                bannerScale.removeClass('selected');
                                                $(bannerScale[i]).addClass('selected');
                                                break;
                                            }
                                        }
                                    }
                                    var inputList = win.find('input.inputgray60');
                                    if (!$.isNllEmpty(bannerConfig.pause)) {
                                        pause = bannerConfig.pause;
                                        pause > 0 ? pause : pause = 5;
                                        $(inputList[0]).val(pause);
                                    }
                                    if (!$.isNllEmpty(bannerConfig.speed)) {
                                        speed = bannerConfig.speed;
                                        speed > 0 ? speed : speed = 500;
                                        $(inputList[1]).val(speed);
                                    }
                                }
                            }
                        });
                    });

                });
            }
        },
        //初始化产品操作面板
        _initProductWindow: function ($self) {
            var productBox = this.$contentBox.find('div.product-detail-wrap:first');
            if (this.$productWindow == null) {
                var html = '<div class="pop-up-b" style="top:0px;right:0px">'
                        + '<div class="pop-up-arrow-b" style="left:88px;"></div>'
                        + '<div class="pop-in-b">'
                        + '<div class="pop-inner-b">'
                        + '<div class="pop-content-b">'
                        + '<div class="prd-btns-edit-b"><span class="btn btn-green-b">Edit Product</span></div>'
                        + '</div></div></div></div>';
                this.$productWindow = $(html);
                this.$productWindow.hide();
                var btnList = this.$productWindow.find('span.btn-green-b');
                $(btnList[0]).click(function () {
                    top.$.goToPage('store', 'products', 'detail', 'products_form', SITECURMENU.prduct_id);
                });
                productBox.append(this.$productWindow);
            }
            productBox.hover(function () {
                $self.$productWindow.show();
            }, function () {
                $self.$productWindow.hide();
            });
        },
        //初始化storer操作面板
        _initStoreWindow: function ($self) {
            var storeBox = this.$contentBox.find('div.w-store:first');
            if (this.$storeWindow == null) {
                var html = '<div class="pop-up-b" style="top:-22px;right:0px">'
                        + '<div class="pop-up-arrow-b" style="left:165px;"></div>'
                        + '<div class="pop-in-b">'
                        + '<div class="pop-inner-b">'
                        + '<div class="pop-content-b">'
                        + '<div class="prd-btns-edit-b"><span class="btn btn-green-b mr10">Edit Storefront</span> <span class="btn btn-green-b">Add Product</span> </div>'
                        + '</div></div></div></div>';
                this.$storeWindow = $(html);
                this.$storeWindow.hide();
                var btnList = this.$storeWindow.find('span.btn-green-b');
                $(btnList[0]).click(function () {
                    top.$.goToPage('store', 'storefront', 'show', 'storefront');
                });
                $(btnList[1]).click(function () {
                    top.$.goToPage('store', 'products', 'show', 'products');
                });
                storeBox.append(this.$storeWindow);
            }
            storeBox.hover(function () {
                $self.$storeWindow.show();
            }, function () {
                $self.$storeWindow.hide();
            });
        },
        //底部初始化
        _initFooter: function () {
            var me = this;
            this.$footerBox = $('#comFootMainInner');
            if (this.$footerCloseWin == null) {
                var html = '<div class="pop-edit-btns-b" style="position:absolute;top:0;left:0;"><span class="btn btn-orange-b">关闭</span></div>';
                this.$footerCloseWin = $(html);
                this.$footerCloseWin.hide();
                this.$body.append(this.$footerCloseWin);
            }
            this.$footerCloseWin.click(function () {
                if (me.menuType != 1) {
                    me.$eidtLeftMask.show();
                }
                if (me.baffleTime != null)
                    window.clearInterval(me.baffleTime);
                me.moveBoxType = 1;
                me.$comBox = me.$mainBox;
                me.$baffle.css({'left': 0, 'top': 0}).hide();
                $(this).css({'left': 0, 'top': 0}).hide();
                if (me.$footerBox.children().length == 0 && me.$firstChild != null) {
                    me.$footerBox.append(me.$firstChild);
                    me.$firstChild.show();
                    me.$firstChild = null;
                }
                me.CloseBar();
                me.$footerBox.find('div.li-div[data-id]').each(function () {
                    if (!$(this).hasClass('col-li-div')) {
                        $(this).off('click mouseenter mouseleave');
                    } else {
                        $(this).off('mouseenter mouseleave');
                    }
                })
                return false;
            });
            var showCloseWin = function () {
                var posFooter = me.$footerBox.offset();
                // var scrollTop = me.$body.scrollTop();
                var boxWidth = me.$footerBox.outerWidth();
                me.$footerCloseWin.css({'top': posFooter.top - me.$footerCloseWin.outerHeight() - 5, 'left': boxWidth + posFooter.left - me.$footerCloseWin.outerWidth() + 20}).show();
            }
            this.$footerBox.click(function () {
                if (me.options.disable)
                    return false;
                me._clearFun();
                me.$eidtLeftMask.hide();
                var firstChild = $(this).find('div:first-child');
                me.$firstChild = null;
                if (firstChild.length > 0 && firstChild.hasClass('foot-add-notice-b')) {
                    me.$firstChild = firstChild;
                    me.$firstChild.hide();
                    me.$body.append(me.$firstChild);
                }
                me._initBaffle($(this));
                me.baffleTime = window.setInterval(function () {
                    me._initBaffle(me.$footerBox);
                }, 200);
                showCloseWin();
                me.$baffle.show();
                me.moveBoxType = 2;
                me.$comBox = me.$footerBox;
                $(this).find('div.li-div[data-id]').each(function () {
                    if (!$(this).hasClass('col-li-div')) {
                        me._initBindComEvent(me, $(this));
                    } else {
                        me._initTableBox(me, $(this));
                    }
                })
                return false;
            });
            this.$footerBox.find('div.li-div[data-id]').each(function () {
                if (!$(this).hasClass('col-li-div')) {
                    me._initBindComEvent(me, $(this));
                    $(this).off('click mouseenter mouseleave');
                }
            });
        },
        //初始化组件操作面板(复制，移动和删除)
        _initComWindow: function ($self) {
            //组件操作页板
            if (this.$doWindow == null) {
                var html = '<div class="editbox-pop-b" data-edit="0">'
                        + '<div class="moveto-b"><div class="btn-moveto-b"><span aria-hidden="true" class="glyphicon glyphicon-share-alt"></span></div></div>'
                        + '<div class="move-b"><div class="btn-move-b"><span aria-hidden="true" class="glyphicon glyphicon-move"></span></div></div>'
                        + '<div class="delete-b"><div class="btn-delete-b"><span aria-hidden="true" class="glyphicon glyphicon-remove"></span></div></div>'
                        + '</div>';
                this.$doWindow = $(html);
                this.$doWindow.hide();
                this.$body.append(this.$doWindow);
            }

            //复制窗
            if (this.$copyWindow == null) {
                this.$copyWindow = $('<div style="left:-20px; top:10px;" class="pop-down-b"><div style="left:10px;" class="pop-down-arrow-b"></div><div class="pop-in-b"><div class="pop-inner-b"><div class="pop-header-b"><div class="pop-btn-group-b"><a class="btn-b btn-green-b btn-cur" href="javascript:void(0);">移动</a><span class="btn-group-divider"></span><a class="btn-b btn-gray-b" href="javascript:void(0);">复制</a></div></div><div class="pop-content-b"><div class="list-box-b"></div></div></div></div></div>');
                this.$copyWindow.hide();
                this.$body.append(this.$copyWindow);
            }

            //删除确认窗
            if (this.$deleteAlert == null) {
                this.$deleteAlert = $('<div class="pop-up-b"><div style="right:10px;" class="pop-up-arrow-b"></div><div class="pop-in-b"><div class="pop-inner-b"><div class="pop-content-b"><div class="pop-delete-b"><p>确认是否删除?</p><input type="button" value="删除" class="btn-b btn-red-b" /></div></div></div></div></div>');
                this.$deleteAlert.hide();
                this.$body.append(this.$deleteAlert);
            }
            this._bindDoWindowEvent();
        },
        //组件面板事件
        _bindDoWindowEvent: function () {
            var me = this;
            var deleteBtn = this.$doWindow.find('div.delete-b:first');
            if (deleteBtn.length == 1) {
                deleteBtn.off('click').click(function () {
                    me.CloseAll();
                    var curCom = me.$doWindow.parent();
                    curCom.addClass('li-div-delete-hover');
                    me.$deleteAlert.insertAfter(me.$doWindow).css({top: 0 - me.$deleteAlert.height() - 6, right: -20}).fadeIn();
                    me.$deleteAlert.attr('data-id', curCom.attr('data-id'));
                    //  me.SaveCom();
                    return false;
                });
            }
            var copyBtn = this.$doWindow.find('div.moveto-b:first');
            if (copyBtn.length == 1) {
                copyBtn.off('click').click(function () {
                    me.CloseAll();
                    me.options.copying = true;
                    var curCom = me.$doWindow.parent();
                    me.$doWindow.parent().addClass('li-div-moveto-hover');
                    me.$copyWindow.insertAfter(me.$doWindow).fadeIn();
                    me.$copyWindow.attr('data-id', curCom.attr('data-id'));
                    // me.SaveCom();
                    return false;
                });
            }
            var moveBtn = this.$doWindow.find('div.move-b:first');
            if (moveBtn.length == 1) {
                moveBtn.off('mousedown click').mousedown(function (event) {
                    me.CloseAll();
                    var curCom = me.$doWindow.parent();
                    me._eComMainMouseDown(event, me, curCom);
                    return false;
                }).click(function (event) {
                    event.stopPropagation();
                });
            }
            this.$deleteAlert.find('input:first').off('click').click(function () {
                me.$element.find('.li-div-delete-hover').removeClass('li-div-hover').removeClass('li-div-delete-hover');
                me.$deleteAlert.hide();
                me.options.deleting = true;
                var temCurCom = $('#com_' + me.$deleteAlert.attr('data-id'));
                me._deleteCurCom(temCurCom);
                return false;
            });
        },
        //删除组件
        _deleteCurCom: function (curCom) {
            var me = this;
            var curBox = curCom.parents('td.td-w[data-id]:first');
            var parentBox = curCom.parents('div.col-li-div[data-id]:first');
            var boxID = 0;
            var boxAllColumn = 0;
            var curColumn = 0;
            if (parentBox.length > 0) {
                if (curBox.find('div.li-div[data-id]').length == 1) {
                    boxID = parentBox.attr('data-id');
                    boxAllColumn = parentBox.find('td.td-w[data-id=' + boxID + ']').length;
                    curColumn = curCom.attr('data-column');
                }

            }
            me.DeleteCom(curCom.attr('data-id'), boxID, boxAllColumn, curColumn, function (box) {
                me.$body.append(me.$doWindow);
                me.$body.append(me.$deleteAlert);
                me.$body.append(me.$copyWindow);
                curCom.remove();
                me._deleteInitBox(boxID);
            })
        },
        //删除后事件
        _deleteInitBox: function (boxID) {
            var parentBox = $('#com_' + boxID);
            var tdList = parentBox.find('td.td-w[data-id=' + boxID + ']');
            var count = tdList.length;
            var deleteWidth = 0;
            tdList.each(function () {
                if ($(this).find('div.li-div[data-id]').length == 0) {
                    $(this).remove();
                    deleteWidth += parseFloat($(this).attr('width').replace('%', ''));
                    count--;
                }
            });
            if (count <= 1) {
                var allComs = parentBox.find('div.div-padding:first').children('div.li-div[data-id]');
                allComs.each(function () {
                    $(this).insertBefore(parentBox);
                });
                this._delCacheComData(boxID);
                parentBox.remove();
            } else {
                tdList = parentBox.find('td.td-w[data-id=' + boxID + ']');
                tdList.each(function () {
                    var curWidth = parseFloat($(this).attr('width').replace('%', ''));
                    $(this).attr('width', (curWidth + (deleteWidth / tdList.length)) + '%')
                });
                this._initTableBox(this, parentBox);
            }
            if (this.$comBox != null && this.$comBox.children().length == 0 && this.moveBoxType == 1) {
                this.$comBox.html('<div class="main-empty-notice-b">请拖拉组件放置此处</div>');
            }
            if (this.moveBoxType == 2)
                this._initBaffle(this.$footerBox);
            //	this._bindDoWindowEvent();

        },
        //初始化编辑区的占位挡板
        _initBaffle: function (curBox) {
            // this.$body.css('position', 'relative');
            if (this.$baffle == null) {
                var html = '<div class="split-mask" style="z-index:10;top:0;left:0;position:absolute;height:0px;">'
                        + '<div class="mask-split-b" style="display:block"></div>'
                        + '<div class="mask-split-b" style="display:block"></div>'
                        + '<div class="mask-split-b" style="display:block"></div>'
                        + '<div class="mask-split-b" style="display:block"></div>'
                        + '<div class="mask-line mask-line-top" style="display:block"></div>'
                        + '<div class="mask-line mask-line-left" style="display:block"></div>'
                        + '<div class="mask-line mask-line-right" style="display:block"></div>'
                        + '<div class="mask-line mask-line-bottom" style="display:block"></div>'
                        + '<div class="mask-line-radius mask-radius-top-left" style="display:block"></div>'
                        + '<div class="mask-line-radius mask-radius-top-right" style="display:block"></div>'
                        + '<div class="mask-line-radius mask-radius-bottom-left" style="display:block"></div>'
                        + '<div class="mask-line-radius mask-radius-bottom-right" style="display:block"></div></div>';
                this.$baffle = $(html);
                this.$baffle.hide();
                this.$body.append(this.$baffle);
            }
            var maskList = this.$baffle.find('.mask-split-b');
            if (curBox == null)
                return false;
            var posEditor = curBox.offset();
            var boxWidth = curBox.outerWidth();
            var boxHeight = curBox.outerHeight();
//            var docWidth = this.$doc.outerWidth();
//            var docHeight = this.$doc.outerHeight();
            var divWidth = this.$element.outerWidth();
            var divHeight = this.$element.outerHeight();
            this.$baffle.css('width', divWidth);
            var differ = 20;
            $(maskList[0]).css({'top': 0, 'left': 0, 'height': posEditor.top, 'width': divWidth});
            $(maskList[1]).css({'top': posEditor.top, 'left': 0, 'height': boxHeight, 'width': posEditor.left - differ});
            $(maskList[2]).css({'top': posEditor.top, 'left': posEditor.left + boxWidth + differ, 'height': boxHeight, 'width': divWidth - posEditor.left - boxWidth - differ});
            $(maskList[3]).css({'top': posEditor.top + boxHeight, 'left': 0, 'height': (divHeight - (posEditor.top + boxHeight)), 'width': divWidth});
            var lineList = this.$baffle.find('.mask-line');
            $(lineList[0]).css({'top': posEditor.top, 'left': posEditor.left - differ, 'height': 1, 'width': boxWidth + differ * 2});
            $(lineList[1]).css({'top': posEditor.top, 'left': posEditor.left - differ, 'height': boxHeight, 'width': 1});
            $(lineList[2]).css({'top': posEditor.top, 'left': posEditor.left + boxWidth + differ, 'height': boxHeight, 'width': 1});
            $(lineList[3]).css({'top': posEditor.top + boxHeight, 'left': posEditor.left - differ, 'height': 1, 'width': boxWidth + differ * 2});
            var radiusList = this.$baffle.find('.mask-line-radius');
            $(radiusList[0]).css({'top': posEditor.top, 'left': posEditor.left - differ});
            $(radiusList[1]).css({'top': posEditor.top, 'left': posEditor.left + boxWidth - 4 + differ});
            $(radiusList[2]).css({'top': posEditor.top + boxHeight - 4, 'left': posEditor.left - differ});
            $(radiusList[3]).css({'top': posEditor.top + boxHeight - 4, 'left': posEditor.left + boxWidth - 4 + differ});
        },
        //初始化左侧组件新增区
        _initLeftComs: function ($self) {
            //左侧组件区信息
            var leftComConfig = {'list': [
                    {
                        'sortname': '基础',
                        'itemlist': [
                            {'comname': '标题', 'comclass': 'icon-title', 'nameclass': '', 'comtype': COMPONENTTYPE.TITLE},
                            {'comname': '文本', 'comclass': 'icon-text', 'nameclass': '', 'comtype': COMPONENTTYPE.TEXT},
                            {'comname': '富文本', 'comclass': 'icon-richText', 'nameclass': '', 'comtype': COMPONENTTYPE.RICHTXT},
                            {'comname': '按钮', 'comclass': 'icon-button', 'nameclass': '', 'comtype': COMPONENTTYPE.BUTTON},
                            {'comname': '分隔线', 'comclass': 'icon-divider', 'nameclass': '', 'comtype': COMPONENTTYPE.DIVIDER},
                            {'comname': '间隔', 'comclass': 'icon-spacer', 'nameclass': '', 'comtype': COMPONENTTYPE.SPACER},
                            {'comname': '搜索', 'comclass': 'icon-searchbox', 'nameclass': '', 'comtype': COMPONENTTYPE.SEARCH},
                            {'comname': '图片', 'comclass': 'icon-image', 'nameclass': '', 'comtype': COMPONENTTYPE.IMAGE},
                            {'comname': '图片集', 'comclass': 'icon-gallery', 'nameclass': '', 'comtype': COMPONENTTYPE.GALLERY},
                            {'comname': '幻灯片', 'comclass': 'icon-slideshow', 'nameclass': 'lh1', 'comtype': COMPONENTTYPE.SLIDESHOW},
                            // {'comname': 'FORM', 'comclass': 'icon-contactform', 'nameclass': 'lh1', 'comtype': COMPONENTTYPE.CONTANCTFORM},
                            {'comname': '代码', 'comclass': 'icon-embedcode', 'nameclass': 'lh1', 'comtype': COMPONENTTYPE.CODE},
                            {'comname': '地图', 'comclass': 'icon-map', 'nameclass': '', 'comtype': COMPONENTTYPE.MAP}
                        ]
                    },
                    {
                        'sortname': '多媒体',
                        'itemlist': [
                            //{'comname': 'HD VIDEO', 'comclass': 'icon-HDvideo', 'nameclass': '', 'comtype': COMPONENTTYPE.VIDEO},
                            //{'comname': 'AUDIO', 'comclass': 'icon-audio', 'nameclass': '', 'comtype': COMPONENTTYPE.AUDIO},
                            {'comname': 'Flash', 'comclass': 'icon-flash', 'nameclass': '', 'comtype': COMPONENTTYPE.FLASH},
                            {'comname': '文件', 'comclass': 'icon-file', 'nameclass': '', 'comtype': COMPONENTTYPE.FILE},
                            {'comname': '视频链接', 'comclass': 'icon-videoNew', 'nameclass': 'lh1', 'comtype': COMPONENTTYPE.VIDEOLINK}
                        ]
                    },
                    {
                        'sortname': '系统',
                        'itemlist': [
                            {'comname': '产品组件', 'comclass': 'icon-product', 'nameclass': '', 'comtype': COMPONENTTYPE.PRODUCT},
                            {'comname': '文章组件', 'comclass': 'icon-news', 'nameclass': '', 'comtype': COMPONENTTYPE.ARTICLE}
                        ]
                    },
                    {
                        'sortname': '增值',
                        'itemlist': [
                            {'comname': '留言本', 'comclass': 'icon-forum', 'nameclass': '', 'comtype': COMPONENTTYPE.FEEDBACK},
                            {'comname': '投票', 'comclass': 'icon-poll', 'nameclass': '', 'comtype': COMPONENTTYPE.VOTE},
                            {'comname': '问卷调查', 'comclass': 'icon-survey', 'nameclass': '', 'comtype': COMPONENTTYPE.VOTE},
                            // {'comname': 'GOOGLE<br/>ADSENSE', 'comclass': 'icon-googleAD', 'nameclass': 'lh1', 'comtype': COMPONENTTYPE.GOOGLEADSENSE},
                            {'comname': '社交图标', 'comclass': 'icon-socialVedio', 'nameclass': 'lh1', 'comtype': COMPONENTTYPE.SOCIALICONS},
                            // {'comname': 'RSS', 'comclass': 'icon-RSSE', 'nameclass': 'lh1', 'comtype': COMPONENTTYPE.FEEDREADER},
                            // {'comname': 'SURVEY', 'comclass': 'icon-survey', 'nameclass': '', 'comtype': COMPONENTTYPE.SURVEY},
                            // {'comname': 'RSVP<br/>FORM', 'comclass': 'icon-survey', 'nameclass': 'lh1', 'comtype': COMPONENTTYPE.RSVPFORM},
                            // {'comname': 'POLL', 'comclass': 'icon-poll', 'nameclass': '', 'comtype': COMPONENTTYPE.POLL}
                        ]
                    }
                ]};
            var leftComHtml = "";
            for (var i = 0; i < leftComConfig.list.length; i++) {
                leftComHtml += '<div class="section' + (i + 1) + '">'
                        + '<h4 id="section' + (i + 1) + '">' + leftComConfig.list[i].sortname + '</h4>'
                        + '<ul>';
                for (var j = 0; j < leftComConfig.list[i].itemlist.length; j++) {
                    var comitem = leftComConfig.list[i].itemlist[j];
                    leftComHtml += '<li data-type="' + comitem.comtype + '"><div class="li-div"><i class="icon-tool ' + comitem.comclass + '"></i><span class="' + comitem.nameclass + '">' + comitem.comname + '</span></div></li>';
                }
                leftComHtml += '</ul></div>';
            }
            //显示组件
            var comBox = this.options.coms.find('div.scrollspy-tool:first');
            comBox.html(leftComHtml);
            var flag = $.getTimeStamp();
            //绑定事件
            comBox.find('li').each(function () {
                $(this).mousedown(function (event) {
                    var temFlag = $.getTimeStamp();
                    if (temFlag - flag < 500)
                        return false;
                    flag = $.getTimeStamp();
                    if ($self.options.status == 1 || $self.options.moving)
                        return false;
                    if ($self.moveBoxType == 1) {
                        $self.$comBox = $self.$contentBox;
                    } else if ($self.moveBoxType == 2) {
                        $self.$comBox = $self.$footerBox;
                    }
                    if ($self.$comBox != null) {
                        $self._eLeftComMouseDown(event, $self, $(this));
                    }
                    return false;
                });
            }).mouseup(function () {
                $(this).css('visibility', '');
            });
        },
        //获取屏幕滚动条高度
        _getScrollTop: function () {
            if (this.$body.scrollTop() > 0)
                return this.$body.scrollTop();
            if (this.$doc.scrollTop() > 0)
                return this.$doc.scrollTop();
            return 0;
        },
        //左侧组件新增区组件左击事件
        _eLeftComMouseDown: function (event, $self, item) {
            //左击事件
            if (event.button == 1 || event.button == 0) {
                this._clearFun();
                this.options.moving = true;
                this.moveType = 0;
                //设置页面不可以全选
                this.$body.addClass('noChoose');
                //设置页面不可以全选
                this.$topBody.addClass('noChoose');
                if (this.moveBoxType == 1) {
                    this.$comBox = this.$contentBox;
                    //滚动到要拖拉的位置区域
                    var curScrollTop = this._getScrollTop();
                    var toScrollTop = 0;
                    var compos = this.$comBox.offset();
                    if (curScrollTop == 0) {
                        toScrollTop = compos.top - curScrollTop - 10;
                        $('html,body').animate({scrollTop: toScrollTop}, 500);
                    }
                    var firstChild = this.$comBox.find('div:first-child');
                    this.$firstChild = null;
                    if (firstChild.length > 0 && firstChild.hasClass('main-empty-notice-b')) {
                        this.$firstChild = firstChild;
                        this.$firstChild.hide();
                        this.$body.append(this.$firstChild);
                    }

                }
                //初始化编辑区的占位挡板
                this._initBaffle(this.$comBox);
                this.$baffle.show();
                //显示拖拉占位
                this.$curCom = item;
                this.$curCom.css('visibility', 'hidden');
                this.$moveMask.css({'width': '96px', 'height': '70px'});
                this.$moveMask.html(this.$curCom.html());
                var pos = $self.$curCom.offset();
                this.options.mouseLeft = event.pageX - pos.left;
                this.options.mouseTop = event.pageY - pos.top;
                this.$moveMask.css({left: pos.left, top: pos.top}).show();
                this.iframeLeft = 237;
                this.iframeTop = 40;
                //  绑定组件拖拉事件
                var moveFun = function () {
                    $self.$topBody.unbind('mousemove');
                    $self.$body.unbind('mousemove');
                    $self.$topBody.mousemove(function (event) {
                        if (!$self.options.moving)
                            return false;
                        $self.$moveMask.css({left: event.pageX - $self.options.mouseLeft, top: event.pageY - $self.options.mouseTop});
                        $self._checkComMousePos(event);
                        //  return false;
                    })//;
                    $self.$body.mousemove(function (event) {
                        if (!$self.options.moving)
                            return false;
                        $self.$moveMask.css({left: (event.pageX - $self.options.mouseLeft + $self.iframeLeft), top: (event.pageY - $self.options.mouseTop - $self._getScrollTop() + $self.iframeTop)});
                        // $self._checkComMousePos(event);
                        // return false;
                    });
                };
                moveFun();
                // 拖拉结束事件
                this.$topBody.on('mouseup', function () {
                    $self.options.moving = false;
                    $self._eComMouseDrop($self);
                    return false;
                });
            }
        },
        //组件区域点击拖拉事件
        _eComMainMouseDown: function (event, $self, item) {
            this._clearFun();
            this.moveType = 1;
            //显示拖拉占位
            this.$curCom = item;
            this.$curCom.css('visibility', 'hidden');
            this.$innerMoveMask.html('<div style="text-align:left">' + this.$curCom.html() + '</div>');
            //设置页面不可以全选
            this.$body.addClass('noChoose');
            //设置页面不可以全选
            this.$topBody.addClass('noChoose');
            //初始化编辑区的占位挡板
            this._initBaffle($self.$comBox);
            this.$baffle.show();
            var pos = this.$curCom.offset();
            this.options.mouseLeft = event.pageX - pos.left;
            this.options.mouseTop = event.pageY - pos.top;
            this.$innerMoveMask.css({'width': this.$curCom.width()});
            this.$innerMoveMask.css({left: pos.left, top: pos.top}).show();
            this.options.moving = true;
            this.iframeLeft = 0;
            this.iframeTop = 0;
            //  绑定组件拖拉事件
            var moveFun = function () {
                $self.$body.unbind('mousemove');
                $self.$body.mousemove(function (event) {
                    if (!$self.options.moving)
                        return false;
                    $self.$innerMoveMask.css({left: event.pageX - $self.options.mouseLeft, top: (event.pageY - $self.options.mouseTop)});
                    $self._checkComMousePos(event);
                    return false;
                });
            };
            moveFun();
            // 拖拉结束事件
            this.$body.on('mouseup', function () {
                $self.options.moving = false;
                $self._eComMouseDrop($self);
                return false;
            });
        },
        //禁用后退键
        _eDocKeyDown: function () {
            var me = this;
            this.$doc.keydown(function (e) {
                var keyEvent;
                if (e.keyCode == 8) {
                    var d = e.srcElement || e.target;
                    if (d.tagName.toUpperCase() == 'INPUT'
                            || d.tagName.toUpperCase() == 'TEXTAREA'
                            || d.tagName.toUpperCase() == 'H2'
                            || d.tagName.toUpperCase() == 'H5'
                            || d.tagName.toUpperCase() == 'H1'
                            || d.tagName.toUpperCase() == 'SPAN'
                            || d.tagName.toUpperCase() == 'U'
                            || d.tagName.toUpperCase() == 'DIV') {
                        keyEvent = d.readOnly || d.disabled;
                    } else {
                        keyEvent = true;
                    }
                } else {
                    keyEvent = false;
                }
                if (keyEvent) {
                    e.preventDefault();
                }
            });
            this.$element.on('click', function () {
                me.CloseAll();
            });
        },
        //绑定组件拖拉事件
        _eComMouseMove: function ($self) {
            var moveFun = function () {
                $self.$topBody.unbind('mousemove');
                $self.$body.unbind('mousemove');
                $self.$topBody.mousemove(function (event) {
                    if (!$self.options.moving)
                        return false;
                    $self.$moveMask.css({left: event.pageX - $self.options.mouseLeft, top: event.pageY - $self.options.mouseTop});
                    //   if ($self.moveType == 0)
                    $self._checkComMousePos(event);
                    event.stopPropagation();
                });
                $self.$body.mousemove(function (event) {
                    if (!$self.options.moving)
                        return false;
                    $self.$moveMask.css({left: event.pageX - $self.options.mouseLeft + 235, top: event.pageY - $self.options.mouseTop + 40});
                    //  if ($self.moveType == 1)
                    //    $self._checkComMousePos(event);
                });
                //$self.docTime = setTimeout(moveFun, 20);
            };
            moveFun();
        },
        //计算鼠标位置在哪个区内
        _checkComMousePos: function (event) {
            if (!this._countPosFun(event, this.$comBox)) {
                this.$posMask.hide();
                this.options.status = 0;
                return false;
            }
            /* var posEditor = this.$element.offset();
             this.options.editorLeft = posEditor.left;
             this.options.editorTop = posEditor.top;
             var temLX = event.pageX + (this.options.moveMaskWidth - this.options.mouseLeft);
             var temRX = event.pageX - this.options.mouseLeft;
             var temTY = event.pageY + (this.options.moveMaskHeight - this.options.mouseTop);
             var temBY = event.pageY - this.options.mouseTop;
             if (temLX < this.options.editorLeft
             || temRX > this.options.editorLeft + this.$element.outerWidth()
             || temTY < this.options.editorTop
             || temBY > this.options.editorTop + this.$element.outerHeight()) {
             this.$posMask.hide();
             this.options.status = 0;
             return;
             }*/
            this._findComPos(event, this.$comBox, 0);
        },
        //查找位置
        _findComPos: function (event, obj, layerCount) {
            layerCount++;
            if (!this._countPosFun(event, obj)) {
                return false;
            }

            //var boxPos = obj.offset();
            //var boxWidth = obj.outerWidth();
            //  var boxHeight = obj.outerHeight();
            /*var temLX = event.pageX + (this.options.moveMaskWidth - this.options.mouseLeft);
             var temRX = event.pageX - this.options.mouseLeft;
             var temTY = event.pageY + (this.options.moveMaskHeight - this.options.mouseTop);
             var temBY = event.pageY - this.options.mouseTop;
             var boxWidth = obj.outerWidth();
             var boxHeight = obj.outerHeight();
             var boxPos = obj.offset();
             if (temLX < boxPos.left
             || temRX > boxPos.left + boxWidth
             || temTY < boxPos.top
             || temBY > boxPos.top + boxHeight) {
             return false;
             }*/

            var allCom = null;
            var isParent = false;
            if (obj.find('div:first').hasClass('div-padding')) {
                allCom = obj.find('div:first').children('div.li-div');
            } else {
                allCom = obj.children('div.li-div');
                isParent = true;
            }
            //没有任何组件或容器
            if (allCom == null || allCom.length == 0) {
                this._showPosMask(this.boxParm.left, this.boxParm.top, this.boxParm.width, 2);
                this._setMoveResult(obj, null, 'top', false);
                return true;
            } else if (isParent) {
                var firstCom = $(allCom[0]);
                var firstPos = firstCom.offset();
                var lastCom = $(allCom[allCom.length - 1]);
                var lastPos = lastCom.offset();
                if (this.moveType == 0) {
                    if (event.pageY > (this.boxParm.top - this._getScrollTop() + this.iframeTop)
                            && event.pageY <= (firstPos.top - this._getScrollTop() + this.iframeTop)
                            && event.pageX >= (this.boxParm.left + this.iframeLeft)
                            && event.pageX <= (this.boxParm.left + this.boxParm.width + this.iframeLeft)) {
                        this._showPosMask(this.boxParm.left, firstPos.top, this.boxParm.width, 2);
                        this._setMoveResult(obj, firstCom, 'top', false);
                        return false;
                    }
                } else if (this.moveType == 1) {
                    if (event.pageY > this.boxParm.top
                            && event.pageY <= firstPos.top
                            && event.pageX >= this.boxParm.left
                            && event.pageX <= (this.boxParm.left + this.boxParm.width)) {
                        this._showPosMask(this.boxParm.left, firstPos.top, this.boxParm.width, 2);
                        this._setMoveResult(obj, firstCom, 'top', false);
                        return false;
                    }
                }
                if (this.moveType == 0) {
                    if (event.pageY > (lastPos.top + lastCom.outerHeight() - this._getScrollTop() + this.iframeTop)
                            && event.pageY <= (this.boxParm.top + this.boxParm.height - this._getScrollTop() + this.iframeTop)
                            && event.pageX >= (this.boxParm.left + this.iframeLeft)
                            && event.pageX <= (this.boxParm.left + this.boxParm.width + this.iframeLeft)) {
                        this._showPosMask(this.boxParm.left, (lastCom.top + lastCom.outerHeight()), this.boxParm.width, 2);
                        this._setMoveResult(obj, lastCom, 'bottom', false);
                        return false;
                    }
                } else if (this.moveType == 1) {
                    if (event.pageY > (lastPos.top + lastCom.outerHeight())
                            && event.pageY <= (this.boxParm.top + this.boxParm.height)
                            && event.pageX >= this.boxParm.left
                            && event.pageX <= (this.boxParm.left + this.boxParm.width)) {
                        this._showPosMask(this.boxParm.left, (lastCom.top + lastCom.outerHeight()), this.boxParm.width, 2);
                        this._setMoveResult(obj, lastCom, 'bottom', false);
                        return false;
                    }
                }
            }

            var hasBox = false;
            $.each(allCom, function () {
                if ($(this).hasClass('col-li-div')) {
                    hasBox = true;
                    return false;
                }
            });
            //容器下面位置为空是放在最后一位
            if (allCom != null && allCom.length > 0 && !hasBox) {
                var lastCom = $(allCom[allCom.length - 1]);
                var lastPos = lastCom.offset();
                if (this.moveType == 0) {
                    if (event.pageY > (lastCom.top - this._getScrollTop() + this.iframeTop + lastCom.outerHeight())
                            && event.pageY <= (this.boxParm.top - this._getScrollTop() + this.boxParm.height + this.iframeTop)
                            && event.pageX >= (this.boxParm.left + this.iframeLeft)
                            && event.pageX <= (this.boxParm.left + this.boxParm.width + this.iframeLeft)) {
                        this._showPosMask(this.boxParm.left, (lastPos.top + lastCom.outerHeight()), this.boxParm.width, 2);
                        this._setMoveResult(obj, lastCom, 'bottom', false);
                        return false;
                    }
                } else if (this.moveType == 1) {
                    if (event.pageY > (lastPos.top + lastCom.outerHeight())
                            && event.pageY <= (this.boxParm.top + this.boxParm.height)
                            && event.pageX >= (this.boxParm.left)
                            && event.pageX <= (this.boxParm.left + this.boxParm.width)) {
                        this._showPosMask(this.boxParm.left, (lastPos.top + lastCom.outerHeight()), this.boxParm.width, 2);
                        this._setMoveResult(obj, lastCom, 'bottom', false);
                        return false;
                    }
                }
            }
            for (var i = 0; i < allCom.length; i++) {
                var temCom = $(allCom[i]);
                //查找到容器则继续向下查找
                if (!temCom.hasClass('col-li-div')) {
                    var temPos = temCom.offset();
                    var temTop = 0;
                    if (this.moveType == 0) {
                        temTop = temPos.top - this._getScrollTop() + this.iframeTop;
                    } else if (this.moveType == 1) {
                        temTop = temPos.top;
                    }
                    //计算位置
                    if (event.pageX >= (temPos.left + this.iframeLeft)
                            && event.pageX <= (temPos.left + temCom.outerWidth() + this.iframeLeft)
                            && event.pageY >= temTop
                            && event.pageY <= (temTop + temCom.outerHeight())) {
                        //计算方位，靠左三分之一算左，靠右三分之一算右
                        if (event.pageX <= (temPos.left + temCom.outerWidth() / 3 + this.iframeLeft))
                        {
                            this.dropPos = 'left';
                        } else if (event.pageX >= (temPos.left + (temCom.outerWidth() / 3) * 2 + this.iframeLeft)) {
                            this.dropPos = 'right';
                        } else {
                            if (event.pageY <= temTop + (temCom.outerHeight() / 2))
                            {
                                this.dropPos = 'top';
                            } else {
                                this.dropPos = 'bottom';
                            }
                        }

                        //靠近上或下也算上或下,值为this.options.gap
                        if ((event.pageY - temTop) >= 0 && (event.pageY - temTop) <= this.options.gap) {
                            this.dropPos = 'top';
                        } else if ((temTop + temCom.outerHeight() - event.pageY) >= 0 && (temTop + temCom.outerHeight() - event.pageY) <= this.options.gap) {
                            this.dropPos = 'bottom';
                        }
                        this.isNewBox = false;
                        //是否新建容器(到指定层级左右边不再新创建容器)
                        if (this.dropPos == 'left' || this.dropPos == 'right') {
                            if ((!obj.hasClass('td-w') || (obj.hasClass('td-w') && allCom.length > 1)) && layerCount <= this.options.layer) {
                                this.isNewBox = true;
                            }
                        }
                        //当前信息
                        this.options.status = 1;
                        this.$dropCom = temCom;
                        this.$dropBox = obj;
                        //显示占位符
                        var maskTop = temPos.top;
                        var maskLeft = temPos.left;
                        var maskWidth = temCom.outerWidth();
                        var maskHeight = temCom.outerHeight();
                        switch (this.dropPos) {
                            case 'top':
                                maskTop = temPos.top;
                                maskHeight = 2;
                                break;
                            case 'bottom':
                                maskTop = temPos.top + temCom.outerHeight();
                                maskHeight = 2;
                                break;
                            case 'left':
                                maskLeft = temPos.left;
                                maskWidth = 2;
                                break;
                            case 'right':
                                maskLeft = temPos.left + temCom.outerWidth();
                                maskWidth = 2;
                                break;
                        }
                        this._showPosMask(maskLeft, maskTop, maskWidth, maskHeight);
                        return false;
                    }

                } else {
                    var boxList = temCom.find('td.td-w');
                    for (var j = 0; j < boxList.length; j++) {
                        if (this._findComPos(event, $(boxList[j]), layerCount))
                            return false;
                    }
                }
            }
            return false;
        },
        //显示拖拉占用线
        _showPosMask: function (left, top, width, height) {
            this.$posMask.css({'left': left, 'top': top, 'width': width, 'height': height}).show();
        },
        //设置移动结果
        _setMoveResult: function (obj, dropCom, dropPos, isNewBox) {
            this.options.status = 1;
            this.$dropBox = obj;
            this.$dropCom = dropCom;
            this.dropPos = dropPos;
            this.isNewBox = isNewBox;
        },
        //拖拉组件释放鼠标后执行事件
        _eComMouseDrop: function ($self) {
            if (this.$curCom != null)
                this.$curCom.css('visibility', '');
            var temMoveMask = null;
            if (this.moveType == 0) {
                temMoveMask = this.$moveMask;
            } else {
                temMoveMask = this.$innerMoveMask;
            }
            // console.log(this.options.status);
            //拖拉到不正确的位置
            if (this.options.status == 0) {
                var pos = this.$curCom.offset();
                temMoveMask.animate({left: pos.left, top: pos.top}, 100, function () {
                    $(this).hide();
                    if ($self.moveBoxType == 1) {
                        if ($self.$firstChild != null) {
                            $self.$contentBox.append($self.$firstChild);
                            $self.$firstChild.show();
                            $self.$firstChild = null;
                        }
                    }
                    $self._clearFun();
                });
            } else if (this.options.status == 1) {
                //正确位置
                var posMask = this.$posMask.offset();
                var leftPost = posMask.left + this.iframeLeft;
                var topPost = posMask.top - this._getScrollTop() + this.iframeTop;
                if (this.moveType == 1) {
                    topPost = posMask.top;
                }
                //计算位置
                switch (this.dropPos) {
                    case 'top':
                    case 'bottom':
                        leftPost = leftPost + (this.$posMask.outerWidth() - temMoveMask.outerWidth()) / 2;
                        topPost = topPost - (temMoveMask.outerHeight() - this.$posMask.outerHeight()) / 2;
                        break;
                    case 'left':
                    case 'bottom':
                        leftPost = leftPost - (temMoveMask.outerWidth() - this.$posMask.outerWidth()) / 2;
                        topPost = topPost + (this.$posMask.outerHeight() - temMoveMask.outerHeight()) / 2;
                        break;
                }
                //回到占位的位置
                temMoveMask.animate({left: leftPost, top: topPost}, 100,
                        function () {
                            $(this).hide();
                            $self.$posMask.hide();
                            $self._addCom();
                        }
                );
            }
        },
        //新增组件
        _addCom: function () {
            //组件信息
            var comInfo = {id: 0, type_id: this.$curCom.attr('data-type'), pos_row: 1, pos_column: 1};
            //框架信息
            var boxInfo = {};
            //位置信息
            var posInfo = {};
            var me = this;
            //当前框架ID
            var curBoxID = this.$dropBox.attr('data-id');
            if (curBoxID && curBoxID != 'undefined') {
                curBoxID = this.$dropBox.attr('data-id');
            } else {
                curBoxID = 0;
            }
            posInfo['curboxid'] = curBoxID;
            //拖拉的位置
            posInfo['droppos'] = this.dropPos;
            //拖拉到哪个相对组件的ID
            if (this.$dropCom != null) {
                posInfo['dropcomid'] = this.$dropCom.attr('data-id');
            }
            if (this.dropPos == 'left' || this.dropPos == 'right') {
                if (this.isNewBox) {
                    boxInfo['id'] = 0;
                    boxInfo['config'] = '[{"column":"1","width":"50"},{"column":"2","width":"50"}]';
                    boxInfo['pos_row'] = 1;
                    boxInfo['pos_column'] = 1;
                    if (this.$dropCom != null) {
                        boxInfo['pos_row'] = this.$dropCom.attr('data-row');
                        boxInfo['pos_column'] = this.$dropCom.attr('data-column');
                    }
                } else {
                    //不是新建架构时
                    boxInfo['id'] = curBoxID;
                    var allTd = $('#com_' + curBoxID).find('td[data-id=' + curBoxID + ']');
                    var allTdCount = allTd.length + 1;
                    var boxConfig = '';
                    var tdWidth = 100 / allTdCount;
                    for (var i = 1; i <= allTdCount; i++) {
                        if (boxConfig != '')
                            boxConfig += ',';
                        boxConfig += '{"column":"' + i + '","width":"' + tdWidth + '"}';
                    }
                    boxInfo['config'] = '[' + boxConfig + ']';
                }
            }

            if (this.$dropCom != null) {
                var dropColumn = parseInt(this.$dropCom.attr('data-column'));
                var dropRow = parseInt(this.$dropCom.attr('data-row'));
                comInfo['pos_column'] = dropColumn;
                comInfo['pos_row'] = dropRow;
                if (this.dropPos == 'right')
                    comInfo['pos_column'] = dropColumn + 1;
                if (this.dropPos == 'bottom')
                    comInfo['pos_row'] = dropRow + 1;
            }
            if (this.moveType == 1) {
                comInfo['id'] = this.$curCom.attr('data-id');
                if (comInfo['id'] == posInfo['dropcomid']) {
                    this._clearFun();
                    return false;
                }
                var curBox = this.$curCom.parents('td.td-w[data-id]:first');
                if (curBox.length > 0 && curBox.find('div.li-div[data-id]').length == 1) {
                    var parentBox = curBox.parents('div.col-li-div[data-id]:first');
                    comInfo['box_id'] = parentBox.attr('data-id');
                    comInfo['box_column'] = parentBox.find('td.td-w[data-id=' + comInfo['box_id'] + ']').length;
                    comInfo['cur_column'] = this.$curCom.attr('data-column');
                }
            }
            this._cacheNewComData(posInfo, boxInfo, comInfo, function (newData, box) {
                me._initAddCom(me, comInfo, boxInfo, posInfo, newData);
                if (me.moveType == 1 && comInfo['box_id'] > 0) {
                    me._deleteInitBox(parseInt(comInfo['box_id']));
                }
                if (me.moveBoxType == 2)
                    me._initBaffle(me.$footerBox);
            });
        },
        //初始化新增的组件
        _initAddCom: function ($self, comInfo, boxInfo, posInfo, data) {
            var curComID = data.id;
            var curFrameID = data.parent_id;
            var isNew = false;
            var newCom = null;
            if (this.moveType == 0) {
                isNew = true;
                newCom = $self._getComHtml();
                newCom = $('<div class="li-div" id="com_' + curComID + '" data-id="' + curComID + '" data-type="' + this.$curCom.attr('data-type') + '" data-row="' + comInfo['pos_row'] + '" data-column="' + comInfo['pos_column'] + '">' + newCom + '</div>');
            } else {
                newCom = this.$curCom;
            }
            var tableBox;
            var tdBox;
            var isNewTb = false;
            if ($self.dropPos == 'left' || $self.dropPos == 'right') {
                if (this.isNewBox) {
                    tableBox = $('<div></div>').attr({'id': 'com_' + curFrameID, 'class': 'li-div col-li-div', 'data-id': curFrameID, 'data-type': COMPONENTTYPE.FRAME, 'data-row': boxInfo['pos_row'], 'data-column': boxInfo['pos_column']});
                    tableBox.append('<div class="col-table"><table class="div-table" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td class="td-w" width="50%" data-id="' + curFrameID + '"><div class="div-padding"></td><td class="td-w" width="50%" data-id="' + curFrameID + '"><div class="div-padding"></td></tr></table></div>');
                    var tdBox = tableBox.find('div.div-padding');
                    if ($self.dropPos == 'left') {
                        $self.$dropCom.attr('data-column', 2);
                        $self.$dropCom.attr('data-row', 1);
                        $(tdBox[0]).append(newCom);
                    } else {
                        $self.$dropCom.attr('data-column', 1);
                        $self.$dropCom.attr('data-row', 1);
                        $(tdBox[1]).append(newCom);
                    }
                } else {
                    isNewTb = true;
                    tableBox = $self.$dropCom.parents('div.col-li-div:first');
                    var allCom = tableBox.find('div.li-div[data-column]');
                    $.each(allCom, function () {
                        var temColumn = parseInt($(this).attr('data-column'));
                        if (temColumn >= comInfo['pos_column']) {
                            $(this).attr('data-column', temColumn + 1);
                        }
                    });
                    tdBox = $('<td class="td-w" data-id="' + boxInfo['id'] + '"><div class="div-padding"></div></td>');
                    tdBox.find('.div-padding').append(newCom);
                }
            }
            //计算位置
            switch (this.dropPos) {
                case 'top':
                case 'bottom':
                    //上下
                    if ($self.$dropCom == null) {
                        if ($self.$dropBox.find('div:first').hasClass('div-padding')) {
                            if ($self.dropPos == 'top') {
                                $self.$dropBox.find('div:first').prepend(newCom);
                            } else {
                                $self.$dropBox.find('div:first').append(newCom);
                            }
                        } else {
                            if ($self.dropPos == 'top') {
                                $self.$dropBox.prepend(newCom);
                            } else {
                                $self.$dropBox.append(newCom);
                            }
                        }
                        $self.$dropCom = newCom;
                    } else {
                        if ($self.dropPos == 'top') {
                            $(newCom).insertBefore($self.$dropCom);
                        } else {
                            $(newCom).insertAfter($self.$dropCom);
                        }
                    }
                    tableBox = $self.$dropCom.parents('div.col-li-div:first');
                    break;
                case 'left':
                case 'right':
                    //左右
                    if ($self.isNewBox) {
                        tableBox.insertBefore($self.$dropCom);
                        if ($self.dropPos == 'left') {
                            $(tdBox[1]).append($self.$dropCom);
                        } else {
                            $(tdBox[0]).append($self.$dropCom);
                        }
                    } else {
                        var pTd = $self.$dropCom.parents('td.td-w:first');
                        if ($self.dropPos == 'left') {
                            $(tdBox).insertBefore(pTd);
                        } else if ($self.dropPos == 'right') {
                            $(tdBox).insertAfter(pTd);
                        }
                    }
                    break;
            }
            if (isNew)
                $self._initBindComEvent($self, newCom);
            if (tableBox)
                $self._initTableBox($self, tableBox, isNewTb);
            $self._clearFun();
            $self._autoImage();
        },
        /**
         * 绑定组件事件
         */
        _initBindComEvent: function ($self, com) {
            com.each(function () {
                $(this).hover(function () {
                    if ($self.options.moving || $self.options.deleting || $self.options.copying || $self.options.disable || $self.options.editing)
                        return false;
                    if (!$(this).hasClass('col-li-div')) {
                        $(this).attr('class', 'li-div li-div-hover');
                        if ($self.moveBoxType == 1) {
                            $self.$doWindow.find('div.moveto-b:first').show();
                        } else if ($self.moveBoxType == 2) {
                            $self.$doWindow.find('div.moveto-b:first').hide();
                        }
                        $self.$doWindow.insertBefore($(this).find('div:first')).show();
                    }
                }, function () {
                    if ($self.options.deleting || $self.options.copying || $self.options.disable || $self.options.editing)
                        return false;
                    $(this).removeClass('li-div-hover');
                    $self.$doWindow.hide();
                    $self.$deleteAlert.hide();
                });
            });
            //编辑事件
            $self._bindComEdit(com);
        },
        //行table的事件
        _initTableBox: function ($self, frame, isNewTb) {
            if (frame.length > 0) {
                var frameID = frame.attr('data-id');
                var frameInfo = this._getComInfo(frameID);
                frame.find('div.divider-w[data-id=' + frameID + ']').remove();
                //生成table的分隔线
                var tbList = frame.find('td.td-w[data-id=' + frameID + ']');
                for (var i = 0; i < tbList.length; i++) {
                    if (isNewTb)
                        $(tbList[i]).attr({'data-column': i + 1, 'data-id': frameID, 'width': (100 / tbList.length) + '%'});
                    if (i < tbList.length - 1)
                        frame.append('<div class="divider-w" data-id="' + frameID + '" style="cursor:e-resize;top:0;left:0"></div>');
                }
                var curLine = null;
                var lineLeftTb = null;
                var lineRightTb = null;
                var boxWidth = 0;
                var posFrame = frame.offset();
                var twoWidth = 0;
                var countFrameConfig = function () {
                    var config = '';
                    for (var i = 0; i < tbList.length; i++) {
                        config += (config != '' ? ',' : '') + '{"column":"' + (i + 1) + '","width":"' + $(tbList[i]).attr('width').replace('%', '') + '"}';
                    }
                    config = '[' + config + ']';
                    $self.saveComID = frameID;
                    $self._cacheComData('config', config);
                    //    $self.SaveCom();
                }
                var moveEnd = function (event) {
                    $self.options.moving = false;
                    $self.$body.removeClass('noChoose');
                    $self.$doc.off('mousemove mouseup');
                    if ($self.docTime != null) {
                        clearInterval($self.docTime);
                        $self.docTime = null;
                    }
                    lineLeftTb.css('cursor', 'auto');
                    lineRightTb.css('cursor', 'auto');
                    countFrameConfig();
                };
                var moveFun = function () {
                    $self.$doc.off('mousemove mouseup');
                    $self.$doc.on('mousemove', function (event) {
                        var posLeft = lineLeftTb.offset();
                        var posRight = lineRightTb.offset();
                        var widthLeft = event.pageX - posLeft.left;
                        var widthRight = posRight.left + lineRightTb.width() - event.pageX;
                        if (widthLeft < 50) {
                            widthLeft = 50
                            widthRight = twoWidth - 50;
                        }
                        if (widthRight < 50) {
                            widthRight = 50
                            widthLeft = twoWidth - 50;
                        }
                        var cruListX = posLeft.left - posFrame.left + widthLeft;
                        curLine.css('left', cruListX);
                        lineLeftTb.attr('width', (widthLeft / boxWidth) * 100 + '%');
                        lineRightTb.attr('width', (widthRight / boxWidth) * 100 + '%');
                        return false;
                    }).on('mouseup', function () {
                        moveEnd();
                        return false;
                    });
                    $self.docTime = setTimeout(moveFun, 50);
                };
                //绑定分隔线事件
                if (tbList.length > 1) {
                    var lines = frame.find('div.divider-w[data-id=' + frameID + ']');
                    lines.each(function () {
                        $(this).off('mousedown').hover(function () {
                            if ($self.options.moving || $self.options.disable)
                                return false;
                            $(this).addClass('divider-w-move');
                        }, function () {
                            if ($self.options.moving || $self.options.disable)
                                return false;
                            $(this).removeClass('divider-w-move');
                        }).mousedown(function () {
                            if ($self.options.moving || $self.options.disable)
                                return false;
                            $self.$body.addClass('noChoose');
                            curLine = $(this);
                            var index = lines.index(curLine);
                            var allTb = $(curLine.prevAll('div.col-table:first')).find('td.td-w[data-id=' + curLine.attr('data-id') + ']');
                            if (allTb.length > 0) {
                                $self.options.moving = true;
                                lineLeftTb = $(allTb[index]);
                                lineRightTb = $(allTb[index + 1]);
                                lineLeftTb.css('cursor', 'e-resize');
                                lineRightTb.css('cursor', 'e-resize');
                                boxWidth = frame.find('table.div-table:first').width();
                                twoWidth = lineLeftTb.width() + lineRightTb.width();
                                moveFun();
                            }
                        });
                    }).mouseup(function () {
                        if ($self.options.disable)
                            return false;
                        moveEnd();
                        return false;
                    }).css('visibility', 'hidden');
                }

            }
            //显示或隐藏table的分隔线
            frame.off('mouseenter mouseleave').hover(function () {
                if ($self.options.moving || $self.options.copying || $self.options.deleting || $self.options.editing || $self.options.disable)
                    return false;
                var curFrame = $(this);
                var curFrameID = curFrame.attr('data-id');
                var dividerList = curFrame.find('div.divider-w[data-id=' + curFrameID + ']');
                var frameTDList = curFrame.find('td.td-w[data-id=' + curFrameID + ']');
                var divLeft = 0;
                for (var i = 0; i < frameTDList.length - 1; i++) {
                    divLeft += $(frameTDList[i]).width();
                    $(dividerList[i]).css('left', (divLeft - 14));
                }
                dividerList.css({'visibility': 'visible', 'height': curFrame.height()});
            }, function () {
                if ($self.options.moving || $self.options.copying || $self.options.deleting || $self.options.editing || $self.options.disable)
                    return false;
                $(this).find('div.divider-w[data-id=' + $(this).attr('data-id') + ']').css('visibility', 'hidden');
            });
        },
        //绑定组件编辑功能
        _bindComEdit: function (newCom) {
            var comType = parseInt(newCom.attr('data-type'));
            switch (comType) {
                case COMPONENTTYPE.TITLE:
                    this._initTitleBar(this, newCom);
                    break;
                case COMPONENTTYPE.TEXT:
                    this._initTextBar(this, newCom, newCom.find('div.w-text:first'), comType);
                    break;
                case COMPONENTTYPE.RICHTXT:
                    this._initRichTextBar(this, newCom);
                    break;
                case COMPONENTTYPE.BUTTON:
                    this._initButtonBar(this, newCom);
                    break;
                case COMPONENTTYPE.DIVIDER:
                    this._initDividerBar(this, newCom);
                    break;
                case COMPONENTTYPE.SPACER:
                    this._initSpacerBar(this, newCom);
                    break;
                case COMPONENTTYPE.SEARCH:
                    this._initSearchBar(this, newCom);
                    break;
                case COMPONENTTYPE.IMAGE:
                    this._initImageBar(this, newCom);
                    break;
                case COMPONENTTYPE.GALLERY:
                    this._initGalleryBar(this, newCom);
                    break;
                case COMPONENTTYPE.SLIDESHOW:
                    this._initSlideShowBar(this, newCom);
                    break;
                case COMPONENTTYPE.CODE:
                    this._initCodeBar(this, newCom);
                    break;
                case COMPONENTTYPE.MAP:
                    this._initMapBar(this, newCom);
                    break;
                case COMPONENTTYPE.PRODUCT:
                    this._initProductBar(this, newCom);
                    break;
                case COMPONENTTYPE.FLASH:
                    this._initFlashBar(this, newCom);
                    break;
                case COMPONENTTYPE.FILE:
                    this._initFileBar(this, newCom);
                    break;
                case COMPONENTTYPE.VIDEOLINK:
                    this._initVideoLinkBar(this, newCom);
                    break;
                case COMPONENTTYPE.PRODUCT:
                    this._initProductBar(this, newCom);
                    break;
                case COMPONENTTYPE.ARTICLE:
                    this._initArticleBar(this, newCom);
                    break;
                case COMPONENTTYPE.SOCIALICONS:
                    this._initSocialIconsBar(this, newCom);
                    break;
            }

        },
        //获取组件html
        _getComHtml: function () {
            var html = '';
            var comType = parseInt(this.$curCom.attr('data-type'));
            switch (comType) {
                case COMPONENTTYPE.TITLE:
                    html = getWebTitle(HOSTCONFIG.THEME_TITLE);
                    break;
                case COMPONENTTYPE.TEXT:
                    html = '<div class="w-edit-com w-text" contenteditable="true" data-empty="1">点击编辑文本</div>';
                    break;
                case COMPONENTTYPE.RICHTXT:
                    html = '<div class="w-edit-com w-text" data-empty="1">点击编辑富文本</div>';
                    break;
                case COMPONENTTYPE.BUTTON:
                    html = '<div class="w-edit-com w-button"><div class="btn-default-b btn-default-w w-btn-large-w"><span class="btn-inner">按钮名称</span></div></div>';
                    break;
                case COMPONENTTYPE.DIVIDER:
                    html = '<div class="w-edit-com w-delimiters-hor" style="margin:9px auto;"><hr class="delimiters" style="margin:0 auto;"></div>';
                    break;
                case COMPONENTTYPE.SPACER:
                    html = '<div class="w-edit-com w-space space-b noChoose" style="height:40px;"><span>间隔</span><div class="stretch-b"></div></div>';
                    break;
                case COMPONENTTYPE.SEARCH:
                    html = '<div class="w-edit-com w-searchbox"><div class="search-w search-defaut-w"><input type="text" placeholder="搜索内容" class="input-text-w input-search-w"><div class="btn-default-w search-btn-w"><span class="btn-inner">查询</span></div></div></div>';
                    break;
                case COMPONENTTYPE.IMAGE:
                    html = '<div class="w-edit-com w-simImg" style="cursor:pointer"><div class="image-empty"><a title="点击上传"><img src="/images/images-empty.png"></a></div></div>';
                    break;
                case COMPONENTTYPE.GALLERY:
                    html = '<div class="w-edit-com w-multi-imgs" style="cursor:pointer"><div class="image-empty"><a title="点击上传"><img src="/images/gallery-empty.png"></a></div></div>';
                    break;
                case COMPONENTTYPE.SLIDESHOW:
                    html = '<div class="w-edit-com w-slide"><div class="image-empty"><a title="点击上传"><img src="/images/gallery-empty.png"></a></div></div>';
                    break;
                case COMPONENTTYPE.CODE:
                    html = '<div class="w-edit-com w-code"><div class="custom-code"><div class="code-info">点击设置代码</div></div></div></div>';
                    break;
                case COMPONENTTYPE.MAP:
                    html = '<div class="w-edit-com w-map"><div class="map"><iframe  id="gframe_' + $.getTimeStamp() + '" allowtransparency="true" frameborder="0" scrolling="no" style="width:100%; height:250px;" src="/js/editor/bar/baidumap.html"></iframe><div class="maptop" style=\"width:100%;left:0;top:0;height:250px;position:absolute;\"></div></div></div>';
                    break;
                case COMPONENTTYPE.PRODUCT:
                    html = '<div class="w-edit-com w-product clearfix"><div class="image-empty"><img src="/images/adprd-empty.png"/></div></div>';
                    break;
                case COMPONENTTYPE.ARTICLE:
                    html = '<div class="w-edit-com w-adNews w-adNews1"><div class="image-empty"><img src="/images/news-empty.png"/></div></div>';
                    break;
                case COMPONENTTYPE.FLASH:
                    html = '<div class="w-edit-com w-flash"><div class="w-flash-empty"></div></div>';
                    break;
                case COMPONENTTYPE.FILE:
                    html = '<div class="w-edit-com w-file"><a class="clearfix" href="javascript:void(0)"><span style=" float:left;margin-right:1em;" class="w-file-img"><img src="../../images/file.png"></span><span class="w-file-info"><span class="w-file-name">文件名称</span><span class="w-file-down" style="display:none;">下载文件</span></span></a></div>';
                    break;
                case COMPONENTTYPE.VIDEOLINK:
                    html = '<div class="w-edit-com w-video"><div class="w-video-in"><div class="w-video-notUpload w-video-click"><div class="w-video-info"><div class="w-video-uploading-img"><img src="../../images/video-click.png"/></div></div></div></div></div>';
                    break;
                case COMPONENTTYPE.SOCIALICONS:
                    html = '<div class="w-edit-com w-social"><div class="w-social-in"><a href="javascript:void(0);" class="social-item social-facebook"  data-value="1"><i class="icon-social icon-social-facebook"></i></a><a href="javascript:void(0);" class="social-item social-twitter" data-value="2"><i class="icon-social icon-social-twitter"></i></a><a href="javascript:void(0);" class="social-item social-instagram" data-value="3"><i class="icon-social icon-social-instagram"></i></a><a href="javascript:void(0);" class="social-item social-linkedin" data-value="4"><i class="icon-social icon-social-linkedin"></i></a><a href="javascript:void(0);" class="social-item social-mail" data-value="5"><i class="icon-social icon-social-mail"></i></a></div></div>';
                    break;
            }
            return html;
        },
        //标题组件初始化
        _initTitleBar: function ($self, com) {
            var elems = null;
            var setTitleStyle = function (style, value) {
                var styleName = '';
                var type = '';
                switch (style) {
                    case 'title-font':
                        type = 'title';
                        styleName = 'font-family';
                        break;
                    case 'title-size':
                        type = 'title';
                        styleName = 'font-size';
                        break;
                    case 'title-weight':
                        type = 'title';
                        styleName = 'font-weight';
                        break;
                    case 'title-style':
                        type = 'title';
                        styleName = 'font-style';
                        break;
                    case 'sub-title-font':
                        type = 'subtitle';
                        styleName = 'font-family';
                        break;
                    case 'sub-title-size':
                        type = 'subtitle';
                        styleName = 'font-size';
                        break;
                    case 'sub-title-weight':
                        type = 'subtitle';
                        styleName = 'font-weight';
                        break;
                    case 'sub-title-style':
                        type = 'subtitle';
                        styleName = 'font-style';
                        break;
                }
                if (styleName == '')
                    return false;
                elems.each(function () {
                    if ($(this).attr('data-type') == type) {
                        $(this).css(styleName, value);
                        return false;
                    }
                });
            }
            var initTitleBar = function (curCom) {
                $self.$comBar.titleBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.titleBar,
                        COMPONENTTYPE.TITLE,
                        null,
                        function (bar, comInner, comConfig) {
                            createTitleBar(bar, curCom, comInner, comConfig);
                        }, function (type, style, value) {
                    if (type == 'com-css') {
                        setTitleStyle(style, value);
                    }
                });
            }

            //创建
            var createTitleBar = function (bar, curCom, comInner, comConfig) {
                //获取组件信息
                var comData = $self._getComInfo();
                elems = curCom.find('[data-type]');
                //样式选择
                var btn = bar.find('input[type="button"]');
                var subTitlePanel = bar.find('#com_title_subTitle');
                var subTitleStylePanel = bar.find('#com_title_subTitleStyle');
                var morePanel = bar.find('#com_title_more');
                subTitlePanel.hide();
                subTitleStylePanel.hide();
                morePanel.hide();
                // var elems = curCom.find('[data-type]');
                elems.each(function () {
                    if ($(this).attr('data-type') == 'subtitle') {
                        subTitleStylePanel.show();
                        subTitlePanel.show();
                    }
                    if ($(this).attr('data-type') == 'link')
                        morePanel.show();
                });

                var setTitleName = function (type, name) {
                    elems.each(function () {
                        if ($(this).attr('data-type') == type) {
                            if ($.isEmpty(name) && type == 'title') {
                                name = '标题名称';
                            }
                            if (type == 'title' || type == 'subtitle')
                                $(this).text(name);
                            if (type == 'link') {
                                $.isEmpty(name) ? $(this).hide() : $(this).show();
                            }
                            return false;
                        }
                    });
                }
                btn.unbind('click').click(function () {
                    $self.$comBar.titleBar.hide();
                    initTitleWin(curCom, comData);
                });
                var inputList = bar.find('input.input-text-b');
                $(inputList[0]).off('keyup').on('keyup', function () {
                    $self._cacheComData('name', $(this).val());
                    setTitleName('title', $(this).val());
                }).val(comData.name);
                $(inputList[1]).off('keyup').on('keyup', function () {
                    $self._cacheComData('info', $(this).val());
                    setTitleName('subtitle', $(this).val());
                }).val(comData.info);
                $(inputList[2]).off('keyup').on('keyup', function () {
                    $self._cacheComData('link', $(this).val());
                    setTitleName('link', $(this).val());
                }).val(comData.link);


            }
            var win = $('<div></div>');
            //加载样式选择界面
            var initTitleWin = function (curCom, comData) {
                var url = $self.options.jsurl + "/bar/title_win.html";
                top.$.Loading();
                win.load(url + '?t=' + $.getTimeStamp(), null, function (response, status, xhr) {
                    top.$.UnLoading();
                    elems = curCom.find('[data-type]');
                    var comConfig = $self._getComConfig();
                    var titleList = win.find('.styleBoxC-in:first').find('ul:first');
                    var titleType = HOSTCONFIG.THEME_TITLE;
                    var btnSave = win.find('.btn-green-b:first');
                    if (comConfig && comConfig['title-type'])
                        titleType = comConfig['title-type'];
                    var setTitleSelected = function () {
                        var liList = titleList.find('li');
                        liList.removeClass('selected');
                        liList.each(function () {
                            if ($(this).attr('data-num') == titleType) {
                                $(this).addClass('selected');
                            }
                            $(this).click(function () {
                                liList.removeClass('selected');
                                $(this).addClass('selected');
                            });
                        });
                    }
                    top.$.WinDialog(win, function (winDialog, winBox) {
                        btnSave.click(function () {
                            var item = titleList.find('li.selected:first');
                            var num = $(item).attr('data-num');
                            $self._cacheComConfig('title-type', num);
                            curCom.html(getWebTitle(num, comData));
                            elems = curCom.find('[data-type]');
                            for (var key in comConfig) {
                                setTitleStyle(key, comConfig[key]);
                            }
                            winBox.remove();
                            winDialog.remove();
                            $self._clearFun();
                        });
                        $.WebRequest('/editor/com/titles', null, function (data) {
                            var listHtml = '';
                            for (var i = 0; i < data.list.length; i++) {
                                listHtml += '<li data-num="' + data.list[i].num + '"><div class="style-itemC"><img src="/template/title/images/title' + data.list[i].num + '.png"></div></li>';
                            }
                            titleList.html(listHtml);
                            setTitleSelected();
                            btnSave.show();
                        });
                    }, function () {
                        $self._clearFun();
                    });
                });
            }
            $self._clearFun();
            com.on('click', function () {
                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                $self.saveComID = $self.$curCom.attr('data-id');
                initTitleBar($(this));
                return false;
            });
        },
        //文本编辑器初始化(comText:编辑内容,comType:组件类型)
        _initTextBar: function ($self, com, comText, comType) {
            var toolBar = null;
            var selectedRange;
            // 初始配置信息
            var toolConfig = [
                {
                    type: 'button',
                    data: [
                        {'type': 'bold', 'name': '加粗', 'class': 'glyphicon glyphicon-bold'},
                        {'type': 'italic', 'name': '斜体', 'class': 'glyphicon glyphicon-italic'},
                        {'type': 'underline', 'name': '下划线', 'class': 'icon-other icon-underline'}
//                        {'type': 'font-big', 'name': 'Increase Font Size', 'class': 'glyphicon glyphicon-plus'},
//                        {'type': 'font-small', 'name': 'Decrease Font Size', 'class': 'glyphicon glyphicon-minus'}
                    ]
                },
                {
                    type: 'dropdown',
                    data: [
                        {'type': 'font-color', 'name': '选择颜色', 'class': 'glyphicon glyphicon-text-color'}
                    ]
                },
                {
                    type: 'button',
                    data: [
                        {'type': 'removeformat', 'name': '删除格式', 'class': 'icon-other icon-link'}
                    ]
                },
                {
                    type: 'button',
                    data: [
                        {'type': 'insertunorderedlist', 'name': '无序列表', 'class': 'icon-other icon-ul'},
                        {'type': 'insertorderedlist', 'name': '有序列表', 'class': 'icon-other icon-ol'}
                    ]
                },
                {
                    type: 'dropdown',
                    data: [
                        {'type': 'text-align', 'name': '', 'class': 'glyphicon glyphicon-align-left',
                            'sub': [
                                {'type': 'justifyleft', 'class': 'glyphicon glyphicon-align-left'},
                                {'type': 'justifycenter', 'class': 'glyphicon glyphicon-align-center'},
                                {'type': 'justifyright', 'class': 'glyphicon glyphicon-align-right'},
                                {'type': 'justifyfull', 'class': 'glyphicon glyphicon-align-justify'}
                            ]}
                    ]
                },
                {
                    type: 'button',
                    data: [
                        {'type': 'undo', 'name': '撤消', 'class': 'icon-other icon-undo'},
                        {'type': 'redo', 'name': '重做', 'class': 'glyphicon glyphicon-share-alt'}
                    ]
                }
            ];
            //创建普通按钮
            var createButton = function (panel, item) {
                $.each(item.data, function (key, val) {
                    $('<a href="javascript:void(0)"></a>').attr({'data-type': val.type, 'title': val.name}).append($('<span></span>', {class: val.class})).appendTo(panel);
                });
                return panel;
            }

            // 创建下拉菜单
            var createDropDown = function (panel, item) {
                $.each(item.data, function (key, val) {
                    var dropButton = $('<div class="menu-down"></div>').attr({'title': val.name})
                            .append($('<span></span>', {class: val.class}).attr('aria-hidden', true))
                            .append($('<span aria-hidden="true" class="glyphicon glyphicon-triangle-bottom small-down"></span>'));
                    if (val.type == 'font-color') {
                        dropButton.append('<div class="menu-sub" style="width:240px;"><div id="textCP"></div></div>');
                    } else {
                        if (val.sub) {
                            var subButton = $('<div class="menu-sub"></div>');
                            var subUl = $('<ul></ul>');
                            $.each(val.sub, function (subkey, subval) {
                                subUl.append($('<li><a href="javascript:void(0)" data-type="' + subval.type + '"><span class="' + subval.class + '"></span></a></li>'));
                            });
                            subButton.append(subUl);
                            dropButton.append(subButton);
                        }
                    }
                    dropButton.appendTo(panel);
                });
                return panel;
            }
            //初始化
            var initToolBar = function () {
                toolBar = $('<div></div>', {class: 'text-menubox-b'}).css({'position': 'absolute', 'top': '-25px', 'z-index': 100});
                var textBarPanel = $('<div></div>', {class: 'text-menubox-in-b clearfix'});
                $.each(toolConfig, function (key, item) {
                    switch (item.type) {
                        case 'button':
                            textBarPanel = createButton(textBarPanel, item);
                            break;
                        case 'dropdown':
                            textBarPanel = createDropDown(textBarPanel, item);
                            break;
                    }
                });
                toolBar.append(textBarPanel).hide();
            }
            // 处理命令
            var execCommand = function (type, data, value) {
                data = data || '' + value || '';
                document.execCommand(type, 0, data);
            }
            // 获取当前选择区域
            var getCurrentRange = function () {
                var sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    return sel.getRangeAt(0);
                }
            }
            // 保存选中区域
            var saveSelection = function () {
                selectedRange = getCurrentRange();
                $self._cacheComData('info', comText.html());
            }
            // 重新选中之前选择区域
            var restoreSelection = function () {
                var selection = window.getSelection();
                if (selectedRange) {
                    removeSelection();
                    selection.addRange(selectedRange);
                }
            }
            // 重新选中之前选择区域
            var removeSelection = function () {
                try {
                    var selection = window.getSelection();
                    selection.removeAllRanges();
                } catch (ex) {
                    document.body.createTextRange().select();
                    document.selection.empty();
                }
            }
            //显示Bar
            var showBar = function (item) {
                var barList = $self.$comBar.txtToolBar.find('div:first').children();
                switch (comType) {
                    case COMPONENTTYPE.TEXT:
                        $(barList[5]).show();
                        $(barList[6]).show();
                        break;
                }
                var pos = item.offset();
                $self.$comBar.txtToolBar.css({'left': pos.left, 'top': pos.top - $self.$comBar.txtToolBar.outerHeight()}).show();
            }
            //初始化Bar上的按钮事件
            var initBarEvent = function () {
                $self.$comBar.txtToolBar.find('a[data-type]').click(function (event) {
                    restoreSelection();
                    execCommand($(this).attr('data-type'));
                    saveSelection();
                    comText.focus();
                    event.stopPropagation();
                });
//                $self.$comBar.txtToolBar.mouseover(function () {
//                    $self.options.editing = true;
//                });
            }
            if (this.$comBar.txtToolBar == null) {
                initToolBar();
                this.$comBar.txtToolBar = toolBar;
                this.$comBar.txtToolBar.on('click', function () {
                    comText.focus();
                    return false;
                });
//                this.$comBar.txtToolBar.mousedown(function (event) {
//                    event.stopPropagation();
//                });
                this.$body.append(this.$comBar.txtToolBar);
                var colorBox = this.$comBar.txtToolBar.find('.menu-sub:first');
                var colorMenu = this.$comBar.txtToolBar.find('.menu-down:first');
                colorMenu.hover(function () {
                    colorBox.show();
                }, function () {
                    colorBox.hide();
                });
                //颜色
                this.$textColorBox = new dhtmlXColorPicker({parent: 'textCP', closeable: false, cancel: false, color: '#01ef48', conf: {lang: 'cn'}});
                this.$textColorBox.attachEvent('onSelect', function (color) {
                    colorBox.hide();
                    restoreSelection();
                    execCommand('forecolor', color);
                    saveSelection();
                    comText.focus();
                    return false;
                });
                this.$textColorBox.attachEvent('onCancel', function () {
                    colorBox.hide();
                });
            }
            $self._clearFun();
            //绑定组件事件
            com.click(function () {
                comText.focus();
                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                $self.saveComID = $(this).attr('data-id');
                if (comText.attr('data-empty') == 1)
                    comText.html('');
                comText.noteTxt({'saveFun': function () {
                        var txt = comText.html();
                        comText.attr('data-empty', $.isEmpty(txt) ? 1 : 0)
                        $self._cacheComData('info', txt);
                    }});
                comText.off('keyup').on('keyup', function () {
                    var txt = $(this).html();
                    $(this).attr('data-empty', $.isEmpty(txt) ? 1 : 0)
                    $self._cacheComData('info', txt);
                });
//                comText.attr('contenteditable', true).focus();
//                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
//                    return false;
//                $self._clearFun();
//                // $self.options.editing=true;
//                $self.$curCom = $(this);
//                $self.saveComID = $(this).attr('data-id');
//                if (comText.text() == '点击编辑文本')
//                    comText.html('');
//                selectedRange = null;
//                if (!$.isEmpty(getCurrentRange()))
//                    removeSelection();
//                initBarEvent();
//                showBar($(this));
                return false;
            });
        },
        //编辑器共公方法
        _initBaseWinBar: function ($self, curCom, comBar, comType, subComType, bindFun, selectFun) {
            var bar = null;
            this.saveComID = curCom.attr('data-id');
            var initbar = function () {
                if (comBar == null) {
                    bar = $('<div></div>', {class: 'pop-down-b pop-down-gray-b line-pop-b'});
                    //加载编辑器
                    $self._getBarHtml(bar, comType, subComType, function (curBar) {
                        bar = curBar;
                        if (comType == COMPONENTTYPE.SLIDESHOW && subComType != null) {
                            $self.$topBody.append(bar);
                        } else {
                            $self.$body.append(bar);
                        }
                        createBar();
                    });
                } else {
                    bar = comBar;
                    createBar();
                }
                bar.off('click').on('click', function () {
                    var allSelectOption = $(this).find('.select-option');
                    allSelectOption.slideUp();
                    $(this).find('.select-icon').removeClass('select-down');
                    return false;
                });
                return bar;
            }
            //创建
            var createBar = function () {
                var slideList = bar.find('.slide-list li[data-tab]');
                var slidePop = bar.find('.pop-div-w250').hide();
                var comInner = curCom.find('.w-edit-com:first');
                var comConfig = $self._getComConfig();
                slideList.each(function () {
                    $(this).off('click').on('click', function () {
                        slidePop.hide();
                        $(slidePop[slideList.index($(this))]).show();
                    });
                });
                //链接
                var linkList = bar.find('li[data-type=com-link]');
                if (linkList.length > 0) {
                    var linkType = 0;
                    var radioList = linkList.find('input[type=radio]');
                    var openLink = $(linkList[0]).find('label[data-type=link-open]');
                    if (subComType == null) {
                        if (comConfig && comConfig['link-type']) {
                            linkType = parseInt(comConfig['link-type']);
                        }
                    }
                    $(radioList[linkType]).prop('checked', true);
//                    radioList.each(function(index, item){
//                        $(this).click(function(){
//                            alert(index);
//                             return false;
//                        });
//                    });
                    //单选
                    linkList.each(function (index, item) {
                        $(this).off('click').on('click', function () {
                            $(this).find('input[type=radio]').prop('checked', true);
                            if (subComType == null)
                                $self._cacheComConfig('link-type', $(this).attr('data-value'));
                            return false;
                        });
                    });
                    openLink.find('input').removeClass('checked');
                    openLink.off('click').on('click', function () {
                        var value = 0;
                        var checkbox = $(this).find('input');
                        if (!checkbox.hasClass('checked'))
                            value = 1;
                        checkbox.toggleClass('checked')
                        if (subComType == null)
                            $self._cacheComConfig('link-open', value);
                    });
                    if (comConfig && comConfig['link-open']) {
                        if (comConfig['link-open'] == 1)
                            openLink.find('input').addClass('checked');
                    }
                    var linkUrl = $(linkList[0]).find('input[data-type=link-url]');
                    linkUrl.off('keyup').on('keyup', function () {
                        if (subComType == null)
                            $self._cacheComConfig('link-url', $(this).val());
                    });
                    linkUrl.val('');
                    if (comConfig && comConfig['link-url']) {
                        linkUrl.val(comConfig['link-url']);
                    }
                    var createMenuList = function (parentID, index) {
                        var temHtml = '';
                        for (var i = 0; i < SITEMENUS.length; i++) {
                            if (SITEMENUS[i].parent_id == parentID) {
                                if (SITEMENUS[i].type != 4) {
                                    temHtml += '<div data-value="' + SITEMENUS[i].id + '"><span>' + getNbsp(index) + SITEMENUS[i].name + '</span></div>';
                                    temHtml += createMenuList(SITEMENUS[i].id, index + 1);
                                }
                            }
                        }
                        return temHtml;
                    }
                    var getNbsp = function (index) {
                        if (index == 1)
                            return '';
                        var item = '';
                        for (var i = 1; i < index; i++) {
                            item += '&nbsp;&nbsp;';
                        }
                        return item + '-&nbsp;';
                    }
                    var curItem = $(linkList[1]).find('div[data-type=inner-link]');
                    curItem.attr('data-value', '').text('无');
                    var itemList = $(linkList[1]).find('div[data-type=link-item]');
                    itemList.html('<div data-value=""><span>无</span></div>');
                    if (SITEMENUS != null) {
                        itemList.append(createMenuList(0, 1));
                    }
                }

                //绑定下拉菜单
                bindSelectMenu(comInner, comConfig, function (type, typevalue, value) {
                    //内链接
                    if (type == 'inner-link' && subComType == null) {
                        $(linkList[1]).find('input[type=radio]').prop('checked', true);
                        $self._cacheComConfig('link-type', 1);
                        $self._cacheComConfig('link-menuid', value);
                    }
                    if (typeof selectFun == 'function') {
                        selectFun(type, typevalue, value);
                    }
                });
                if (typeof bindFun == 'function') {
                    bindFun(bar, comInner, comConfig);
                }
                if (subComType == null) {
                    showBar();
                    //  if ($self.barTime)
                    // clearInterval($self.barTime);
                    //  $self.barTime = setInterval(showBar, 50);
                }
            }
            //绑定下拉菜单
            var bindSelectMenu = function (comInner, comConfig, callFun) {
                var selectsMenu = bar.find('div.select-box');
                var allSelectOption = bar.find('.select-option');
                var allSelectIcon = bar.find('.select-icon');
                selectsMenu.each(function () {
                    var curMenu = $(this);
                    var curIndex = selectsMenu.index(curMenu);
                    curMenu.parent().parent().css({'z-index': 999 - curIndex});
                    curMenu.css({'z-index': 999 - curIndex, 'position': 'relative'});
                    var selectedBox = curMenu.find('.select-dt:first');
                    var selectedBoxVal = selectedBox.find('.selected:first');
                    var selectedBoxIcon = selectedBox.find('.select-icon:first');
                    var selectBox = curMenu.find('.select-option:first');
                    var selectBoxList = selectBox.children();
                    //绑定数据
                    var selectType = selectedBoxVal.attr('data-style');
                    if (selectType && !$.isEmpty(selectType)) {
                        // if (selectType == 'com-css') {
                        var selectStyle = selectedBoxVal.attr('data-style');
                        var curValue = $(selectBoxList[0]).attr('data-value');
                        var curText = $(selectBoxList[0]).text();
                        if (selectedBoxVal.attr('data-default')) {
                            curValue = selectedBoxVal.attr('data-default');
                        }
                        if (comConfig != null && comConfig[selectStyle]) {
                            curValue = comConfig[selectStyle];
                        }
                        selectedBoxVal.attr('data-value', curValue);
                        $.each(selectBoxList, function () {
                            if ($(this).attr('data-value') == curValue) {
                                selectedBoxVal.html($(this).text());
                                return false;
                            }
                        });
                        // }
                    }
                    //绑定事件
                    selectBox.hide();
                    selectedBox.off('click').on('click', function () {
                        if (!selectedBoxIcon.hasClass('select-down')) {
                            allSelectOption.slideUp();
                            allSelectIcon.removeClass('select-down');
                            selectedBoxIcon.addClass('select-down');
                            selectBox.slideDown();
                        } else {
                            //allSelectOption.slideDown();
                            selectedBoxIcon.removeClass('select-down');
                            selectBox.slideUp();
                        }
                        return false;
                    });
                    selectBoxList.off('click').on('click', function () {
                        selectedBoxVal.attr('data-value', $(this).attr('data-value')).text($(this).text());
                        selectBox.slideUp();
                        selectedBoxIcon.removeClass('select-down');
                        var type = selectedBoxVal.attr('data-type');
                        var value = $(this).attr('data-value');
                        var style = selectedBoxVal.attr('data-style');
                        if (comInner != null) {
                            //样式类型
                            if (type == 'com-css') {
                                if (style == 'padding-top' || style == 'padding-bottom' || style == 'padding-left' || style == 'padding-right')
                                    value = value + 'px';
                                comInner.css(style, value);
                                $self._cacheComConfig(style, $(this).attr('data-value'));
                            }
                        }
                        if (typeof callFun == 'function') {
                            callFun(type, style, value);
                        }
                        return false;
                    });
                });
            }
            //显示
            var showBar = function () {
                var pos = curCom.offset();
                // var scrollTop = $self.$body.scrollTop();
                bar.show().css({'left': pos.left, 'top': (pos.top - bar.outerHeight() - 5)});
            }
            return initbar();
        },
        //上传图片弹出窗公共方法
        _initUpImgWin: function (curCom, callFun) {
            var me = this;
            //设置图片
            var setImg = function (resID, path, type) {
                var comInner = curCom.find('div.w-edit-com:first');
                if (type == me.upImgType.UP)
                    path = HOSTCONFIG.WEB_URL + path;
                if (typeof callFun == 'function') {
                    callFun(comInner, resID, path, type);
                }
            }
            //请求页面
            var showImgWin = function () {
                var url = me.options.jsurl + "/bar/up_image_win.html";
                var win = $('<div></div>');
                top.$.Loading();
                win.load(url + '?t=' + $.getTimeStamp(), null, function (response, status, xhr) {
                    top.$.UnLoading();
                    top.$.WinDialog(win, function (winDialog, winBox) {
                        win.find('.images-pop-menu li[data-tab]').click(function () {
                            $(this).siblings().removeClass('cur');
                            $(this).addClass('cur');
                            var data = $(this).attr('data-tab');
                            win.find("div[id^='imagesFrom']").hide();
                            win.find("#imagesFrom" + data).show();
                        });
                        top.$.onUpload({
                            pick: {'id': '#imageUpImg', 'label': '请选择您要上传的图片', 'multiple': false},
                            dnd: '#imageDragBox',
                            disableGlobalDnd: false
                        }, {
                            'uploadStart': function () {
                                winBox.remove();
                                winDialog.remove();
                            },
                            'uploadFinished': function () {
                                me._initUpLoading(0);
                            },
                            'uploadProgress': function (file, percentage) {
                                me._initUpLoading(percentage * 100);
                            },
                            'uploadSuccess': function (file, response) {
                                if (response.state == 'SUCCESS') {
                                    setImg(response.id, response.url, me.upImgType.UP);
                                } else {
                                    top.$.ShowResultMag('上传失败。', false);
                                }
                            }
                        });
                        top.$('#comImageSearch').click(function () {
                            var imgPath = $.trim(top.$('#comImageSearchUrl').val());
                            if ($.isEmpty(imgPath)) {
                                top.$.ShowResultMag('请输入图片路径。', false);
                                return false;
                            }
                            if (!$.isImgUrl(imgPath)) {
                                top.$.ShowResultMag('请输入正确的图片路径。', false);
                                return false;
                            }
                            setImg(0, imgPath, me.upImgType.LINK);
                            winBox.remove();
                            winDialog.remove();
                        });
                    });
                });
            }
            showImgWin();
        },
        //上传文件弹出窗公共方法
        _initUpFileWin: function (curCom, fileType, callFun) {
            var me = this;
            //设置图片
            var setFile = function (resID, path, name) {
                var comInner = curCom.find('div.w-edit-com:first');
                path = HOSTCONFIG.WEB_URL + path;
                if (typeof callFun == 'function') {
                    callFun(comInner, resID, path, name);
                }
            }
            //请求页面
            var showFileWin = function () {
                var url = me.options.jsurl;
                if (fileType == UPFILETYPE.FLASH) {
                    url += '/bar/up_flash_win.html';
                } else {
                    url += '/bar/up_file_win.html';
                }
                var win = $('<div></div>');
                top.$.Loading();
                win.load(url + '?t=' + $.getTimeStamp(), null, function (response, status, xhr) {
                    top.$.UnLoading();
                    top.$.WinDialog(win, function (winDialog, winBox) {
                        var comAccept = {
                            title: 'File',
                            extensions: (fileType == UPFILETYPE.FLASH ? 'swf' : 'pdf,xla,xls,xlsx,xlt,xlw,doc,docx,rar,zip,txt'),
                            mimeTypes: '*'
                        };
                        var serverUrl = '/upload/uploadfile';
                        if (fileType == UPFILETYPE.FLASH)
                            serverUrl = '/upload/uploadflash';
                        var fileName = (fileType == UPFILETYPE.FLASH ? '请选择您要上传的Flash' : '请选择您要上传的文件');
                        top.$.onUpload({
                            pick: {'id': '#comFileUp', 'label': fileName, 'multiple': false},
                            server: serverUrl,
                            dnd: '#comFileDragBox',
                            accept: comAccept,
                            disableGlobalDnd: false
                        }, {
                            'uploadStart': function () {
                                winBox.remove();
                                winDialog.remove();
                            },
                            'uploadFinished': function () {
                                me._initUpLoading(0);
                            },
                            'uploadProgress': function (file, percentage) {
                                me._initUpLoading(percentage * 100);
                            },
                            'uploadSuccess': function (file, response) {
                                if (response.state == 'SUCCESS') {
                                    setFile(response.id, response.url, response.original);
                                } else {
                                    top.$.ShowResultMag('上传失败。', false);
                                }
                            }
                        });
                    });
                });
            }
            showFileWin();
        },
        //富文本
        _initRichTextBar: function ($self, com) {
            var ue = null;
            var initRichTextBar = function (curCom) {
                var url = $self.options.jsurl + "/bar/rich_text.html";
                var win = $('<div></div>');
                $self.saveComID = curCom.attr('data-id');
                top.$.Loading();
                win.load(url + '?t=' + $.getTimeStamp(), null, function (response, status, xhr) {
                    top.$.UnLoading();
                    top.$.WinDialog(win, function (winDialog, winBox) {
                        var btnSave = win.find('div.pop-edit-btns-b:first');
                        var comData = $self._getCacheComData(curCom.attr('data-id'));
                        //富文本初始化
                        ue = top.UE.getEditor('comRichTextControl');
                        ue.addListener("ready", function () {
                            ue.setContent(comData['info'] ? comData['info'] : '');
                            btnSave.show();
                        });
                        //提交
                        btnSave.click(function () {
                            var ueInfo = ue.getContent();
                            $self._cacheComData('info', ueInfo);
                            curCom.find('div.w-text:first').html(ueInfo);
                            ue = null;
                            top.UE.getEditor('comRichTextControl').destroy();
                            winDialog.remove();
                            winBox.remove();
                        });

                    }, function () {
                        ue = null;
                        top.UE.getEditor('comRichTextControl').destroy();
                    })
                });
            }
            $self._clearFun();
            com.on('click', function () {
                if ($self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                initRichTextBar($(this));
                return false;
            });
        },
        //按钮组件编辑初始化
        _initButtonBar: function ($self, com) {
            var initButtonBar = function (curCom) {
                $self.$comBar.buttonBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.buttonBar,
                        COMPONENTTYPE.BUTTON,
                        null,
                        function (bar, comInner, comConfig) {
                            createButtonBar(bar, curCom, comInner, comConfig);
                        });
            }

            //创建
            var createButtonBar = function (bar, curCom, comInner, comConfig) {
                var curButton = comInner.children().eq(0);
                //改变按钮文字
                curButton.off('keyup').on('keyup', function () {
                    $self._cacheComData('name', $(this).text());
                })
                //按钮样式
                var styleList = bar.find('div.btn-style-b');
                styleList.each(function () {
                    $(this).off('click').on('click', function () {
                        curButton.attr('class', $(this).attr('data-class'));
                        $self._cacheComConfig('button-css', $(this).attr('data-value'));
                    });
                });
                //按钮位置
                var alignList = bar.find('span.btn-gray-black-b');
                alignList.removeClass('btn-cur');
                if (comConfig != null && comConfig['text-align']) {
                    bar.find('span.btn-gray-black-b[data-align=' + comConfig['text-align'] + ']').addClass('btn-cur');
                } else {
                    $(alignList[0]).addClass('btn-cur');
                }

                alignList.each(function () {
                    $(this).off('click').on('click', function () {
                        alignList.removeClass('btn-cur');
                        $(this).addClass('btn-cur');
                        comInner.css('text-align', $(this).attr('data-align'));
                        $self._cacheComConfig('text-align', $(this).attr('data-align'));
                    });
                });
                $('#buttonBar_IsOpen').off('click').on('click', function () {
                    if ($(this).hasClass('checked')) {
                        $(this).removeClass('checked');
                    } else {
                        $(this).addClass('checked');
                    }
                });
                curButton.attr('contenteditable', 'true').focus();
            }
            $self._clearFun();
            com.on('click', function () {
                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                initButtonBar($(this));
                return false;
            });
        },
        //分隔线编辑器初始化
        _initDividerBar: function ($self, com) {
            var initDividerBar = function (curCom) {
                $self.$comBar.dividerBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.dividerBar,
                        COMPONENTTYPE.DIVIDER,
                        null,
                        function (bar, comInner, comConfig) {
                            createDividerBar(bar, curCom, comInner, comConfig);
                        }, function (type, typevalue, value) {
                    var comInner = curCom.find('div.w-edit-com');
                    if (type == 'hr-css') {
                        if (typevalue == 'width') {
                            comInner.find('hr').css('width', value);
                            $self._cacheComConfig('width', value);
                        }
                    }
                });
            }
            //创建
            var createDividerBar = function (bar, curCom, comInner, comConfig) {
                var comInfo = $self._getComInfo();
                var slideList = bar.find('.slide-list li[data-tab]');
                var slidePop = bar.find('.pop-div-w250');
                var radioList = slideList.find('input[type=radio]');
                if (comConfig) {
                    if (comConfig['type']) {
                        if (comConfig['type'] == 1) {
                            $(radioList[0]).prop('checked', true);
                        } else {
                            $(radioList[1]).prop('checked', true);
                        }
                    }
                }
                //模
                var widthInput = bar.find('div[data-style=width]');
                slideList.eq(2).off('click').on('click', function () {
                    $(radioList[0]).prop('checked', true);
                    $(radioList[1]).prop('checked', false);
                    comInner.removeClass('w-delimiters-ver').addClass('w-delimiters-hor');
                    comInner.css({'padding-left': '0px', 'padding-right': '0px'});
                    comInner.find('hr').css({'magrin': '0 auto', 'height': '1px', 'width': widthInput.attr('data-value')});
                    slidePop.hide();
                    slidePop.eq(2).show();
                    $self._cacheComConfig('type', 1);
                    return false;
                });
                //竖
                var verType = slideList.eq(3);
                var txtHeight = bar.find('input[data-style=height]');
                var leftInput = bar.find('input[data-style=padding-left]');
                var rightInput = bar.find('input[data-style=padding-right]');
                verType.off('click').on('click', function () {
                    $(radioList[0]).prop('checked', false);
                    $(radioList[1]).prop('checked', true);
                    comInner.removeClass('w-delimiters-hor').addClass('w-delimiters-ver');
                    comInner.css({'padding-left': leftInput + 'px', 'padding-right': rightInput + 'px'});
                    //comInner.css({'magrin': '0 auto','height': 'auto'});
                    comInner.find('hr').css({'height': (txtHeight.val() > 0 ? txtHeight.val() : 100) + 'px', 'width': '1px', 'magrin': '0 auto'});
                    slidePop.hide();
                    slidePop.eq(3).show();
                    $self._cacheComConfig('type', 2);
                    return false;
                });
                //竖的样式
                if (comConfig && comConfig['height'])
                    txtHeight.val(comConfig['height']);
                txtHeight.unbind('keyup').keyup(function () {
                    var typeValue = $(this).val();
                    var temHeight = 100;
                    if (!$.isEmpty(typeValue)) {
                        if (typeValue > 0) {
                            temHeight = typeValue;
                        } else {
                            $(this).val(temHeight);
                        }
                    }
                    comInner.find('hr').css('height', temHeight + 'px');
                    $self._cacheComConfig('height', temHeight);
                });
                //颜色
                $self.$colorBox = new dhtmlXColorPicker({parent: 'dividerCP', closeable: false, color: '#01ef48'});
                $self.$colorBox.attachEvent('onSelect', function (color) {
                    $self._cacheComConfig('background-color', color);
                    comInner.find('hr').css('background', color);
                    slidePop.eq(0).hide();
                });
                $self.$colorBox.attachEvent('onCancel', function () {
                    slidePop.eq(0).hide();
                });
            }
            $self._clearFun();
            com.click(function () {
                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                initDividerBar($(this));
                return false;
            });
        },
        //Space组件编辑初始化
        _initSpacerBar: function ($self, com) {
            var bar = com.find('.w-edit-com');
            var barBtn = com.find('.stretch-b');
            var oldHeight = 0;
            com.on('click', function () {
                $self.CloseAll();
            });
            //拖拉事件
            var moveFun = function () {
                $self.$doc.off('mousemove mouseup');
                $self.$doc.on('mousemove', function (event) {
                    var pos = com.offset();
                    var height = event.pageY - pos.top;
                    if (height < 20)
                        height = 20;
                    bar.height(height);
                }).on('mouseup', moveEnd);
                // $self.docTime = setTimeout(moveFun, 50);
            };
            //拖拉结束
            var moveEnd = function () {
                $self.$doc.off('mousemove mouseup');
                if ($self.docTime != null) {
                    clearInterval($self.docTime);
                    $self.docTime = null;
                }
                $self.saveComID = com.attr('data-id');
                $self._cacheComData('config', '{"height":"' + bar.height() + '"}');
                //   $self.SaveCom();
                barBtn.off('mouseup');
                // $self.options.editing = false;
            };
            barBtn.on('mousedown', function (event) {
                if ($self.options.disable)
                    return false;
                $self.CloseAll();
                moveFun();
                $(this).on('mouseup', moveEnd);
            });
        },
        //搜索组件编辑器初始化
        _initSearchBar: function ($self, com) {
            var initSearchBar = function (curCom) {
                $self.$comBar.searchBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.searchBar,
                        COMPONENTTYPE.SEARCH,
                        null,
                        function (bar, comInner, comConfig) {
                            createSearchBar(bar, curCom, comInner, comConfig);
                        });
            }
            //创建
            var createSearchBar = function (bar, curCom, comInner, comConfig) {
                var comInfo = $self._getComInfo();
                //设置提示文字
                var txtPlaceholder = $('input.input-text-b');
                if (comInfo['name'] && $.isEmpty(comInfo['name']))
                    txtPlaceholder.val(comInfo['name']);
                txtPlaceholder.unbind('keyup').keyup(function () {
                    var txt = $(this).val();
                    if (!$.isEmpty(txt)) {
                        comInner.find('input.input-text-w').attr('placeholder', txt);
                    } else {
                        comInner.find('input.input-text-w').attr('placeholder', 'search text');
                    }
                    $self._cacheComData('name', txt);
                });
                //位置
                var alignList = bar.find('span.btn-gray-black-b');
                alignList.removeClass('btn-cur');
                if (comConfig != null && comConfig['text-align']) {
                    bar.find('span.btn-gray-black-b[data-align=' + comConfig['text-align'] + ']').addClass('btn-cur');
                } else {
                    $(alignList[0]).addClass('btn-cur');
                }
                alignList.each(function () {
                    $(this).unbind('click').click(function () {
                        alignList.removeClass('btn-cur');
                        $(this).addClass('btn-cur');
                        comInner.css('text-align', $(this).attr('data-align'));
                        $self._cacheComConfig('text-align', $(this).attr('data-align'));
                    });
                });
            }
            $self._clearFun();
            com.click(function () {
                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                initSearchBar($(this));
                return false;
            });
        },
        //图片组件编辑器初始化
        _initImageBar: function ($self, com) {
            var isEmpty = false;
            var initImageBar = function (curCom) {
                $self.$comBar.imageBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.imageBar,
                        COMPONENTTYPE.IMAGE,
                        null,
                        function (bar, comInner, comConfig) {
                            createImageBar(bar, curCom, comInner, comConfig);
                        },
                        function (type, style, value) {
                            //border设置
                            var comInner = curCom.find('div.w-edit-com');
                            var borderColor = $self.$comBar.imageBar.find('div[data-type="border-color-class"]');
                            if (type == 'border-class') {
                                comInner.attr('class', 'w-edit-com w-simImg');
                                if (value != '') {
                                    comInner.addClass(value).addClass(borderColor.attr('data-value'));
                                }
                                $self._cacheComConfig('border-class', value);
                            }
                            if (type == 'border-color-class') {
                                comInner.removeClass('w-img-border-gray').removeClass('w-img-border-black');
                                comInner.addClass(value);
                                $self._cacheComConfig('border-color-class', value);
                            }
                        });
            }
            //创建
            var createImageBar = function (bar, curCom, comInner, comConfig) {
                var comData = $self._getComInfo();
                //上传按钮
                var upBtn = bar.find('input[type="button"]');
                upBtn.unbind('click').click(function () {
                    initUpWin(curCom);
                });
                //图片位置
                var alignList = bar.find('span.btn-gray-black-b');
                alignList.removeClass('btn-cur');
                if (comConfig != null && comConfig['text-align']) {
                    bar.find('span.btn-gray-black-b[data-align=' + comConfig['text-align'] + ']').addClass('btn-cur');
                } else {
                    $(alignList[0]).addClass('btn-cur');
                }
                alignList.each(function () {
                    $(this).unbind('click').click(function () {
                        alignList.removeClass('btn-cur');
                        $(this).addClass('btn-cur');
                        comInner.css('text-align', $(this).attr('data-align'));
                        $self._cacheComConfig('text-align', $(this).attr('data-align'));
                    });
                });
                //描述
                var textarea = bar.find('textarea.pop-textarea-b');
                if (comData['info'])
                    textarea.val(comData['info']);
                textarea.unbind('keyup').keyup(function () {
                    var imgCaption = comInner.find('div.w-img-caption');
                    var itemValue = $(this).val();
                    if ($.isEmpty(itemValue) && imgCaption.length == 1) {
                        imgCaption.remove();
                    } else if (imgCaption.length == 1) {
                        imgCaption.html(itemValue);
                    } else if (imgCaption.length == 0) {
                        comInner.append($('<div></div>', {class: 'w-img-caption'}).html(itemValue));
                    }
                    $self._cacheComData('info', $(this).val());
                });
                //alt
                var inputAlt = bar.find('input[data-type=name]');
                inputAlt.val(comData['name']);
                inputAlt.unbind('keyup').keyup(function () {
                    curCom.find('.image-w img').attr('alt', $(this).val());
                    $self._cacheComData('name', $(this).val());
                });
                //lightbox
                var lightbox = 0;
                if (comConfig && comConfig['lightbox']) {
                    lightbox = comConfig['lightbox'];
                }
                var checkbox = bar.find('input[data-type=lightboxinput]');
                checkbox.removeClass('checked');
                if (lightbox == 1)
                    checkbox.addClass('checked');
                bar.find('label[data-type=lightbox]').off('click').on('click', function () {
                    var value = 0;
                    if (checkbox.hasClass('checked')) {
                        checkbox.removeClass('checked');
                    } else {
                        checkbox.addClass('checked');
                        value = 1;
                    }
                    $self._cacheComConfig('lightbox', value);
                });
            }
            //上传图片窗口
            var initUpWin = function (curCom) {
                $self._initUpImgWin(curCom, function (comInner, resID, path, type) {
                    var empty = comInner.find('div.image-empty');
                    if (empty.length == 0) {
                        comInner.find('img').attr('src', path);
                    } else if (empty.length > 0) {
                        var temImg = $('<div style="cursor:pointer"><div class="image-w"><a><img src="' + path + '"></a></div></div>');
                        comInner.append(temImg);
                        empty.remove();
                    }
                    $self._cacheComData('resource_id', (resID > 0 ? resID : ''));
                    if (type == $self.upImgType.UP) {
                        $self._cacheComData('link', '');
                    } else if (type == $self.upImgType.LINK) {
                        $self._cacheComData('link', path);
                    }
                    // $self.SaveCom();
                    if (isEmpty)
                        $self.saveComID = 0;
                })
            }

            com.click(function () {
                if ($self.options.disable)
                    return false;
                if ($(this).find('.w-edit-com .image-empty:first').length == 0) {
                    if ($self.saveComID == $(this).attr('data-id'))
                        return false;
                    isEmpty = false;
                    $self.$curCom = $(this);
                    $self._clearFun();
                    initImageBar($(this));
                } else {
                    $self.$curCom = $(this);
                    $self.saveComID = $self.$curCom.attr('data-id');
                    isEmpty = true;
                    initUpWin($(this));
                }
                return false;
            });
        },
        //图集组件编辑器初始化
        _initGalleryBar: function ($self, com) {
            var column = 2;
            var cropping = 0;
            var columnWidth = 0;
            var columnHeight = 0;
            var imgMargin = 0;
            var imgPadding = 0;
            var pageWidth = 0;
            var isEmpty = false;
            var initGalleryBar = function (curCom) {
                $self.$comBar.galleryBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.galleryBar,
                        COMPONENTTYPE.GALLERY,
                        null,
                        function (bar, comInner, comConfig) {
                            createGalleryBar(bar, curCom, comInner, comConfig);
                        },
                        function (type, style, value) {
                            closeImgEdit(curCom);
                            //图片样式
                            if (type == 'img-css') {
                                var imgList = curCom.find('div.gallery-mar');
                                imgList.css(style, value + "px");
                                imgMargin = value;
                                resetImageList(curCom);
                                $self._cacheComConfig(style, value);
                            }
                            //图片列数
                            if (type == 'img-column') {
                                var imgBoxs = curCom.find('li');
                                imgBoxs.css(style, (100 / value) + "%");
                                column = value;
                                resetImageList(curCom);
                                $self._cacheComConfig('column', value);
                            }
                            //lightbox
//                            if (type == 'lightbox') {
//                                var thumbnailsPanel = $self.$comBar.galleryBar.find('div[data-type=thumbnails-panel]');
//                                if (value == 1) {
//                                    thumbnailsPanel.hide();
//                                } else {
//                                    thumbnailsPanel.show();
//                                }
//                                $self._cacheComConfig('lightbox', value);
//                            }

                            //thumbnail
                            if (type == 'thumbnail') {
                                $self._cacheComConfig('thumbnail', value);
                            }

                            //边框样式
                            if (type == 'img-padding') {
                                // setImgsPadding(value);
                                imgPadding = value;
                                resetImageList(curCom);
                                $self._cacheComConfig('img-padding', value);
                            }

                            //cropping
                            if (type == 'cropping') {
                                if (value != cropping) {
                                    cropping = value;
                                    resetImageList(curCom);
                                }
                                $self._cacheComConfig('cropping', value);
                            }

                        });
            }
            //重置效果
            var resetImageList = function (curCom) {
                var imgList = curCom.find('.gallery-img-in img');
                var outerList = curCom.find('.gallery-border');
                var outerPadding = curCom.find('.gallery-aspectRatio');
                imgList.css({'padding': 0, 'border-width': 0});
                outerList.css({'padding': 0, 'border-width': 0});
                if (cropping == 0) {
                    imgList.css('padding', imgPadding);
                    if (imgPadding > 0)
                        imgList.css('border-width', '1px');
                } else {
                    outerList.css('padding', imgPadding);
                    if (imgPadding > 0)
                        outerList.css('border-width', '1px');
                }

                if (cropping == 0 || cropping == 2) {
                    outerPadding.css('padding', '0 0 75%');
                } else {
                    outerPadding.css('padding', '0 0 100%');
                }
                columnWidth = curCom.find('.multi-imgs li:first').width();//pageWidth / column;
                columnHeight = curCom.find('.multi-imgs li:first').height();
                setImgWidth(curCom, cropping, column, imgPadding, imgMargin, columnWidth, columnHeight);
            }

            //创建
            var createGalleryBar = function (bar, curCom, comInner, comConfig) {
                var comData = $self._getComInfo();
                pageWidth = curCom.width();
                if (comConfig) {
                    if (comConfig['cropping']) {
                        cropping = parseInt(comConfig['cropping']);
                    }
                    if (comConfig['column']) {
                        column = parseInt(comConfig['column']);
                    }
                    if (comConfig['margin']) {
                        imgMargin = parseInt(comConfig['margin']);
                    }
                }
                columnWidth = pageWidth / column;
                columnHeight = curCom.find('.multi-imgs li:first').height();
                curCom.find('.gallery-tool-b').show();
                curCom.find('span.glyphicon').removeClass('edited');
                bar.find('div[data-type=margin]').attr('data-value', imgMargin).html(imgMargin);
                //上传按钮
                var upBtn = bar.find('input[type="button"]');
                upBtn.unbind('click').click(function () {
                    initUpWin(curCom);
                });
                //hover
                var hover = 0;
                if (comConfig && comConfig['hover']) {
                    hover = comConfig['hover'];
                }
                var checkbox = bar.find('input[data-type=hoverinput]');
                checkbox.removeClass('checked');
                if (hover == 1)
                    checkbox.addClass('checked');
                bar.find('label[data-type=hover]').off('click').on('click', function () {
                    var value = 0;
                    if (checkbox.hasClass('checked')) {
                        checkbox.removeClass('checked');
                    } else {
                        checkbox.addClass('checked');
                        value = 1;
                    }
                    $self._cacheComConfig('hover', value);
                });
            }
            //上传图片窗口
            var initUpWin = function (curCom) {
                $self._initUpImgWin(curCom, function (comInner, resID, path, type) {
                    var empty = comInner.find('div.image-empty');
                    var temImg = $('<div></div>', {class: 'gallery-img'});
                    temImg.append('<div class="gallery-mar"><a class="fancybox-thumbs" href="javascript:void(0);"><div class="gallery-border"><div class="gallery-aspectRatio"><div class="gallery-img-in"><img style="top:0px;left:0px;" src="' + path + '"></div></div></div></a></div>');
                    var temImgBar = imgEditBar(curCom, temImg);
                    var temLi = $('<li></li>').append(temImg).append(temImgBar).css('width', (100 / column) + "%");
                    temLi.attr('data-resid', resID).attr({'data-name': '', 'data-linktype': '0', 'data-linkurl': '', 'data-linkopen': '0', 'data-linkmenuid': ''});
                    if (empty.length == 0) {
                        var imgBox = comInner.find('div.multi-imgs ul');
                        imgBox.append(temLi.append(temImgBar));
                    } else if (empty.length > 0) {
                        var temMulti = $('<div></div>', {class: 'multi-imgs'});
                        var temUL = $('<ul></ul>').append(temLi);
                        comInner.append(temMulti.append(temUL));
                        empty.remove();
                    }
                    getImagesData(curCom);
                    resetImageList(curCom);
                    $self.CloseAll();
                    //   $self.SaveCom();
                })
            }
            //单图编辑器
            var imgEditBar = function (curCom, curItem) {
                var tool = $('<div></div>', {class: 'gallery-tool-in-b'});
                var toolOuter = $('<div></div>', {class: 'gallery-tool-b'});
                var btnLink = $('<span title="新增链接" aria-hidden="true" class="glyphicon glyphicon-link"></span>');
                var btnCaption = $('<span title="新增说明" aria-hidden="true" class="glyphicon glyphicon-comment"></span>');
                var btnDel = $('<span title="删除图片" aria-hidden="true" class="glyphicon glyphicon-trash"></span>');
                //图片设置连接按钮
                btnLink.click(function (event) {
                    imgEditLink(curCom, curItem, $(this));
                    event.stopPropagation();
                });
                //图片设置说明按钮
                btnCaption.click(function (event) {
                    imgEditCaption(curCom, curItem, $(this));
                    event.stopPropagation();
                });
                //图片删除
                btnDel.click(function (event) {
                    tool.find('span').removeClass('edited');
                    btnDel.addClass('edited');
                    if (curCom.find('.multi-imgs li').length == 1) {
                        curCom.find('.w-edit-com').html('<div class="image-empty"><a><img src="/images/gallery-empty.png"></a></div>');
                        getImagesData(curCom);
                        $self.CloseAll();
                        $self.options.editing = false;
                    } else {
                        closeImgEdit(curCom);
                        btnDel.parents('li:first').remove();
                        getImagesData(curCom);
                    }

                    //$self.SaveCom();
                    event.stopPropagation();
                });
                tool.append(btnLink).append(btnCaption).append(btnDel);
                toolOuter.append(tool);
                return toolOuter;
            }
            //图片连接
            var imgEditLink = function (curCom, curItem, btn) {
                $self.$curCom = curCom;
                $self.$comBar.galleryLinkBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.galleryLinkBar,
                        COMPONENTTYPE.GALLERY,
                        1,
                        function (bar, comInner) {
                            closeImgEdit(curCom);
                            showImgEdit(btn, bar);
                            btn.addClass('edited');
                            var linkList = bar.find('li[data-type=com-link]');
                            var radioList = linkList.find('input[type=radio]');
                            var openLink = $(linkList[0]).find('input.checkboxnew');
                            var urlInput = bar.find('input[data-type=link-url]');
                            var btnDelLink = bar.find('span.btn-blackGray');
                            $(radioList[curItem.attr('data-linktype')]).prop('checked', true);
                            if (curItem.attr('data-linkopen') == 1) {
                                openLink.addClass('checked');
                            } else {
                                openLink.removeClass('checked');
                            }
                            urlInput.val(curItem.attr('data-linkurl'));
                            var innnerLink = bar.find('div[data-type=inner-link]');
                            if (!$.isEmpty(curItem.attr('data-linkmenuid'))) {
                                innnerLink.attr('data-value', curItem.attr('data-linkmenuid'));
                                innnerLink.html(bar.find('div.select-option').find('div[data-value=' + curItem.attr('data-linkmenuid') + ']').text());
                            } else {
                                innnerLink.attr('data-value', '').html('无');
                            }
                            btnDelLink.off('click').click(function () {
                                curItem.attr('data-linktype', '');
                                curItem.attr('data-linkurl', '');
                                curItem.attr('data-linkopen', 0);
                                curItem.attr('data-linkmenuid', '');
                                closeImgEdit(curCom);
                                getImagesData(curCom);
                                return false;
                            });
                            //提交
                            var btnSumbit = bar.find('span.btn-green-b');
                            btnSumbit.off('click').click(function () {
                                var linkType = 0;
                                if ($(radioList[1]).prop('checked'))
                                    linkType = 1;
                                curItem.attr('data-linktype', linkType);
                                curItem.attr('data-linkurl', urlInput.val());
                                curItem.attr('data-linkopen', openLink.hasClass('checked') ? 1 : 0);
                                curItem.attr('data-linkmenuid', bar.find('div[data-type=inner-link]').attr('data-value'));
                                closeImgEdit(curCom);
                                getImagesData(curCom);
                                return false;
                            });
                        }, null);
            }
            //图片标题
            var imgEditCaption = function (curCom, curItem, btn) {
                closeImgEdit(curCom);
                $self.$curCom = curCom;
                $self.$comBar.galleryCaptionBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.galleryCaptionBar,
                        COMPONENTTYPE.GALLERY,
                        2,
                        function (bar, comInner) {
                            var textarea = bar.find('textarea.pop-textarea-b:first');
                            var imgTxt = curItem.attr('data-name');
                            textarea.val(imgTxt);
                            //关闭
                            var btnClose = bar.find('span.btn-blackGray');
                            btnClose.unbind('click').click(function () {
                                closeImgEdit(curCom);
                                return false;
                            });
                            //提交
                            var btnSumbit = bar.find('span.btn-green-b');
                            btnSumbit.unbind('click').click(function () {
                                curItem.attr('data-name', textarea.val());
                                if ($.isEmpty(textarea.val())) {
                                    curItem.find('.gallery-caption').hide();
                                } else {
                                    curItem.find('.gallery-caption').show();
                                }
                                closeImgEdit(curCom);
                                getImagesData(curCom);
                                return false;
                            });
                            showImgEdit(btn, bar);
                            btn.addClass('edited');
                        });
            }
            var closeImgEdit = function (curCom) {
                curCom.find('.gallery-tool-in-b .glyphicon').removeClass('edited');
                if ($self.$comBar.galleryCaptionBar != null)
                    $self.$comBar.galleryCaptionBar.hide();
                if ($self.$comBar.galleryLinkBar != null)
                    $self.$comBar.galleryLinkBar.hide();
            }
            var showImgEdit = function (btn, imgBar) {
                var pos = btn.offset();
                imgBar.css({'left': pos.left - imgBar.outerWidth() / 2 + 10, 'top': pos.top + btn.outerHeight() + 5}).show();
            }
            //获取图片信息
            var getImagesData = function (curCom) {
                var temItems = [];
                curCom.find('.multi-imgs li').each(function () {
                    var item = $(this);
                    var temConfig = "{";
                    temConfig += '"link-type":"' + item.attr('data-linktype') + '",';
                    temConfig += '"link-url":"' + item.attr('data-linkurl') + '",';
                    temConfig += '"link-open":"' + item.attr('data-linkopen') + '",';
                    temConfig += '"link-menuid":"' + item.attr('data-linkmenuid') + '"}';
                    temItems[temItems.length] = {"name": item.attr('data-name'), "resource_id": item.attr('data-resid'), "config": temConfig};
                });
                $self._cacheComData('items', temItems);
            }
            //设置图片宽度
            var setImgWidth = function (curComInner, cropping, comColumn, imgPadding, imgMargin, columnWidth, columnHeight) {
                var imgList = curComInner.find('div.gallery-img-in img');
                var setImgCss = function (curImgItem) {
                    var imgWidth = curImgItem.width();
                    if (!(imgWidth > 0))
                        return false;
                    var imgHeight = curImgItem.height();
                    var widthThan = 100;
                    var leftThan = 0;
                    var topThan = 0;
                    //正常格式
                    if (cropping == 0) {
                        var temMargin = 0;
                        var tempadding = 0;
                        if (imgPadding > 0)
                            tempadding += (imgPadding + 1) * 2;
                        if (imgMargin > 0)
                            temMargin += imgMargin * 2;
                        var newColumnWidth = columnWidth - temMargin;
                        var newColumnHeight = columnHeight - temMargin;
                        if (imgWidth <= newColumnWidth && imgHeight <= newColumnHeight) {
                            widthThan = 'auto';
                            leftThan = (((columnWidth - imgWidth) / 2) / columnWidth) * 100;
                            topThan = (((columnHeight - imgHeight) / 2) / columnHeight) * 100;
                        } else {
                            if (imgHeight > newColumnHeight) {
                                imgWidth = (newColumnHeight / imgHeight) * imgWidth;
                                imgHeight = newColumnHeight;
                            }
                            if (imgWidth > columnWidth) {
                                imgHeight = (columnWidth / imgWidth) * imgHeight;
                                imgWidth = columnWidth;
                            }
                            widthThan = ((imgWidth / columnWidth) * 100) + '%';
                            leftThan = (((columnWidth - imgWidth) / 2) / columnWidth) * 100;
                            topThan = (((columnHeight - imgHeight) / 2) / columnHeight) * 100;
                        }
                        curImgItem.css({'width': widthThan, 'left': leftThan + '%', 'top': topThan + '%'});
                    } else {
                        //正方形和长方形
                        var temImgWidth = columnWidth - (imgPadding + 1) * 2;
                        var imgNewHeight = imgHeight * (temImgWidth / imgWidth);
                        if (imgNewHeight < columnHeight) {
                            imgWidth = (columnHeight / imgHeight) * imgWidth;
                            widthThan = (imgWidth / columnWidth) * 100;
                            leftThan = 0 - (((imgWidth - columnWidth) / 2) / columnWidth) * 100;
                        } else {
                            imgHeight = imgNewHeight;
                            topThan = 0 - ((((imgHeight - columnHeight) / 2) / columnHeight) * 100);
                        }
                        curImgItem.css({'width': widthThan + '%', 'left': leftThan + '%', 'top': topThan + '%'});
                    }
                }
                var imgLoad = function () {
                    var index = parseInt(this.index);
                    setImgCss($(imgList[index]));
                }
                for (var i = 0; i < imgList.length; i++) {
                    var temImg = $(imgList[i]);
                    temImg.css({'width': 'auto'});
                    var newImg = new Image;
                    newImg.onload = imgLoad;
                    newImg.src = temImg.attr('src');
                    newImg.index = i;
                }
            }
            //加载效果
            var initComData = function (curCom) {
                var comID = curCom.attr('data-id');
                var comData = $self._getComInfo(comID);
                var comConfig = $self._getComConfig(comID);
                var imgList = curCom.find('.multi-imgs img');
                if (imgList.length == 0)
                    return false;
                var paddingThan = 0.75;
                var comCropping = 0;
                var comColumn = 2;
                imgPadding = 0;
                pageWidth = curCom.width();
                if (comConfig) {
                    if (comConfig['cropping']) {
                        comCropping = parseInt(comConfig['cropping']);
                        if (comCropping == 1)
                            paddingThan = 100;
                    }
                    if (comConfig['column']) {
                        comColumn = parseInt(comConfig['column']);
                    }
                    if (comConfig['img-padding']) {
                        imgPadding = parseInt(comConfig['img-padding']);
                    }
                    if (comConfig['margin']) {
                        imgMargin = parseInt(comConfig['margin']);
                    }
                }
                columnWidth = pageWidth / comColumn;
                var imgPanelList = curCom.find('.multi-imgs li');
                columnHeight = $(imgPanelList[0]).height();
                setImgWidth(curCom, comCropping, comColumn, imgPadding, imgMargin, columnWidth, columnHeight);
                imgPanelList.each(function () {
                    if ($(this).find('div.gallery-tool-b').length == 0) {
                        var toolBar = imgEditBar(curCom, $(this));
                        toolBar.hide();
                        $(this).append(toolBar);
                    }
                });
            }
            initComData(com);
            com.click(function () {
                if ($self.options.disable)
                    return false;
                if ($(this).find('.w-edit-com .image-empty:first').length == 0) {
                    if ($self.saveComID == $(this).attr('data-id'))
                        return false;
                    $self._clearFun();
                    $self.$curCom = $(this);
                    isEmpty = false;
                    initGalleryBar($(this));
                } else {
                    $self.$curCom = $(this);
                    $self.saveComID = $self.$curCom.attr('data-id');
                    isEmpty = true;
                    initUpWin($(this));
                }
                return false;
            });
        },
        //幻灯组件编辑器初始化
        _initSlideShowBar: function ($self, com) {
            var win = $('<div></div>');
            var slideImagePanel = null;
            var comInner = null;
            var isEmpty = false;
            var closeAllWin = function () {
                if ($self.$comBar.slideLinkBar != null)
                    $self.$comBar.slideLinkBar.hide();
                if ($self.$comBar.slideCaptionBar != null)
                    $self.$comBar.slideCaptionBar.hide();
            }
            //设置界面
            var loadSetWin = function (curCom, type) {
                var url = $self.options.jsurl + "/bar/slide_images.html";
                comInner = curCom.find('.w-edit-com:first');
                var comSlideAddImg = function () {
                    //上传图片
                    top.$.onUpload({
                        pick: {'id': '#comSlideAddImg', 'label': '新增图片', 'multiple': false},
                    }, {'uploadStart': function () {
                            closeAllWin();
                        },
                        'uploadFinished': function () {
                            $self._initUpLoading(0);
                        },
                        'uploadProgress': function (file, percentage) {
                            $self._initUpLoading(percentage * 100);
                        },
                        'uploadSuccess': function (file, response) {
                            if (response.state == 'SUCCESS') {
                                setImg(curCom, response.id, response.url);
                            } else {
                                top.$.ShowResultMag('上传失败。', false);
                            }
                        }
                    });
                }
                top.$.Loading();
                win.load(url + '?t=' + $.getTimeStamp(), null, function (response, status, xhr) {
                    top.$.UnLoading();
                    if (status == "success") {
                        var selectList = win.find('.slide-select li');
                        selectList.each(function () {
                            $(this).click(function () {
                                selectList.removeClass('selected');
                                $(this).addClass('selected');
                            });
                        });

                        var styleWin = win.find('#slide_win_style');
                        var upWin = win.find('#slide_win_upimage');
                        var imagesWin = win.find('#slide_win_images');
                        if (type == 0) {
                            styleWin.show();
                        } else {
                            imagesWin.show();
                            //获取组件信息
                            var comData = $self._getComInfo();
                            if (comData['items']) {
                                $.each(comData['items'], function () {
                                    var linkType = 0, linkUrl = '', linkOpen = 0, linkMenuID = '';
                                    if (!$.isEmpty(this['config'])) {
                                        var itemConfig = eval('(' + this['config'] + ')');
                                        linkType = itemConfig['link-type'];
                                        linkUrl = itemConfig['link-url'];
                                        linkOpen = itemConfig['link-open'];
                                        linkMenuID = itemConfig['link-menuid'];
                                    }
                                    setImg(curCom, this['resource_id'], this['path'], this['name'], linkType, linkUrl, linkOpen, linkMenuID);
                                });
                            }
                        }
                        styleWin.find('.pop-edit-btns-b').click(function () {
                            var styleType = 1;
                            var selected = styleWin.find('.slide-select .selected');
                            styleType = parseInt(selected.attr('data-value'));
                            $self._cacheComConfig('navstyle', styleType);
                            styleWin.hide();
                            upWin.show();
                            imagesWin.hide();
                            //上传图片
                            top.$.onUpload({
                                pick: {'id': '#slideUpImg', 'label': '请选择您要上传的图片', 'multiple': false},
                                dnd: '#slideDragBox',
                                disableGlobalDnd: false
                            }, {'uploadStart': function () {
                                    upWin.hide();
                                    imagesWin.show();
                                    comSlideAddImg();
                                },
                                'uploadFinished': function () {
                                    $self._initUpLoading(0);
                                },
                                'uploadProgress': function (file, percentage) {
                                    $self._initUpLoading(percentage * 100);
                                },
                                'uploadSuccess': function (file, response) {
                                    if (response.state == 'SUCCESS') {
                                        styleWin.hide();
                                        upWin.hide();
                                        setImg(curCom, response.id, response.url, '', 0, '', 0, '');
                                        imagesWin.show();
                                    } else {
                                        top.$.ShowResultMag('上传失败。', false);
                                    }
                                }
                            });
                        });
                        top.$.WinDialog(win, function (winDialog, winBox) {
                            if (type != 0)
                                comSlideAddImg();
                            imagesWin.find('.pop-edit-btns-b .btn-green-b').click(function () {
                                winDialog.remove();
                                winBox.remove();
                                closeImgEdit(curCom);
                                getImagesData();
                                initSlidePlay(comInner);
                                closeAllWin();
                                //  $self.SaveCom();
                                if (isEmpty)
                                    $self.saveComID = 0;

                            });
                        }, function () {
                            closeAllWin();
                        });
                        //获取图片信息
                        var getImagesData = function () {
                            var panelList = slideImagePanel.find('li');
                            var temItems = [];
                            panelList.each(function () {
                                var item = $(this);
                                var temConfig = "{";
                                temConfig += '"link-type":"' + item.attr('data-linktype') + '",';
                                temConfig += '"link-url":"' + item.attr('data-linkurl') + '",';
                                temConfig += '"link-open":"' + item.attr('data-linkopen') + '",';
                                temConfig += '"link-menuid":"' + item.attr('data-linkmenuid') + '"}';
                                temItems[temItems.length] = {'name': item.attr('data-name'), 'resource_id': item.attr('data-resid'), 'path': item.attr('data-path'), 'config': temConfig};
                            });
                            $self._cacheComData('items', temItems);
                        }
                    }
                });
            }
            //设置图片
            var setImg = function (curCom, resID, imgPath, name, linkType, linkUrl, linkOpen, linkMenuID) {
                slideImagePanel = win.find('#slide_images_list');
                var curItem = $('<li></li>');
                curItem.attr('data-resid', resID).attr('data-path', imgPath).attr({'data-name': (name ? name : ''), 'data-linktype': linkType, 'data-linkurl': linkUrl, 'data-linkopen': linkOpen, 'data-linkmenuid': linkMenuID});
                var img = $('<div></div>', {class: 'gallery-img'});
                img.append('<img src="' + HOSTCONFIG.WEB_URL + imgPath + '">');
                curItem.append(img);
                var tool = $('<div></div>', {class: 'gallery-tool-in-b'});
                var toolOuter = $('<div></div>', {class: 'gallery-tool-b'});
                var btnLink = $('<span title="新增链接" aria-hidden="true" class="glyphicon glyphicon-link"></span>');
                var btnCaption = $('<span title="新增说明" aria-hidden="true" class="glyphicon glyphicon-comment"></span>');
                var btnDel = $('<span title="删除图片" aria-hidden="true" class="glyphicon glyphicon-trash"></span>');
                //图片设置连接按钮
                btnLink.click(function (event) {
                    imgEditLink(curCom, curItem, $(this));
                    event.stopPropagation();
                });
                //图片设置说明按钮
                btnCaption.click(function (event) {
                    imgEditCaption(curCom, curItem, $(this));
                    event.stopPropagation();
                });
                //图片删除
                btnDel.click(function (event) {
                    closeAllWin();
                    curItem.remove();
                    event.stopPropagation();
                });
                tool.append(btnLink).append(btnCaption).append(btnDel);
                toolOuter.append(tool);
                curItem.append(toolOuter);
                slideImagePanel.append(curItem);
            }
            var initSlidePlay = function (comInner) {
                //设置组件图片
                var imgList = slideImagePanel.find('li img');
                var liList = slideImagePanel.find('li');
                if (imgList.length > 0) {
                    var imgHtml = '<div class="w-slide-page-num"><div class="w-page-bottom"><div class="w-slide-content"><div class="slide-panel">'
                    for (var i = 0; i < imgList.length; i++) {
                        imgHtml += '<div class="slide-item"><div class="slide-item-div"><div class="slide-item-div-inner"><img src="' + $(imgList[i]).attr('src') + '" class="slide-img" />';
                        var caption = $(liList[i]).attr('data-name');
                        if (!$.isEmpty(caption))
                            imgHtml += '<div class="slide-caption"><div class="slide-captionbg"></div><div class="slide-caption-text"><div class="slide-caption-text-in">' + $(liList[i]).attr('data-name') + '</div></div></div>';
                        imgHtml += '</div></div></div>';
                    }
                    imgHtml += '<div class="cycle-prev"></div><div class="cycle-next"></div></div></div></div></div>';
                    comInner.html(imgHtml);

                    var slideConfig = {ratio: 'auto', style: 'fade', speend: 5, autoplay: 1, showcotrols: 1, captionpos: 0, navstyle: 0, navlocation: 0, disabled: true};
                    var curComConfig = $self._getComConfig();
                    if (curComConfig) {
                        if (curComConfig['ratio'])
                            slideConfig.ratio = curComConfig['ratio'];
                        if (curComConfig['style'])
                            slideConfig.style = curComConfig['style'];
                        if (curComConfig['speend'])
                            slideConfig.speend = parseInt(curComConfig['speend']);
                        if (curComConfig['autoplay'])
                            slideConfig.autoplay = parseInt(curComConfig['autoplay']);
                        if (curComConfig['showcotrols'])
                            slideConfig.showcotrols = parseInt(curComConfig['showcotrols']);
                        if (curComConfig['captionpos'])
                            slideConfig.captionpos = parseInt(curComConfig['captionpos']);
                        if (curComConfig['navstyle'])
                            slideConfig.navstyle = parseInt(curComConfig['navstyle']);
                        if (curComConfig['navlocation'])
                            slideConfig.navlocation = parseInt(curComConfig['navlocation']);
                    }
                    $(comInner).slide('destroy').slide(slideConfig);
                } else {
                    comInner.html('<div class="image-empty"><a title="点击上传"><img src="/images/gallery-empty.png"></a></div>');
                }

            }
            //图片连接
            var imgEditLink = function (curCom, curItem, btn) {
                $self.$comBar.slideLinkBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.slideLinkBar,
                        COMPONENTTYPE.SLIDESHOW,
                        1,
                        function (bar, comInner) {
                            closeImgEdit(curCom);
                            showImgEdit(btn, bar);
                            bar.css('z-index', '1001');
                            btn.addClass('edited');
                            var linkList = bar.find('li[data-type=com-link]');
                            var radioList = linkList.find('input[type=radio]');
                            var openLink = $(linkList[0]).find('input.checkboxnew');
                            var urlInput = bar.find('input[data-type=link-url]');
                            var btnDelLink = bar.find('span.btn-blackGray');
                            $(radioList[curItem.attr('data-linktype')]).prop('checked', true);
                            if (curItem.attr('data-linkopen') == 1) {
                                openLink.addClass('checked');
                            } else {
                                openLink.removeClass('checked');
                            }
                            urlInput.val(curItem.attr('data-linkurl'));
                            var innnerLink = bar.find('div[data-type=inner-link]');
                            if (!$.isEmpty(curItem.attr('data-linkmenuid'))) {
                                innnerLink.attr('data-value', curItem.attr('data-linkmenuid'));
                                innnerLink.html(bar.find('div.select-option').find('div[data-value=' + curItem.attr('data-linkmenuid') + ']').text());
                            } else {
                                innnerLink.attr('data-value', '').html('无');
                            }
                            btnDelLink.off('click').click(function () {
                                curItem.attr('data-linktype', '');
                                curItem.attr('data-linkurl', '');
                                curItem.attr('data-linkopen', 0);
                                curItem.attr('data-linkmenuid', '');
                                closeImgEdit(curCom);
                                return false;
                            });
                            //提交
                            var btnSumbit = bar.find('span.btn-green-b');
                            btnSumbit.off('click').click(function () {
                                var linkType = 0;
                                if ($(radioList[1]).prop('checked'))
                                    linkType = 1;
                                curItem.attr('data-linktype', linkType);
                                curItem.attr('data-linkurl', urlInput.val());
                                curItem.attr('data-linkopen', openLink.hasClass('checked') ? 1 : 0);
                                curItem.attr('data-linkmenuid', bar.find('div[data-type=inner-link]').attr('data-value'));
                                closeImgEdit(curCom);
                                return false;
                            });
                        },
                        function (type, typevalue, value) {

                        });
            }
            //图片标题
            var imgEditCaption = function (curCom, curItem, btn) {
                closeImgEdit(curCom);
                $self.$comBar.slideCaptionBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.slideCaptionBar,
                        COMPONENTTYPE.SLIDESHOW,
                        2,
                        function (bar, comInner) {
                            bar.css('z-index', '1001');
                            var textarea = bar.find('textarea.pop-textarea-b:first');
                            var curImg = curItem.find('img:first');
                            textarea.val(curItem.attr('data-name'));
                            //关闭
                            var btnClose = bar.find('span.btn-blackGray');
                            btnClose.unbind('click').click(function () {
                                closeImgEdit(curCom);
                            });
                            //提交
                            var btnSumbit = bar.find('span.btn-green-b');
                            btnSumbit.unbind('click').click(function () {
                                curItem.attr('data-name', textarea.val());
                                closeImgEdit(curCom);
                            });
                            showImgEdit(btn, bar);
                            btn.addClass('edited');
                        });
            }
            //关闭
            var closeImgEdit = function (curCom) {
                slideImagePanel.find('.gallery-tool-in-b .glyphicon').removeClass('edited');
                if ($self.$comBar.slideCaptionBar != null)
                    $self.$comBar.slideCaptionBar.hide();
                if ($self.$comBar.slideLinkBar != null)
                    $self.$comBar.slideLinkBar.hide();
            }
            //显示
            var showImgEdit = function (btn, imgBar) {
                var pos = btn.offset();
                imgBar.css({'left': pos.left - (imgBar.outerWidth() / 2) + (btn.outerWidth() / 2) + 10, 'top': pos.top + btn.outerHeight() + 2}).show();
            }
            var initSlideBar = function (curCom) {
                $self.$comBar.slideBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.slideBar,
                        COMPONENTTYPE.SLIDESHOW,
                        null,
                        function (bar, comInner) {
                            createSlideBar(bar, curCom, comInner);
                        },
                        function (type, style, value) {
                            var comInner = curCom.find('.w-edit-com:first');
                            if (type == 'slide-config') {
                                comInner.slide('option', style, value);
                                $self._cacheComConfig(style, value);
                            }
                        });
            }
            //创建
            var createSlideBar = function (bar, curCom, comInner) {
                //上传按钮
                var upBtn = bar.find('input[type="button"]');
                upBtn.unbind('click').click(function () {
                    loadSetWin(curCom, 1);
                });
            }
            if (com.find('.w-edit-com .image-empty:first').length == 0) {
                var slideConfig = {ratio: 'auto', style: 'fade', speend: 5, autoplay: 1, showcotrols: 1, captionpos: 0, navstyle: 0, navlocation: 0, disabled: true};
                var curComConfig = $self._getComConfig(com.attr('data-id'));
                if (curComConfig) {
                    if (curComConfig['ratio'])
                        slideConfig.ratio = curComConfig['ratio'];
                    if (curComConfig['style'])
                        slideConfig.style = curComConfig['style'];
                    if (curComConfig['speend'])
                        slideConfig.speend = parseInt(curComConfig['speend']);
                    if (curComConfig['autoplay'])
                        slideConfig.autoplay = parseInt(curComConfig['autoplay']);
                    if (curComConfig['showcotrols'])
                        slideConfig.showcotrols = parseInt(curComConfig['showcotrols']);
                    if (curComConfig['captionpos'])
                        slideConfig.captionpos = parseInt(curComConfig['captionpos']);
                    if (curComConfig['navstyle'])
                        slideConfig.navstyle = parseInt(curComConfig['navstyle']);
                    if (curComConfig['navlocation'])
                        slideConfig.navlocation = parseInt(curComConfig['navlocation']);
                }
                $(com.find('.w-edit-com:first')).slide(slideConfig);
            }
            com.click(function () {
                if ($self.options.disable)
                    return false;
                if ($(this).find('.w-edit-com .image-empty:first').length == 0) {
                    if ($self.saveComID == $(this).attr('data-id'))
                        return false;
                    $self._clearFun();
                    $self.$curCom = $(this);
                    isEmpty = false;
                    initSlideBar($(this));
                } else {
                    $self.$curCom = $(this);
                    isEmpty = true;
                    $self.saveComID = $self.$curCom.attr('data-id');
                    loadSetWin($(this), 0);
                }
                return false;
            });
        },
        //代码组件编辑器初始化
        _initCodeBar: function ($self, com) {
            var initCodeBar = function (curCom) {
                $self.$comBar.codeBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.codeBar,
                        COMPONENTTYPE.CODE,
                        null,
                        function (bar, comInner, comConfig) {
                            createCodeBar(bar, curCom, comInner, comConfig);
                        },
                        function (type, style, value) {

                        });
            }
            //创建
            var createCodeBar = function (bar, curCom, comInner, comConfig) {
                var codeHtml = comInner.find('.code-info:first');
                var textarea = comInner.find('textarea');
                if (textarea.length == 0) {
                    textarea = $('<textarea></textarea>').css('height', '150px').hide();
                    comInner.append(textarea);
                }
                codeHtml.hide();
                //显示输入框
                var showTextarea = function () {
                    var html = codeHtml.html();
                    if (html == '点击设置代码') {
                        textarea.val('');
                    } else {
                        textarea.val(html);
                    }
                    codeHtml.hide();
                    textarea.show().focus();
                }
                //显示html
                var showHtml = function () {
                    var html = textarea.val();
                    if ($.isEmpty(html)) {
                        codeHtml.html('点击设置代码');
                    } else {
                        codeHtml.html(html);
                    }
                    textarea.hide();
                    codeHtml.show();
                }
                showTextarea();
                textarea.off('keyup').on('keyup', function () {
                    codeHtml.html($(this).val());
                    $self._cacheComData('info', $(this).val());
                });
                textarea.off('click').on('click', function (event) {
                    event.stopPropagation();
                });
                //点击编辑
                bar.find('input.btn-b').unbind('click').click(function () {
                    showTextarea();
                });
                //位置
                var alignList = bar.find('span.btn-gray-black-b');
                if (comConfig != null && comConfig['text-align']) {
                    bar.find('span.btn-gray-black-b[data-align=' + comConfig['text-align'] + ']').addClass('btn-cur');
                } else {
                    $(alignList[0]).addClass('btn-cur');
                }
                alignList.each(function () {
                    $(this).unbind('click').click(function () {
                        alignList.removeClass('btn-cur');
                        $(this).addClass('btn-cur');
                        showHtml();
                        comInner.css('text-align', $(this).attr('data-align'));
                        $self._cacheComConfig('text-align', $(this).attr('data-align'));
                    });
                });
            }
            $self._clearFun();
            com.click(function () {
                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                $self.saveComID = $self.$curCom.attr('data-id');
                initCodeBar($(this));
                return false;
            });
        },
        //地图组件编辑器初始化
        _initMapBar: function ($self, com) {
            var initMapBar = function (curCom) {
                $self.$comBar.mapBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.mapBar,
                        COMPONENTTYPE.MAP,
                        null,
                        function (bar, comInner) {
                            createMapBar(bar, curCom, comInner);
                        },
                        function (type, style, value) {
                            if (type == 'map-config') {
                                setMap($self.$comBar.mapBar, $self.$curCom.find('.w-edit-com'));
                                $self._cacheComConfig(style, value);
                            }
                        });
            }
            //创建
            var createMapBar = function (bar, curCom, comInner) {
                var address = bar.find('input[data-type=address]');
                address.unbind('keyup').keyup(function () {
                    $self._cacheComConfig('address', $(this).val());
                    setMap(bar, comInner);
                });
            }
            var setMap = function (bar, comInner) {
                var gframe = comInner.find('iframe:first');
                var maptop = comInner.find('.maptop:first');
                var width = bar.find('div[data-style="width"]').attr('data-value');
                var height = bar.find('div[data-style="height"]').attr('data-value');
                var zoom = bar.find('div[data-style="zoom"]').attr('data-value');
                var marker = bar.find('div[data-style="marker"]').attr('data-value');
                var address = bar.find('input[data-type=address]').val();
                var align = bar.find('div[data-style="align"]').attr('data-value');
                if (width != '100%')
                    width += 'px';
                if (!$.isEmpty(height)) {
                    height += 'px';
                }
                var url = '/js/editor/bar/baidumap.html?width=' + width + '&height=' + height + '&zoom=' + zoom + '&address=' + address + '&marker=' + marker + '&align=' + align;
                gframe.attr('src', url).css('height', height);
                maptop.css('height', height);
            }
            $self._clearFun();
            com.click(function () {
                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                initMapBar($(this));
                return false;
            });
        },
        //分类级别标记
        _getSortIndex: function (index) {
            var indexhtml = '|-';
            for (var i = 0; i < index; i++) {
                indexhtml += '-';
            }
            return indexhtml;
        },
        //产品组件编辑器初始化
        _initProductBar: function ($self, com) {
            var initProductBar = function (curCom) {
                $self.$comBar.productBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.productBar,
                        COMPONENTTYPE.PRODUCT,
                        null,
                        function (bar, comInner, comConfig) {
                            createProductBar(bar, curCom, comInner, comConfig);
                        },
                        function (type, style, value) {

                        });
            }
            //创建
            var createProductBar = function (bar, curCom, comInner, comConfig) {
                var comData = $self._getComInfo();
                var curProductID = 0;
                if (comData && comData['choose'] > 0) {
                    curProductID = parseInt(comData['choose']);
                }
                var btnSelect = bar.find('input.btn-green-b:first');
                btnSelect.off('click').on('click', function () {
                    initProductWin(comData);
                });

            }
            $self._clearFun();
            var setComHtml = function () {
                $.WebRequest('/editor/com/product', $self._getComInfo(), function (data) {
                    com.html(data.html);
                });
            }
            var win = $('<div></div>');
            var initProductWin = function (comData) {
                var url = $self.options.jsurl + "/bar/product_win.html";
                top.$.Loading();
                win.load(url + '?t=' + $.getTimeStamp(), null, function (response, status, xhr) {
                    top.$.UnLoading();
                    top.$.WinDialog(win, function (winDialog, winBox) {
                        $self.saveComID = comData['id'];
                        var listDiv = win.find('.adpop-prd-list-b ul');
                        var ddlSort = win.find('#com_product_sort');
                        var btnSelect = win.find('input.btn:first');
                        var txtName = win.find('input.input-text-b:first');
                        var sortID = 0, productName = '', curIndex = 1, allIndex = 1;
                        var getProductList = function () {
                            $.WebRequest('/editor/com/products', {'sortid': sortID, 'name': productName, 'pageindex': curIndex}, function (data) {
                                var listHtml = '';
                                for (var i = 0; i < data.list.length; i++) {
                                    listHtml += '<li><div class="prd-cell"><div class="prd-h"><h3>' + data.list[i]['title'] + '</h3></div><div class="prd-cell-btn"><input value="选择" class="btn btn-green-b" type="button" data-productid="' + data.list[i]['id'] + '" /></div></div></li>';
                                }
                                listDiv.html(listHtml);
                                listDiv.find('input').each(function () {
                                    $(this).click(function () {
                                        $self._cacheComData('choose', $(this).attr('data-productid'));
                                        setComHtml();
                                        winBox.remove();
                                        winDialog.remove();
                                        $self._clearFun();
                                    });
                                });
                            });
                        }
                        var initSortList = function (systemID, sortList, parentID, index) {
                            for (var i = 0; i < sortList.length; i++) {
                                if (sortList[i]['parent_id'] == parentID) {
                                    ddlSort.append('<option value="' + sortList[i]['id'] + '|' + systemID + '">' + $self._getSortIndex(index + 1) + sortList[i]['name'] + '</option>');
                                    initSortList(systemID, sortList, sortList[i]['id'], index + 1);
                                }
                            }
                            return false;
                        }
                        getProductList();
                        $.WebRequest('/editor/com/product-sort', null, function (data) {
                            for (var i = 0; i < data.systems.length; i++) {
                                ddlSort.append('<option value="' + data.systems[i]['id'] + '|0">' + data.systems[i]['name'] + '</option>');
                                initSortList(data.systems[i]['id'], data.systems[i]['productCategories'], 0, 0);
                            }


                        });
                        btnSelect.click(function () {
                            sortID = ddlSort.val();
                            productName = txtName.val();
                            curIndex = 1;
                            allIndex = 1;
                            getProductList();
                        });
                    }, function () {
                        $self._clearFun();
                    })
                })
            }
            var curComData = $self._getComInfo(com.attr('data-id'));
            if (curComData['add'] && (curComData['choose'] == null || curComData['choose'] == 0)) {
                $self.saveComID = com.attr('data-id');
                $self.$curCom = $(com);
                initProductWin(curComData);
            }
            com.click(function () {
                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                initProductBar($(this));
                return false;
            });
        },
        //文章组件编辑器初始化
        _initArticleBar: function ($self, com) {
            var systems = null;
            var systemList = null;
            var systemSortList = null;
            var sortitem = null;
            var initArticleBar = function (curCom) {
                $self.$comBar.articleBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.articleBar,
                        COMPONENTTYPE.ARTICLE,
                        null,
                        function (bar, comInner, comConfig) {
                            createArticleBar(bar, curCom, comInner, comConfig);
                        },
                        function (type, style, value) {
                            if (type == 'top-count' || type == 'show-time') {
                                $self._cacheComConfig(type, value);
                                setComHtml();
                            }
                        });
            }
            var setComHtml = function () {
                $.WebRequest('/editor/com/article', $self._getComInfo(), function (data) {
                    com.html(data.html);
                });
            }
            var initSortList = function (systemID) {
                var html = '';
                for (var i = 0; i < systems.length; i++) {
                    if (systemID == systems[i]['id']) {
                        for (var j = 0; j < systems[i]['articleCategories'].length; j++)
                            html += '<div data-value="' + systems[i]['articleCategories'][j]['id'] + '"><span>' + systems[i]['articleCategories'][j]['name'] + '</span></div>';
                        break;
                    }
                }
                var sortOption = systemSortList.find('.select-option:first');
                sortOption.html(html);
                sortOption.find('div').each(function () {
                    $(this).off('click').on('click', function () {
                        var systemSortID = $(this).attr('data-value');
                        sortitem.attr('data-value', systemSortID).text($(this).text());
                        sortOption.slideUp();
                        $self._cacheComConfig('system-sort', systemSortID);
                        setComHtml();
                    })
                });
            }
            var createArticleBar = function (bar, curCom, comInner, comConfig) {
                var comData = $self._getComInfo();
                //样式选择
                var btn = bar.find('input[type="button"]');
                btn.unbind('click').click(function () {
                    initArticleWin(curCom, comData);
                });
                systemList = bar.find('#com_article_system');
                systemSortList = bar.find('#com_article_systemsort');
                var html = '';
                for (var i = 0; i < systems.length; i++) {
                    html += '<div data-value="' + systems[i]['id'] + '"><span>' + systems[i]['name'] + '</span></div>';
                }
                var systemOption = systemList.find('.select-option:first');
                systemOption.html(html);
                var systemitem = systemList.find('.select-dt:first').find('.selected:first');
                sortitem = systemSortList.find('.select-dt:first').find('.selected:first');
                sortitem.html('请选择').attr('data-value', '');
                if (systems.length == 0) {
                    systemitem.html('请选择').attr('data-value', '');
                }
                if (comConfig && comConfig['system-id']) {
                    for (var i = 0; i < systems.length; i++) {
                        if (comConfig['system-id'] == systems[i]['id']) {
                            systemitem.html(systems[i]['name']).attr('data-value', systems[i]['id']);
                            if (comConfig && comConfig['system-sort']) {
                                for (var j = 0; j < systems[i]['articleCategories'].length; j++) {
                                    if (comConfig['system-sort'] == systems[i]['articleCategories'][j]['id']) {
                                        sortitem.html(systems[i]['articleCategories'][j]['name']).attr('data-value', systems[i]['articleCategories'][j]['id']);
                                        break;
                                    }
                                }
                            }
                            initSortList(systems[i]['id']);
                            break;
                        }
                    }
                }

                systemOption.find('div').each(function () {
                    $(this).off('click').on('click', function () {
                        var systemID = $(this).attr('data-value');
                        systemitem.attr('data-value', systemID).text($(this).text());
                        systemOption.slideUp();
                        $self._cacheComConfig('system-id', systemID);
                        $self._cacheComConfig('system-sort', 0);
                        sortitem.html('请选择').attr('data-value', '');
                        setComHtml();
                        initSortList(systemID);
                        curCom.html('<div class="image-empty"><img src="/images/news-empty.png"/></div>');
                    });
                });
            }
            var win = $('<div></div>');
            var initArticleWin = function (curCom, comData) {
                var url = $self.options.jsurl + "/bar/article_win.html";
                top.$.Loading();
                win.load(url + '?t=' + $.getTimeStamp(), null, function (response, status, xhr) {
                    top.$.UnLoading();
                    top.$.WinDialog(win, function (winDialog, winBox) {
                        var comConfig = $self._getComConfig(comData['id']);
                        var styleType = 4;
                        var stylePanel = win.find('.styleBoxC-in:first');
                        var styleList = stylePanel.find('li');
                        var btnSave = win.find('.btn-green-b:first');
                        if (comConfig && comConfig['style-type'])
                            styleType = comConfig['style-type'];

                        styleList.removeClass('selected');
                        styleList.each(function () {
                            if ($(this).attr('data-type') == styleType) {
                                $(this).addClass('selected');
                            }
                            $(this).click(function () {
                                styleList.removeClass('selected');
                                $(this).addClass('selected');
                            });
                        });
                        btnSave.click(function () {
                            var item = stylePanel.find('li.selected:first');
                            var temType = $(item).attr('data-type');
                            $self._cacheComConfig('style-type', temType);
                            curCom.find('.w-edit-com:first').attr('class', 'w-edit-com w-adNews w-adNews' + temType);
                            setComHtml();
                            winBox.remove();
                            winDialog.remove();
                        });

                    })
                })
            }
            com.click(function () {
                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                $self.saveComID = $self.$curCom.attr('data-id');
                $.WebRequest('/editor/com/article-sort', null, function (data) {
                    systems = data.systems;
                    initArticleBar($self.$curCom);
                });
                return false;
            });
        },
        //Flash组件编辑器初始化
        _initFlashBar: function ($self, com) {
            var isEmpty = false;
            var initFlashBar = function (curCom) {
                $self.$comBar.flashBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.flashBar,
                        COMPONENTTYPE.FLASH,
                        null,
                        function (bar, comInner, comConfig) {
                            createFlashBar(bar, curCom, comInner, comConfig);
                        },
                        function (type, style, value) {
                        });
            }
            //创建
            var createFlashBar = function (bar, curCom, comInner, comConfig) {
                //上传按钮
                var upBtn = bar.find('input[type="button"]');
                upBtn.off('click').on('click', function () {
                    initUpWin(curCom);
                });
                //位置
                var alignList = bar.find('span.btn-gray-black-b');
                alignList.removeClass('btn-cur');
                if (comConfig != null && comConfig['text-align']) {
                    bar.find('span.btn-gray-black-b[data-align=' + comConfig['text-align'] + ']').addClass('btn-cur');
                } else {
                    $(alignList[0]).addClass('btn-cur');
                }
                alignList.each(function () {
                    $(this).off('click').on('click', function () {
                        alignList.removeClass('btn-cur');
                        $(this).addClass('btn-cur');
                        comInner.css('text-align', $(this).attr('data-align'));
                        $self._cacheComConfig('text-align', $(this).attr('data-align'));
                    });
                });
                //设置flash宽高
                var inputList = bar.find('input.input-text-b');
                if (comConfig != null) {
                    if (comConfig['width']) {
                        $(inputList[0]).val(comConfig['width']);
                    }
                    if (comConfig['height']) {
                        $(inputList[1]).val(comConfig['height']);
                    }
                }
                $(inputList[0]).off('keyup').on('keyup', function () {
                    var txt = $(this).val();
                    var width = '100%';
                    if (!$.isEmpty(txt) && txt > 0)
                        width = txt + "px";
                    if (width == '100%' && !$.isEmpty($(inputList[1]).val())) {
                        comInner.find('object').attr('width', '');
                        comInner.find('embed').attr('width', '');
                    } else {
                        comInner.find('object').attr('width', width);
                        comInner.find('embed').attr('width', width);
                    }
                    $self._cacheComConfig('width', txt > 0 ? txt : '');
                });
                $(inputList[1]).off('keyup').on('keyup', function () {
                    var txt = $(this).val();
                    var height = '';
                    if (!$.isEmpty(txt) && txt > 0)
                        height = txt + "px";
                    if (!$.isEmpty(height) && $.isEmpty($(inputList[0]).val())) {
                        comInner.find('object').attr('width', '');
                        comInner.find('embed').attr('width', '');
                    }
                    comInner.find('object').attr('height', height);
                    comInner.find('embed').attr('height', height);
                    $self._cacheComConfig('height', txt > 0 ? txt : '');
                });
            }
            var setFlash = function (bar, comInner) {

            }
            //上传图片窗口
            var initUpWin = function (curCom) {
                $self._initUpFileWin(curCom, UPFILETYPE.FLASH, function (comInner, resID, path, name) {
                    var flashHtml = '<object type="application/x-shockwave-flash" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" align="middle" width="100%">';
                    flashHtml += '<param name="movie" value="' + path + '">';
                    flashHtml += '<param name="quality" value="high"><param name="play" value="true"> <param name="loop" value="true"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="flashvars" value="">';
                    flashHtml += '<embed src="' + path + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" play="true" loop="true" wmode="transparent" allowfullscreen="true" flashvars="" type="application/x-shockwave-flash" align="middle" width="100%"></object>';
                    flashHtml += '<div style="width:100%;left:0;top:0;height:100%;position:absolute;" class="flashtop"></div>';
                    comInner.html(flashHtml);
                    $self._cacheComData('resource_id', resID);
                    //   $self.SaveCom();
                    if (isEmpty)
                        $self.saveComID = 0;
                })
            }
            com.on('click', function () {
                if ($self.options.disable)
                    return false;
                if ($(this).find('.w-edit-com .w-flash-empty:first').length == 0) {
                    if ($self.saveComID == $(this).attr('data-id'))
                        return false;
                    $self._clearFun();
                    isEmpty = false;
                    $self.$curCom = $(this);
                    initFlashBar($(this));
                } else {
                    $self.$curCom = $(this);
                    isEmpty = true;
                    $self.saveComID = $self.$curCom.attr('data-id');
                    initUpWin($(this));
                }
                return false;
            });
        },
        //文件组件编辑器初始化
        _initFileBar: function ($self, com) {
            var initFileBar = function (curCom) {
                $self.$comBar.fileBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.fileBar,
                        COMPONENTTYPE.FILE,
                        null,
                        function (bar, comInner, comConfig) {
                            createFileBar(bar, curCom, comInner, comConfig);
                        },
                        function (type, style, value) {
                        });
            }
            //创建
            var createFileBar = function (bar, curCom, comInner, comConfig) {
                var comData = $self._getComInfo();
                //上传按钮
                var upBtn = bar.find('input[type="button"]');
                upBtn.off('click').on('click', function () {
                    initUpWin(bar, curCom);
                });
                //设置文件名称
                var txtFileName = bar.find('input.input-text-b');
                if (comData)
                    txtFileName.val(comData['name']);
                txtFileName.off('keyup').on('keyup', function () {
                    var txt = $(this).val();
                    if (!$.isEmpty(txt)) {
                        comInner.find('span.w-file-name').html(txt);
                        comInner.find('span.w-file-empty').html(txt);
                    } else {
                        comInner.find('span.w-file-name').html('');
                        comInner.find('span.w-file-empty').html('文件名称');
                    }
                    $self._cacheComData('name', txt);
                });
                //位置
                var alignList = bar.find('span.btn-gray-black-b');
                alignList.removeClass('btn-cur');
                if (comConfig != null && comConfig['text-align']) {
                    bar.find('span.btn-gray-black-b[data-align=' + comConfig['text-align'] + ']').addClass('btn-cur');
                } else {
                    $(alignList[0]).addClass('btn-cur');
                }
                alignList.each(function () {
                    $(this).off('click').on('click', function () {
                        alignList.removeClass('btn-cur');
                        $(this).addClass('btn-cur');
                        var align = $(this).attr('data-align');
                        var imgPanel = comInner.find('span.w-file-img:first');
                        var namePanel = comInner.find('span.w-file-info:first');
                        imgPanel.attr('style', '');
                        namePanel.attr('style', '');
                        if (align == 'left' || align == 'right') {
                            comInner.attr('style', '');
                            if (align == 'left')
                                imgPanel.css({'float': 'left', 'margin-right': '1em'});
                            if (align == 'right') {
                                imgPanel.css({'float': 'right', 'margin-left': '1em'});
                                namePanel.css({'float': 'right'});
                            }
                        } else {
                            comInner.css('text-align', $(this).attr('data-align'));
                        }
                        $self._cacheComConfig('text-align', $(this).attr('data-align'));
                    });
                });
            }
            var setFile = function (bar, comInner) {

            }
            //上传图片窗口
            var initUpWin = function (bar, curCom) {
                $self._initUpFileWin(curCom, UPFILETYPE.FILE, function (comInner, resID, path, name) {
                    bar.find('input.input-text-b').val(name);
                    comInner.find('span.w-file-name').html(name).show();
                    comInner.find('span.w-file-down').show();
                    comInner.find('span.w-file-empty').hide();
                    $self._cacheComData('name', name);
                    $self._cacheComData('resource_id', resID);
                    //  $self.SaveCom();
                });
            }
            com.on('click', function () {
                if ($self.saveComID == $(this).attr('data-id'))
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                $self.saveComID = $self.$curCom.attr('data-id');
                initFileBar($(this));
                return false;
            });
        },
        //视频链接组件编辑器初始化
        _initVideoLinkBar: function ($self, com) {
            var initVideoLinkBar = function (curCom) {
                $self.$comBar.videoLinkBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.videoLinkBar,
                        COMPONENTTYPE.VIDEOLINK,
                        null,
                        function (bar, comInner, comConfig) {
                            createBar(bar, curCom, comInner, comConfig);
                        },
                        function (type, style, value) {
                            if (type == 'size') {
                                setVideoHeight(curCom, parseInt(value));
                                $self._cacheComConfig('size', value);
                            }
                        });
            }
            //创建
            var createBar = function (bar, curCom, comInner, comConfig) {
                var comData = $self._getComInfo();
                //位置
                var alignList = bar.find('span.btn-gray-black-b');
                alignList.removeClass('btn-cur');
                if (comConfig != null && comConfig['text-align']) {
                    bar.find('span.btn-gray-black-b[data-align=' + comConfig['text-align'] + ']').addClass('btn-cur');
                } else {
                    $(alignList[0]).addClass('btn-cur');
                }
                alignList.each(function () {
                    $(this).unbind('click').click(function () {
                        alignList.removeClass('btn-cur');
                        $(this).addClass('btn-cur');
                        comInner.css('text-align', $(this).attr('data-align'));
                        $self._cacheComConfig('text-align', $(this).attr('data-align'));
                    });
                });
                var link = bar.find('input[data-type=video-link]');
                link.val(comData['link']);
                link.off('keyup').on('keyup', function () {
                    $self._cacheComConfig('flash-url', '');
                    if (!$.isEmpty($(this).val())) {
                        $.WebRequest('/editor/check/video', {'url': $(this).val()}, function (response) {
                            if (response.url && !$.isEmpty(response.url)) {
                                $self._cacheComConfig('flash-url', response.url);
                            }
                        });
                    }
                    $self._cacheComData('link', $(this).val());
                });
            }

            var setVideoHeight = function (curCom, size) {
                var curWidth = 0;
                switch (size) {
                    case 0:
                        curWidth = curCom.width();
                        break;
                    case 1:
                        curWidth = 300;
                        break;
                    case 2:
                        curWidth = 400;
                        break;
                    case 3:
                        curWidth = 500;
                        break;
                    case 4:
                        curWidth = 650;
                        break;
                    case 5:
                        curWidth = 850;
                        break;
                }
                if (curWidth > curCom.width())
                    curWidth = curCom.width();
                var curHeight = (curWidth / 16) * 9;
                curCom.find('object').attr('width', size == 0 ? '100%' : curWidth).attr('height', curHeight);
                curCom.find('object').find('embed').attr('width', size == 0 ? '100%' : curWidth).attr('height', curHeight);
                curCom.find('.youtubetop').css('height', curHeight + 'px');
            }
            var comConfig = $self._getComConfig(com.attr('data-id'));
            var size = 0;
            if (comConfig && comConfig['size'])
                size = parseInt(comConfig['size']);
            setVideoHeight(com, size);
            com.on('click', function () {
                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                $self.saveComID = $self.$curCom.attr('data-id');
                initVideoLinkBar($(this));
                return false;
            });
        },
        //社交图标组件编辑器初始化
        _initSocialIconsBar: function ($self, com) {
            var initSocialIconsBar = function (curCom) {
                $self.$comBar.socialIconsBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.socialIconsBar,
                        COMPONENTTYPE.SOCIALICONS,
                        null,
                        function (bar, comInner, comConfig) {
                            createBar(bar, curCom, comInner, comConfig);
                        },
                        function (type, style, value) {
                        });
            }
            //创建
            var createBar = function (bar, curCom, comInner, comConfig) {
                var comData = $self._getComInfo();
                //图片位置
                var alignList = bar.find('span.btn-gray-black-b');
                alignList.removeClass('btn-cur');
                if (comConfig != null && comConfig['text-align']) {
                    bar.find('span.btn-gray-black-b[data-align=' + comConfig['text-align'] + ']').addClass('btn-cur');
                } else {
                    $(alignList[0]).addClass('btn-cur');
                }
                alignList.each(function () {
                    $(this).off('click').on('click', function () {
                        alignList.removeClass('btn-cur');
                        $(this).addClass('btn-cur');
                        comInner.css('text-align', $(this).attr('data-align'));
                        $self._cacheComConfig('text-align', $(this).attr('data-align'));
                    });
                });
                //ICON编辑
                var btnIcon = bar.find('input[data-type=icon]');
                btnIcon.off('click').on('click', function () {
                    initSocialIconsItemBar(curCom, null, $(this));
                });
            }

            //初始化ICON项
            var initSocialIconsItemBar = function (curCom, curItem, btn) {
                $self.$comBar.socialIconsItemBar = $self._initBaseWinBar(
                        $self,
                        curCom,
                        $self.$comBar.socialIconsItemBar,
                        COMPONENTTYPE.SOCIALICONS,
                        1,
                        function (bar, comInner, comConfig) {
                            var comData = $self._getComInfo();
                            var pos = $self.$comBar.socialIconsBar.offset();
                            var addMore = bar.find('.btn-blackGray');

                            bar.css({'top': $self.$comBar.socialIconsBar.css('top'), 'left': pos.left + $self.$comBar.socialIconsBar.width()}).show();
                            bar.find('.social-more-list-b').hide();
                            bar.off('click').on('click', function (event) {
                                bar.find('.social-more-list-b').slideUp();
                                addMore.attr('data-state', 0);
                                event.stopPropagation();
                            });
                            addMore.off('click').on('click', function (event) {
                                if ($(this).attr('data-state') == 0) {
                                    bar.find('.social-more-list-b').slideDown();
                                    $(this).attr('data-state', 1);
                                } else {
                                    bar.find('.social-more-list-b').slideUp();
                                    $(this).attr('data-state', 0);
                                }
                                event.stopPropagation();
                            }).attr('data-state', 0);
                            var iconHtml = '';
                            var addIconList = bar.find('ul[data-type=icon-add-list]');
                            var iconList = bar.find('ul[data-type=icon-list]');
                            addIconList.html('');
                            if (comData.items && comData.items.length > 0) {
                                for (var i = 0; i < comData.items.length; i++) {
                                    iconHtml += createIcon(comData.items[i]['id'], parseInt(comData.items[i]['item_type']), comData.items[i]['link']);
                                }
                                for (var i = 1; i <= 23; i++) {
                                    var isTag = false;
                                    for (var j = 0; j < comData.items.length; j++) {
                                        if (i == parseInt(comData.items[j]['item_type'])) {
                                            isTag = true;
                                            break;
                                        }
                                    }
                                    if (!isTag)
                                        createAdd(addIconList, i);
                                }
                                if (addIconList.find('li').length == 0) {
                                    addMore.hide();
                                }
                            } else {
                                iconHtml += createIcon(0, 1);
                                iconHtml += createIcon(0, 2);
                                iconHtml += createIcon(0, 3);
                                iconHtml += createIcon(0, 4);
                                iconHtml += createIcon(0, 5);
                                for (var i = 6; i <= 23; i++) {
                                    createAdd(addIconList, i);
                                }
                            }
                            var bindIconList = function () {
                                addIconList.find('li').off('click').on('click', function () {
                                    iconList.append(createIcon(0, parseInt($(this).attr('data-value'))));
                                    createComIcon(curCom, parseInt($(this).attr('data-value')));
                                    $(this).remove();
                                    bindClick();
                                    if (addIconList.find('li').length == 0) {
                                        addMore.hide();
                                    }
                                    getItemData();
                                    bar.find('.social-more-list-b').slideUp();
                                });
                            }

                            var bindClick = function () {
                                iconList.find('li').each(function () {
                                    $(this).find('span.social-delete').off('click').on('click', function () {
                                        if (bar.find('ul[data-type=icon-list]').find('li').length > 1) {
                                            $(this).parents('li:first').remove();
                                            createAdd(addIconList, parseInt($(this).attr('data-value')));
                                            curCom.find('a[data-value=' + $(this).attr('data-value') + ']').remove();
                                            bindIconList();
                                            getItemData();
                                        }
                                        if (addIconList.find('li').length > 0)
                                            addMore.show();
                                    });
                                    $(this).find('input.input-social').off('keyup').on('keyup', function () {
                                        getItemData();
                                    });
                                });
                            }
                            bindIconList();
                            iconList.html(iconHtml);
                            bindClick();
                            //获取当前数据
                            var getItemData = function () {
                                var temItems = [];
                                iconList.find('li').each(function () {
                                    var input = $(this).find('input.input-social:first');
                                    temItems[temItems.length] = {"item_type": input.attr('data-value'), "link": input.val()};
                                });
                                $self._cacheComData('items', temItems);
                            }
                        },
                        function (type, typevalue, value) {

                        });
            }

            var createAdd = function (ddl, type) {
                var iconClass = '';
                var name = '';
                switch (type) {
                    case 1:
                        iconClass = 'icon-social-facebook';
                        name = 'Facebook';
                        break;
                    case 2:
                        iconClass = 'icon-social-twitter';
                        name = 'Twitter.com';
                        break;
                    case 3:
                        iconClass = 'icon-social-instagram';
                        name = 'Instagram';
                        break;
                    case 4:
                        iconClass = 'icon-social-linkedin';
                        name = 'Linkedin';
                        break;
                    case 5:
                        iconClass = 'icon-social-mail';
                        name = 'Mail';
                        break;
                    case 6:
                        iconClass = 'icon-social-flickr';
                        name = 'Flickr';
                        break;
                    case 7:
                        iconClass = 'icon-social-pinterest';
                        name = 'Pinterest';
                        break;
                    case 8:
                        iconClass = 'icon-social-google';
                        name = 'Google+';
                        break;
                    case 9:
                        iconClass = 'icon-social-rss';
                        name = 'RSS';
                        break;
                    case 10:
                        iconClass = 'icon-social-vimeo';
                        name = 'Vimeo';
                        break;
                    case 11:
                        iconClass = 'icon-social-yahho';
                        name = 'Yahoo!';
                        break;
                    case 12:
                        iconClass = 'icon-social-youtube';
                        name = 'YouTube';
                        break;
                    case 13:
                        iconClass = 'icon-social-dribbble';
                        name = 'Dribbble';
                        break;
                    case 14:
                        iconClass = 'icon-social-douban';
                        name = '豆瓣';
                        break;
                    case 15:
                        iconClass = 'icon-social-zhihu';
                        name = '知乎';
                        break;
                    case 16:
                        iconClass = 'icon-social-renren';
                        name = '人人网';
                        break;
                    case 17:
                        iconClass = 'icon-social-tenxun';
                        name = '腾讯微博';
                        break;
                    case 18:
                        iconClass = 'icon-social-xinlang';
                        name = '新浪微博';
                        break;
                    case 19:
                        iconClass = 'icon-social-QQkongjian';
                        name = 'QQ空间';
                        break;
                    case 20:
                        iconClass = 'icon-social-dazong';
                        name = '大众点评';
                        break;
                    case 21:
                        iconClass = 'icon-social-tianya';
                        name = '天涯论坛';
                        break;
                    case 22:
                        iconClass = 'icon-social-kaixin';
                        name = '开心网';
                        break;
                    case 23:
                        iconClass = 'icon-social-pengyouweb';
                        name = '朋友网';
                        break;
                }
                ddl.append('<li data-value="' + type + '"><span>' + name + '</span><i class="icon-social ' + iconClass + '"></i></li>');
            }

            var createIcon = function (id, type, link) {
                var divClass = '';
                var iconClass = '';
                var placeholder = '';
                switch (type) {
                    case 1:
                        divClass = 'social-facebook';
                        iconClass = 'icon-social-facebook';
                        placeholder = 'http://facebook.com/example';
                        break;
                    case 2:
                        divClass = 'social-twitter';
                        iconClass = 'icon-social-twitter';
                        placeholder = 'http://twitter.com/example';
                        break;
                    case 3:
                        divClass = 'social-instagram';
                        iconClass = 'icon-social-instagram';
                        placeholder = 'http://instagram.com/example';
                        break;
                    case 4:
                        divClass = 'social-linkedin';
                        iconClass = 'icon-social-linkedin';
                        placeholder = 'http://linkedin.com/in/example';
                        break;
                    case 5:
                        divClass = 'social-mail';
                        iconClass = 'icon-social-mail';
                        placeholder = 'http://example@example.com';
                        break;
                    case 6:
                        divClass = 'social-flickr';
                        iconClass = 'icon-social-flickr';
                        placeholder = 'http://flickr.com/photos/example';
                        break;
                    case 7:
                        divClass = 'social-pinterest';
                        iconClass = 'icon-social-pinterest';
                        placeholder = 'http://pinterest.com/example';
                        break;
                    case 8:
                        divClass = 'social-google';
                        iconClass = 'icon-social-google';
                        placeholder = 'http://plus.google.com/example';
                        break;
                    case 9:
                        divClass = 'social-rss';
                        iconClass = 'icon-social-rss';
                        placeholder = 'http://example.com/feed.rss';
                        break;
                    case 10:
                        divClass = 'social-vimeo';
                        iconClass = 'icon-social-vimeo';
                        placeholder = 'http://vimeo.com/example';
                        break;
                    case 11:
                        divClass = 'social-yahho';
                        iconClass = 'icon-social-yahho';
                        placeholder = 'http://yahoo.com/example';
                        break;
                    case 12:
                        divClass = 'social-youtube';
                        iconClass = 'icon-social-youtube';
                        placeholder = 'http://youtube.com/user/example';
                        break;
                    case 13:
                        divClass = 'social-dribbble';
                        iconClass = 'icon-social-dribbble';
                        placeholder = 'http://dribbble.com/example';
                        break;
                    case 14:
                        divClass = 'social-douban';
                        iconClass = 'icon-social-douban';
                        placeholder = 'http://douban.com/example';
                        break;
                    case 15:
                        divClass = 'social-zhihu';
                        iconClass = 'icon-social-zhihu';
                        placeholder = 'http://zhihu.com/example';
                        break;
                    case 16:
                        divClass = 'social-renren';
                        iconClass = 'icon-social-renren';
                        placeholder = 'http://renren.com/example';
                        break;
                    case 17:
                        divClass = 'social-tenxun';
                        iconClass = 'icon-social-tenxun';
                        placeholder = 'http://t.qq.com/example';
                        break;
                    case 18:
                        divClass = 'social-xinlang';
                        iconClass = 'icon-social-xinlang';
                        placeholder = 'http://weibo.com/example';
                        break;
                    case 19:
                        divClass = 'social-QQkongjian';
                        iconClass = 'icon-social-QQkongjian';
                        placeholder = 'http://user.qzone.qq.com/example';
                        break;
                    case 20:
                        divClass = 'social-dazong';
                        iconClass = 'icon-social-dazong';
                        placeholder = 'http://dianping.com/example';
                        break;
                    case 21:
                        divClass = 'social-tianya';
                        iconClass = 'icon-social-tianya';
                        placeholder = 'http://bbs.tianya.cn/example';
                        break;
                    case 22:
                        divClass = 'social-kaixin';
                        iconClass = 'icon-social-kaixin';
                        placeholder = 'http://kaixin001.com/example';
                        break;
                    case 23:
                        divClass = 'social-pengyouweb';
                        iconClass = 'icon-social-pengyouweb';
                        placeholder = 'http://pengyou.com/example';
                        break;
                }
                return '<li><div class="social-li-in clearfix">'
                        //+ '<div class="btn-social-move-b"><i class="icon-other icon-sicial-move"></i></div>'
                        + '<div class="social-pop-item ' + divClass + '"><span class="social-icon"><i class="icon-social ' + iconClass + '"></i></span><span class="social-input"><input placeholder="' + placeholder + '" class="input-social" type="text" data-value="' + type + '" data-id="' + id + '" value="' + (link ? link : '') + '"></span>'
                        + '<span class="social-delete" data-value="' + type + '"><i class="icon-other icon-social-delete"></i></span></div></div></li>';
            }

            var createComIcon = function (curCom, type) {
                var divClass = '';
                var iconClass = '';
                switch (type) {
                    case 1:
                        divClass = 'social-facebook';
                        iconClass = 'icon-social-facebook';
                        break;
                    case 2:
                        divClass = 'social-twitter';
                        iconClass = 'icon-social-twitter';
                        break;
                    case 3:
                        divClass = 'social-instagram';
                        iconClass = 'icon-social-instagram';
                        break;
                    case 4:
                        divClass = 'social-linkedin';
                        iconClass = 'icon-social-linkedin';
                        break;
                    case 5:
                        divClass = 'social-mail';
                        iconClass = 'icon-social-mail';
                        break;
                    case 6:
                        divClass = 'social-flickr';
                        iconClass = 'icon-social-flickr';
                        break;
                    case 7:
                        divClass = 'social-pinterest';
                        iconClass = 'icon-social-pinterest';
                        break;
                    case 8:
                        divClass = 'social-google';
                        iconClass = 'icon-social-google';
                        break;
                    case 9:
                        divClass = 'social-rss';
                        iconClass = 'icon-social-rss';
                        break;
                    case 10:
                        divClass = 'social-vimeo';
                        iconClass = 'icon-social-vimeo';
                        break;
                    case 11:
                        divClass = 'social-yahoo';
                        iconClass = 'icon-social-yahoo';
                        break;
                    case 12:
                        divClass = 'social-youtube';
                        iconClass = 'icon-social-youtube';
                        break;
                    case 13:
                        divClass = 'social-dribbble';
                        iconClass = 'icon-social-dribbble';
                        break;
                    case 14:
                        divClass = 'social-douban';
                        iconClass = 'icon-social-douban';
                        break;
                    case 15:
                        divClass = 'social-zhihu';
                        iconClass = 'icon-social-zhihu';
                        break;
                    case 16:
                        divClass = 'social-renren';
                        iconClass = 'icon-social-renren';
                        break;
                    case 17:
                        divClass = 'social-tenxun';
                        iconClass = 'icon-social-tenxun';
                        break;
                    case 18:
                        divClass = 'social-xinlang';
                        iconClass = 'icon-social-xinlang';
                        break;
                    case 19:
                        divClass = 'social-QQkongjian';
                        iconClass = 'icon-social-QQkongjian';
                        break;
                    case 20:
                        divClass = 'social-dazong';
                        iconClass = 'icon-social-dazong';
                        break;
                    case 21:
                        divClass = 'social-tianya';
                        iconClass = 'icon-social-tianya';
                        break;
                    case 22:
                        divClass = 'social-kaixin';
                        iconClass = 'icon-social-kaixin';
                        break;
                    case 23:
                        divClass = 'social-pengyouweb';
                        iconClass = 'icon-social-pengyouweb';
                        break;
                }
                curCom.find('.w-social-in').append('<a data-social="mail" data-value="' + type + '" class="social-item ' + divClass + '" href="javascript:void(0);"><i class="icon-social ' + iconClass + '"></i></a>');
            }

            $self._clearFun();
            com.on('click', function () {
                if ($self.saveComID == $(this).attr('data-id') || $self.options.disable)
                    return false;
                $self._clearFun();
                $self.$curCom = $(this);
                $self.saveComID = $self.$curCom.attr('data-id');
                initSocialIconsBar($(this));
                return false;
            });
        },
        //计算是不是在指定容器内
        _countPosFun: function (event, panel) {
            if (panel.length > 0) {
                var pos = panel.offset();
                this.boxParm.left = pos.left;
                this.boxParm.top = pos.top;
                this.boxParm.width = panel.outerWidth();
                this.boxParm.height = panel.outerHeight();
                var temTop = this.boxParm.top;
                if (this.moveType == 0)
                    temTop -= this._getScrollTop();
                if (event.pageX >= (this.boxParm.left + this.iframeLeft)
                        && event.pageX <= (this.boxParm.left + this.iframeLeft + this.boxParm.width)
                        && event.pageY >= (temTop + this.iframeTop)
                        && event.pageY <= (temTop + this.iframeTop + this.boxParm.height)) {
                    return true;
                }
            }
            return false;
        },
        //获取编辑器的html页面
        _getBarHtml: function (curBar, comType, subType, callFun) {

            var barurl = this.options.jsurl + "/bar/";
            var urlhtml = '';
            switch (comType) {
                case COMPONENTTYPE.TITLE:
                    urlhtml = 'title.html';
                    break;
                case COMPONENTTYPE.BUTTON:
                    urlhtml = 'button.html';
                    break;
                case COMPONENTTYPE.DIVIDER:
                    urlhtml = 'divider.html';
                    break;
                case COMPONENTTYPE.SEARCH:
                    urlhtml = 'search.html';
                    break;
                case COMPONENTTYPE.IMAGE:
                    urlhtml = 'image.html';
                    break;
                case COMPONENTTYPE.GALLERY:
                    if (subType == null) {
                        urlhtml = 'gallery.html';
                    } else {
                        switch (subType) {
                            case 1:
                                urlhtml = 'gallery_link.html';
                                break;
                            case 2:
                                urlhtml = 'gallery_caption.html';
                                break;
                        }
                    }
                    break;
                case COMPONENTTYPE.SLIDESHOW:
                    if (subType == null) {
                        urlhtml = 'slide.html';
                    } else {
                        switch (subType) {
                            case 1:
                                urlhtml = 'slide_link.html';
                                break;
                            case 2:
                                urlhtml = 'slide_caption.html';
                                break;
                        }
                    }
                    break;
                case COMPONENTTYPE.CODE:
                    urlhtml = 'code.html';
                    break;
                case COMPONENTTYPE.MAP:
                    urlhtml = 'map.html';
                    break;
                case COMPONENTTYPE.PRODUCT:
                    urlhtml = 'product.html';
                    break;
                case COMPONENTTYPE.ARTICLE:
                    urlhtml = 'article.html';
                    break;
                case COMPONENTTYPE.FLASH:
                    urlhtml = 'flash.html';
                    break;
                case COMPONENTTYPE.FILE:
                    urlhtml = 'file.html';
                    break;
                case COMPONENTTYPE.VIDEOLINK:
                    urlhtml = 'videolink.html';
                    break;
                case COMPONENTTYPE.SOCIALICONS:
                    if (subType == null) {
                        urlhtml = 'social_icons.html';
                    } else {
                        switch (subType) {
                            case 1:
                                urlhtml = 'social_icons_item.html';
                                break;
                        }
                    }
                    break;
            }
            if (urlhtml != '') {
                top.$.Loading();
                curBar.load(barurl + urlhtml + '?t=' + $.getTimeStamp(), null, function (response, status, xhr) {
                    top.$.UnLoading();
                    if (status == "success") {
                        if (typeof callFun == 'function')
                            callFun(curBar);
                    }
                });
            } else {
                top.$.ShowResultMag('页面不存在。', false);
            }
        },
        //所有编辑器
        CloseAll: function () {
            this.CloseBar();
            this.CloseLogo();
            this.CloseBanner();
            $('div.li-div[data-type=3]').each(function () {
                var comTxt = $(this).find('.w-edit-com');
                comTxt.noteTxt('clear');
            });
        },
        //关闭组件编辑器
        CloseBar: function () {
            $.each(this.$comBar, function () {
                if (this != null)
                    $(this).hide();
            });
            this.options.editing = false;
            if (this.$deleteAlert != null)
                this.$deleteAlert.hide();
            if (this.$copyWindow != null)
                this.$copyWindow.hide();
            if (this.$comBox != null) {
                this.$comBox.find('div.li-div[data-id]').removeClass('li-div-moveto-hover').removeClass('li-div-delete-hover');
//                this.$comBox.find('div[contenteditable]').each(function () {
//                    if ($(this).text() == '') {
//                        $(this).html('点击编辑文本');
//                    }
//                    $(this).attr('contenteditable', false);
//                });
            }
            if (this.$contentBox != null) {
                this.$contentBox.find('div.gallery-tool-b').hide();
                var codeList = this.$contentBox.find('div.w-code');
                codeList.find('textarea').hide();
                codeList.find('div.code-info').show();
            }
            if (this.$footerBox != null)
                this.$footerBox.find('div.gallery-tool-b').hide();
            this.saveComID = 0;
            // this.SaveCom();
        },
        CloseLogo: function () {
            if (this.$logoBox != null) {
                this.$logoBox.find('h1').blur();
                this.$logoWindow.hide();
                //if (this.pageData.logo != null)
                // this.SaveLogo();
            }
        },
        CloseBanner: function () {
//            if (this.$bannerBox != null) {
//                if (this.$bannerWindow.find('div.show_control:first').attr('data-show') == 1)
//                    this.$bannerWindow.hide();
//            }
        },
        //自动计算页面宽度(手机效果时禁用)
        _autoCountWidth: function () {
            var me = this;
            window.setInterval(function () {
                if (me.$body.width() <= 768) {
                    me.options.disable = true;
                    me._clearFun();
                    me.$eidtLeftMask.show();
                    if (me.$bannerWindow != null)
                        me.$bannerWindow.hide();
                } else {
                    me.options.disable = false;
                    if (me.$bannerWindow != null)
                        me.$bannerWindow.show();
                }
            }, 200);
        },
        SetDisable: function (disable) {
            this._clearFun();
            this.options.disable = disable;
        },
        //清除对象和事件
        _clearFun: function () {
            this.iframeLeft = 357;
            this.iframeTop = 40;
            this.$body.removeClass('noChoose');
            //this.$body.css('position', '');
            if (this.moveBoxType == 1 && this.$baffle) {
                this.$baffle.hide();
            }
            this.$dropCom = null;
            this.options.moving = false;
            if (this.docTime != null)
                clearInterval(this.docTime);

            this.$topBody.off('mouseup mousedown mousemove');
            this.$body.off('mouseup mousedown mousemove');
            this.$innerMoveMask.css({left: -500, top: -500}).hide();
            this.$moveMask.css({left: -500, top: -500}).hide();
            this.$posMask.css({left: -500, top: -500}).hide();
            this.options.status = 0;
            this.isNewBox = false;
            this.dropPos = '';
            this.options.moving = false;
            this.options.deleting = false;
            this.options.copying = false;
            this.options.editing = false;
            this.$deleteAlert.hide();
            this.$copyWindow.hide();
            // this.$doWindow.hide();
            this.$curCom = null;
            //this.$comBox.find('div.li-div').removeClass('li-div-moveto-hover').removeClass('li-div-delete-hover').removeClass('li-div-moveto-hover');
            this.CloseAll();
            this.comInfo = {};
            this.$curCom = null;
            this.saveComID = 0;
        },
        //获取组件信息
        _getComInfo: function (id) {
            var temID = this.saveComID;
            if (id)
                temID = id;
            var allCom = null;
            if (this.moveBoxType == 1) {
                allCom = PAGEALLCOM;
            } else if (this.moveBoxType == 2) {
                allCom = FOOTERALLCOM;
            }
            for (var i = 0; i < allCom.length; i++) {
                if (allCom[i]['id'] == temID) {
                    return allCom[i];
                }
            }
            return null;
        },
        //获取组件配置信息
        _getComConfig: function (id) {
            var temID = this.saveComID;
            if (id)
                temID = id;
            var allCom = null;
            if (this.moveBoxType == 1) {
                allCom = PAGEALLCOM;
            } else if (this.moveBoxType == 2) {
                allCom = FOOTERALLCOM;
            }
            for (var i = 0; i < allCom.length; i++) {
                if (allCom[i]['id'] == temID) {
                    var temConfig = allCom[i]['config'];
                    if (temConfig != null && !$.isEmpty(temConfig))
                        return eval('(' + temConfig + ')');
                }
            }
            return null;
        },
        //缓存修改的信息
        _cacheDataJson: function (jsonType, key, val) {
            var json = this.pageData[jsonType];
            if (json == null) {
                json = {};
            }
            json[key] = val;
            this.pageData[jsonType] = json;
        },
        //验证数据,数据一样的不提交
        _checkComInfo: function () {
            var me = this;
            if (this.pageData.com != null) {
                var temJson = [];
                $.each(this.pageData.com, function (index, curCom) {
                    var isPass = true;
                    $.each((me.moveBoxType == 1 ? PAGEALLCOM : FOOTERALLCOM), function () {
                        if (this['id'] == curCom['id']) {
                            for (var key in curCom) {
                                if ("undefined" != typeof (this[key])) {
                                    if (curCom[key] != this[key]) {
                                        isPass = false;
                                        break;
                                    }
                                } else {
                                    isPass = false;
                                    break;
                                }
                            }
                            return false;
                        }
                    });
                    if (!isPass)
                        temJson[temJson.length] = curCom;
                });
                this.pageData.com = temJson;
                return this.pageData.com.length > 0 ? false : true;
            }
            return true;
        },
        //更改组件信息
        _editComInfo: function () {
            var me = this;
            if (this.pageData.com != null) {
                $.each(this.pageData.com, function (index, curCom) {
                    $.each((me.moveBoxType == 1 ? PAGEALLCOM : FOOTERALLCOM), function () {
                        if (this['id'] == curCom['id']) {
                            for (var key in curCom) {
                                if ("undefined" != typeof (this[key])) {
                                    if (this[key] != curCom[key]) {
                                        this[key] = curCom[key];
                                    }
                                } else {
                                    this[key] = curCom[key];
                                }
                            }
                            return false;
                        }
                    });
                });
            }
        },
        _autoImage: function () {
            $('img[autoimage=1]').each(function () {
                $.AutoImageSize(this);
            });
        },
        //验证数据,数据一样的不提交
        _checkOneInfo: function (checkJson, oldJson) {
            if (oldJson == null)
                return false;
            var isPass = true;
            for (var key in checkJson) {
                if ("undefined" != typeof (oldJson[key])) {
                    if (checkJson[key] != oldJson[key]) {
                        isPass = false;
                        break;
                    }
                } else {
                    isPass = false;
                    break;
                }
            }
            return isPass;
        },
        //更改信息
        _editOneInfo: function (checkJson, oldJson) {
            for (var key in checkJson) {
                if ("undefined" != typeof (oldJson[key])) {
                    if (checkJson[key] != oldJson[key]) {
                        oldJson[key] = checkJson[key];
                    }
                }
            }
            return oldJson;
        },
        ResetPage: function () {
            var me = this;
            $.each(SITEMENUS, function () {
                if (HOSTCONFIG.PAGE_ID == this.page_id) {
                    me.GetPage(this.id);
                    return false;
                }
            });
        },
        //获取页面信息
        GetPage: function (menuID, callFun) {
            var me = this;
            this.clearMain();
            this.$eidtLeftMask.show();
            $.WebRequest('/editor/page', {id: menuID},
                    function (data) {
                        if (!me.options.disable)
                            me.$eidtLeftMask.hide();
                        PAGEJSON = data.page_json;
                        HOSTCONFIG.PAGE_ID = data.page_json.curmenu['id'];
                        SITEMENUS = data.page_json.menus;
                        PAGEALLCOM = data.page_json.maincoms;
                        FOOTERALLCOM = data.page_json.footercoms;
                        SITECONFIG = data.page_json.siteconfig;
                        SITEBANNER = data.page_json.banner;
                        SITECURMENU = data.page_json.curmenu;
                        $('#themecss').attr('href', '/template/' + data.page_json.theme + '/css/theme.css');
                        $('#colorcss').attr('href', '/template/' + data.page_json.theme + '/css/color_' + data.page_json.color + '.css');
                        me.menuType = parseInt(data.page_json.pagetype);
                        me.$mainBox.html(data.res);
                        me.initMain();
                        me.CloseBar();
                        $('div.text-menubox-b').remove();
                        if (typeof callFun == 'function') {
                            callFun();
                        }
                    }, null);
        },
        SaveAll: function () {
            //  this.SaveLogo();
            //this.SaveCom();
            //  this.SaveBanner();
        },
        SavePage: function (isLoad, callFun) {
            var me = this;
            this.clearMain();
            this.$eidtLeftMask.show();
            this._countPageAllComPos();
            $.WebRequest('/editor/page/save', {pageid: HOSTCONFIG.PAGE_ID, pagejson: JSON.stringify(PAGEJSON)},
                    function (data) {
                        me.update = false;
                        me.$eidtLeftMask.hide();
                        if (data.code == 1) {
                            if (isLoad) {
                                me.GetPage(HOSTCONFIG.PAGE_ID, callFun);
                            } else if (typeof callFun == 'function') {
                                callFun();
                            }
                        }
                    });
        },
        //缓存Logo数据
        _cacheLogoData: function (item, value) {
            PAGEJSON.siteconfig[item] = value;
            PAGEJSON.siteconfig['update'] = 1;
            this.update = true;
        },
        //缓存Banner数据
        _cacheBannerData: function (item, value) {
            PAGEJSON.banner[item] = value;
            PAGEJSON.banner['update'] = 1;
            this.update = true;
        },
        //获取组件信息
        _getCacheComData: function (comID) {
            var comList = this.moveBoxType == 1 ? PAGEJSON.maincoms : PAGEJSON.footercoms;
            for (var i = 0; i < comList.length; i++) {
                if (comList[i]['id'] == comID)
                    return comList[i];
            }
            return null;
        },
        //保存组件信息
        _cacheComData: function (key, val) {
            if (this.saveComID == 0)
                return false;
            var comList = this.moveBoxType == 1 ? PAGEJSON.maincoms : PAGEJSON.footercoms;
            for (var i = 0; i < comList.length; i++) {
                if (comList[i]['id'] == this.saveComID) {
                    if (key == 'items' && val.length == 0)
                    {
                        comList[i][key] = null;
                    } else {
                        comList[i][key] = val;
                    }
                    if (!comList[i]['add'])
                        comList[i]['update'] = 1;
                    break;
                }
            }
            this.update = true;
        },
        //组件配置信息
        _cacheComConfig: function (key, val) {
            if (this.saveComID == 0)
                return false;
            var comList = this.moveBoxType == 1 ? PAGEJSON.maincoms : PAGEJSON.footercoms;
            for (var i = 0; i < comList.length; i++) {
                if (comList[i]['id'] == this.saveComID) {
                    var temConfig = $.isEmpty(comList[i]['config']) ? {} : eval('(' + comList[i]['config'] + ')');
                    // temConfig == null ? temConfig = {} : temConfig;
                    temConfig[key] = val;
                    comList[i]['config'] = JSON.stringify(temConfig);
                    if (!comList[i]['add'])
                        comList[i]['update'] = 1;
                    break;
                }
            }
            this.update = true;
        },
        _delCacheComData: function (comID) {
            var comList = this.moveBoxType == 1 ? PAGEJSON.maincoms : PAGEJSON.footercoms;
            for (var i = 0; i < comList.length; i++) {
                if (comList[i]['id'] == comID) {
                    comList[i]['delete'] = 1;
                    break;
                }
            }
            this.update = true;
        },
        _countPageAllComPos: function () {
            this._countAllComPos(0, 1, $(this.$element.find('div.wrap-content-in:first')), PAGEJSON.maincoms);
            this._countAllComPos(0, 1, $('#comFootMainInner'), PAGEJSON.footercoms);
        },
        //计算所有组件位置
        _countAllComPos: function (parentID, column, box, comList) {
            var allCom = box.children('div.li-div[data-id]');
            var count = 0;
            for (var i = 0; i < allCom.length; i++) {
                var curCom = $(allCom[i]);
                var curBoxConfig = '';
                var allColumn = null;
                var typeID = parseInt(curCom.attr('data-type'));
                var curID = parseInt(curCom.attr('data-id'));
                if (typeID == 1) {
                    allColumn = curCom.find('td.td-w[data-id=' + curID + ']');
                    for (var t = 0; t < allColumn.length; t++) {
                        if (curBoxConfig != '')
                            curBoxConfig += ',';
                        curBoxConfig += '{"column":"' + (t + 1) + '","width":"' + $(allColumn[t]).attr('width').replace('%', '') + '"}';
                    }
                    curBoxConfig = '[' + curBoxConfig + ']';
                } else {
                    count++;
                }
                for (var j = 0; j < comList.length; j++) {

                    if (parseInt(comList[j]['id']) == curID) {
                        if (comList[j]['parent_id'] != parentID || comList[j]['pos_column'] != column || comList[j]['pos_row'] != (i + 1)) {
                            comList[j]['parent_id'] = parentID;
                            comList[j]['pos_column'] = column;
                            comList[j]['pos_row'] = i + 1;
                            comList[j]['update'] = 1;
                            this.update = true;
                        }
                        if (typeID == 1) {
                            if (curBoxConfig != comList[j]['config']) {
                                comList[j]['config'] = curBoxConfig;
                                comList[j]['update'] = 1;
                                this.update = true;
                            }
                        }
                        break;
                    }
                }
                if (typeID == 1) {
                    for (var t = 0; t < allColumn.length; t++) {
                        this._countAllComPos(curID, t + 1, $($(allColumn[t]).find('div:first')), comList);
                    }
                }
            }
            if (count == allCom.length)
                return true;
            return false;
        },
        //新增或排序组件信息
        _cacheNewComData: function (posJson, boxJson, comJson, callFun) {
            var comList = this.moveBoxType == 1 ? PAGEJSON.maincoms : PAGEJSON.footercoms;
            var parent_id = posJson['curboxid'];
            var box = null;
            var newData = null;
            if (boxJson != null && !$.isNllEmpty(boxJson['id'])) {
                var boxID = boxJson['id'];
                if (boxID == 0) {
                    var boxCom = {};
                    var boxTemID = this.uuid++;
                    boxCom['id'] = boxTemID;
                    boxCom['host_id'] = HOSTCONFIG.HOST_ID;
                    boxCom['site_id'] = HOSTCONFIG.SITE_ID;
                    boxCom['page_id'] = this.moveBoxType == 1 ? HOSTCONFIG.PAGE_ID : 0;
                    boxCom['type_id'] = 1;
                    boxCom['parent_id'] = parent_id;
                    if (boxJson['pos_row'])
                        boxCom['pos_row'] = boxJson['pos_row'];
                    if (boxJson['pos_column'])
                        boxCom['pos_column'] = boxJson['pos_column'];
                    boxCom['config'] = boxJson['config'];
                    boxCom['add'] = 1;
                    comList[comList.length] = boxCom;
                    parent_id = boxTemID;
                    for (var i = 0; i < comList.length; i++) {
                        if (comList[i]['id'] == posJson['dropcomid']) {
                            comList[i]['parent_id'] = boxTemID;
                            comList[i]['pos_row'] = 1;
                            comList[i]['pos_column'] = 2;
                            if (posJson['droppos'] == 'right') {
                                comList[i]['pos_column'] = 1;
                            }
                            comList[i]['update'] = 1;
                        }
                    }
                } else if (boxID > 0) {
                    parent_id = boxID;
                    var boxCom = this._getCacheComData(boxID);
                    boxCom['config'] = boxJson['config'];
                    boxCom['update'] = 1;

                }
            }
            if (this.moveType == 0) {
                //新增
                comJson['id'] = this.uuid++;
                comJson['parent_id'] = parent_id;
                comJson['add'] = 1;
                comJson['host_id'] = HOSTCONFIG.HOST_ID;
                comJson['site_id'] = HOSTCONFIG.SITE_ID;
                comJson['page_id'] = this.moveBoxType == 1 ? HOSTCONFIG.PAGE_ID : 0;
                if (comJson['type_id'] == COMPONENTTYPE.TITLE) {
                    comJson['info'] = 'TITLE';
                    comJson['config'] = '{"title-type":"' + HOSTCONFIG.THEME_TITLE + '"}';
                }
                comList[comList.length] = comJson;
                newData = comJson;
            } else if (this.moveType == 1) {
                //排序
                if (comJson.id > 0) {
                    for (var i = 0; i < comList.length; i++) {
                        if (comList[i]['id'] == comJson.id) {
                            comList[i]['parent_id'] = parent_id;
                            comList[i]['pos_row'] = comJson['pos_row'];
                            comList[i]['pos_column'] = comJson['pos_column'];
                            comList[i]['update'] = 1;
                            //   box = this._setBoxColum(parent_id, comJson['box_id'], comJson['box_column'], comJson['cur_column']);
                            newData = comList[i];
                            break;
                        }
                    }
                }
            }
            if (typeof callFun == 'function')
                callFun(newData, box);
            this.update = true;
        },
        //删除组件信息
        DeleteCom: function (comID, boxID, boxColumn, curColumn, callFun) {
            var me = this;
            this._delCacheComData(comID);
            if (!this.options.disable)
                this.$eidtLeftMask.hide();
            var box = this._getCacheComData(boxID);// this._setBoxColum(boxID, boxColumn, curColumn);
            if (typeof callFun == 'function') {
                callFun(box);
            }
            this.options.deleting = false;
        },
        //复制组件信息
        CopyCom: function (comID, pageID) {
            var me = this;
            this.$eidtLeftMask.show();
            var com = this._getComInfo(comID);
            if (this.copyType == 1 && pageID == HOSTCONFIG.PAGE_ID) {
                this.CloseBar();
                var comList = PAGEJSON.maincoms;
                //复制到当前页面
                var newCom = jQuery.extend(true, {}, com);
                //   this._setRow(com['parent_id'], com['pos_column'], com['pos_row']);
                newCom['id'] = this.uuid++;
                newCom['add'] = 1;
                comList[comList.length] = newCom;
                var curCom = $('#com_' + comID);
                var newComHtml = $('<div></div>');
                newComHtml.attr({'id': 'com_' + newCom['id'], 'class': 'li-div', 'data-id': newCom['id'], 'data-column': newCom['pos_column'], 'data-row': newCom['pos_row'], 'data-type': curCom.attr('data-type')});
                newComHtml.html(curCom.find('.w-edit-com:first').prop("outerHTML"));
                newComHtml.insertBefore(curCom);
                this._initBindComEvent(this, newComHtml);
            } else {
                $.WebRequest('/editor/page/copy-com', {com: JSON.stringify(com), curpageid: HOSTCONFIG.PAGE_ID, pageid: pageID, copytype: this.copyType},
                        function (data) {
                            if (!me.options.disable)
                                me.$eidtLeftMask.hide();
                            me.options.copying = false;
                            if (data.code == 1) {
                                if (me.copyType == 0)
                                    me._deleteCurCom($('#com_' + comID));
                                me.CloseBar();
                            } else {
                                top.$.ShowResultMag('操作失败。', false);
                            }
                        });
            }
            this.update = true;
        },
        //跳转到首页
        GotoMainPage: function () {
            this.GetPage(0);
        },
        SavaCurPage: function () {
            if (this.update == true)
                this.SavePage(true);
        },
        ReleasePage: function (callFun) {
            if (this.update == true) {
                this.SavePage(true, callFun);
            } else {
                if (typeof callFun == 'function')
                    callFun();
            }
        },
        GetMenu: function (menuID) {
            if (this.update == true) {
                var me = this;
                this.SavePage(false, function () {
                    me.GetPage(menuID);
                });
            } else {
                this.GetPage(menuID);
            }
        },
        //刷新当前页面
        RefreshPage: function () {
            if (this.update == true) {
                this.SavePage(true);
            } else {
                this.GetPage(HOSTCONFIG.PAGE_ID);
            }
        },
        SetPageTemplate: function (id, colorID) {
            $('#themecss').attr('href', '/template/' + id + '/css/theme.css');
            $('#colorcss').attr('href', '/template/' + id + '/css/color_' + colorID + '.css');
            PAGEJSON['theme'] = id;
            PAGEJSON['color'] = colorID;
            PAGEJSON['themeupdate'] = 1;
        },
        //配置
        option: function (key, value) {
            if (value) {
                this.options[key] = value;
            }
            return this.options[key];
        }
    };
    /** 封装 */
    $.fn.webEditor = function (options) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'webEditor')) {
                    $.data(this, 'webEditor', new webEditor(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_') {
            return this.each(function () {
                var instance = $.data(this, 'webEditor');
                if (instance instanceof webEditor && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
                //清除缓存
                if (options === 'destroy') {
                    $.data(this, 'webEditor', null);
                }
            });
        }
    };
}(jQuery, window));
