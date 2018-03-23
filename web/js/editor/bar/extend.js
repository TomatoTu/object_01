/**
 * 编辑器扩展-幻灯片器插件
 * 2015
 * xiaojx@35.cn
 */
(function ($, window) {
    /** 默认配置 */
    var defaults = {
        //比例
        ratio: 'auto',
        //播放效果
        style: 'fade',
        //播放速度
        speend: 5,
        //是否自动播放
        autoplay: 1,
        //是否显示上下翻页按钮
        showcotrols: 1,
        //文字位置(0:底部，1:顶部)
        captionpos: 0,
        //菜单类型(0:无,1:文字,2:小图)
        navstyle: 0,
        //菜单位置(0:底部,1:顶部,2:左边,3:右边)
        navlocation: 0,
        //禁用事件
        disabled: false
    };
    function slide(element, options) {
        this.element = element;
        this.$element = $(element);
        this.$items = null;
        this.curIndex = 0;
        this.options = $.extend({}, defaults, options);
        this.playtime = null;
        this.allimg = null;
        this.imginfo = [];
        this.curheight = 0;
        this.curSubIndex = 0;
        this._init();
    }
    slide.prototype = {
        //初始化
        _init: function () {
            this.$items = this.$element.find('div.slide-item');
            this._setCaptionPos();
            this._setShowCotrols();
            this._setNavigation();
            this._initSize();
            if (!this.options.disabled)
                this._initEvent();
            this._autoPlay();

        },
        //初始比例
        _initSize: function () {
            var self = this;
            this.allimg = this.$element.find('div.slide-item img');
            var count = 1;
            //加载图片
            imgload = function () {
                var index = parseInt(this.index);
                self.imginfo[self.imginfo.length] = {'index': index, 'width': this.width, 'height': this.height};
                if (count == self.allimg.length)
                    self._setSize();
                if (index > 0)
                    $(self.$items[index]).hide();
                count++;
            }
            for (var i = 0; i < this.allimg.length; i++) {
                var temImg = $(this.allimg[i]);
                var newImg = new Image;
                newImg.onload = imgload;
                newImg.src = temImg.attr('src');
                newImg.index = i;
            }

        },
        //事件
        _initEvent: function () {
            var self = this;
            var prev = this.$element.find('div.cycle-prev:first');
            var next = this.$element.find('div.cycle-next:first');
            prev.click(function () {
                self._stopPlay();
                var index = self.curIndex - 1;
                if (index < 0)
                    index = self.$items.length - 1;
                self._play(index);
                self._autoPlay();
                return false;
            });
            next.click(function () {
                self._stopPlay();
                var index = self.curIndex + 1;
                if (index > self.$items.length - 1)
                    index = 0;
                self._play(index);
                self._autoPlay();
                return false;
            });
        },
        //设置比例
        _setSize: function () {
            var maxWith = this.$element.width();
            var maxHeight = 0;
            if (this.options.ratio != 'auto') {
                var ratioItems = this.options.ratio.split(':');
                var ratioWidth = parseInt(ratioItems[0]);
                var ratioHeight = parseInt(ratioItems[1]);
                maxHeight = parseInt((maxWith / ratioWidth) * ratioHeight);
            }

            for (var i = 0; i < this.allimg.length; i++) {
                var temImg = $(this.allimg[i]);
                var temImgInfo = null;
                for (var j = 0; j < this.imginfo.length; j++) {
                    if (i == this.imginfo[j].index) {
                        temImgInfo = this.imginfo[j];
                    }
                }
                var imgWidth = temImgInfo.width;
                var imgHeight = temImgInfo.height;
                if (this.options.ratio == 'auto') {
                    if (imgWidth > maxWith) {
                        imgHeight = imgHeight * (maxWith / imgWidth);
                        imgWidth = maxWith;
                    }
                    maxHeight = imgHeight > maxHeight ? imgHeight : maxHeight;
                    maxHeight = parseInt(maxHeight);
                } else {
                    if (imgHeight > maxHeight) {
                        imgWidth = imgWidth * (maxHeight / imgHeight);
                        imgHeight = maxHeight;
                        imgWidth = parseInt(imgWidth);
                    }
                }
                temImg.css('width', imgWidth);
                temImg.parent().css({'width': imgWidth, 'left': (0 - parseInt(imgWidth / 2)), 'top': (0 - parseInt(imgHeight / 2))});
            }
            this.$element.find('.w-slide-content').css('height', maxHeight);
        },
        //自动播放
        _autoPlay: function () {
            if (this.options.autoplay == 1) {
                var self = this;
                //setTimeout/setInterval
                this.playtime = window.setInterval(function () {
                    self._play();
                }, self.options.speend * 1000);

            }
        },
        //停止播放
        _stopPlay: function () {
            if (this.options.autoplay == 1) {
                if (this.playtime != null)
                    window.clearInterval(this.playtime);

            }
        },
        //关闭自动播放
        _closeAutoPlay: function () {
            if (this.playtime != null) {
                clearInterval(this.playtime);
                this.playtime = null;
            }
        },
        _getNextIndex: function (index) {
            var nextIndex = 0;
            if (typeof index == 'number') {
                nextIndex = index;
                return index;
            } else {
                if (this.curIndex >= this.$items.length - 1) {
                    nextIndex = 0;
                } else {
                    nextIndex = this.curIndex + 1;
                }
            }
            return nextIndex;
        },
        //播放
        _play: function (index) {
            var self = this;
            var nextIndex = this._getNextIndex(index);
            //渐显效果fade
            if (this.options.style == 'fade') {
                $(this.$items[this.curIndex]).fadeOut(function () {
                    self.curIndex = nextIndex;
                    $(self.$items[self.curIndex]).fadeIn('fast');
                });
            }
            //左右滑动效果
            if (this.options.style == 'slide') {
                var maxWith = this.$element.width();
                $(this.$items[nextIndex]).css('left', maxWith).show();
                $(this.$items[this.curIndex]).animate({'left': (0 - maxWith)}, 500, function () {
                    $(this).hide().css('left', 0);
                });
                $(this.$items[nextIndex]).animate({'left': 0});
                this.curIndex = nextIndex;
            }
            //卡片式和百叶窗效果
            if (this.options.style == 'fold' || this.options.style == 'slice') {
                var temCurItem = $(this.$items[this.curIndex]);
                temCurItem.css('z-index', 1);
                this.curIndex = nextIndex;
                // $(this.$items[this.curIndex]).hide();
                var curItem = $(this.$items[nextIndex])
                curItem.css('z-index', 2);
                var curImg = curItem.find('.slide-img');
                curImg.css('opacity', 0);
                curItem.show();
                var curImgDiv = $(curItem.find('.slide-item-div-inner'));
                var curWidth = curImgDiv.width();
                var curHeight = curImgDiv.height();
                var subWidth = curWidth / 12;
                var html = '<div class="slide-img-block">';
                var imgurl = curItem.find('img').attr('src');
                for (var i = 0; i < 12; i++) {
                    html += '<div style="';
                    if (this.options.style == 'fold') {
                        html += 'width:0px;left:' + (subWidth * i) + 'px;'
                    } else if (this.options.style == 'slice') {
                        html += 'width:' + subWidth + 'px;left:' + (subWidth * i) + 'px;';
                    }
                    html += 'opacity:0;position:absolute;top:0;height:' + curHeight + 'px;overflow:hidden;">';
                    html += '<img src="' + imgurl + '" style="width:' + curWidth + 'px;top:0;left:-' + (subWidth * i) + 'px;position:absolute;dispaly:block;max-width:none;" /></div>';
                }
                html += "</div>";
                curImgDiv.append(html);
                var count = 0;
                var itemList = curItem.find('.slide-img-block').children();
                if (this.options.style == 'fold') {
                    itemList.each(function () {
                        $(this).animate({'width': subWidth, 'opacity': 1}, count * 100, function () {
                            var index = itemList.index($(this));
                            if (index == itemList.length - 1) {
                                curImg.css('opacity', 1);
                                temCurItem.fadeOut();
                                curItem.find('.slide-img-block').remove();
                            }
                        });
                        count++;
                    });
                } else if (this.options.style == 'slice') {
                    this.curSubIndex = 0;
                    //  this._sliceAction(itemList, subWidth, curImg, curItem, temCurItem);
                    itemList.each(function () {
                        var index = itemList.index($(this));
                        $(this).animate({'opacity': 1}, count * 150, function () {
                            if (itemList.index($(this)) == itemList.length - 1) {
                                curImg.css('opacity', 1);
                                temCurItem.fadeOut();
                                curItem.find('.slide-img-block').remove();
                            }
                        });
                        count++;
                    });
                }

            }
        },
        _sliceAction: function (items, width, curImg, curItem, temCurItem) {
            var self = this;
            if (this.curSubIndex >= items.length - 1) {
                curImg.css('opacity', 1);
                temCurItem.hide();
                curItem.find('.slide-img-block').remove();
                return false;
            }
            var item = $(items[this.curSubIndex]);
            item.animate({'opacity': 1}, 50, function () {
                self.curSubIndex++;
                self._sliceAction(items, width, curImg, curItem, temCurItem);
            });
        },
        //设置文字位置
        _setCaptionPos: function () {
            var subElement = this.$element.children().get(0);
            if (this.options.captionpos == 1) {
                $(subElement).addClass('slide-caption-top');
            } else {
                $(subElement).removeClass('slide-caption-top');
            }
        },
        //设置分页按钮是否显示
        _setShowCotrols: function () {
            var prev = this.$element.find('div.cycle-prev:first');
            var next = this.$element.find('div.cycle-next:first');
            if (this.options.showcotrols == 1) {
                prev.show();
                next.show();
            } else {
                prev.hide();
                next.hide();
            }
        },
        //设置导航
        _setNavigation: function () {
            var nav = this.$element.find('.slide-page');
            if (nav.length > 0)
                nav.remove();
            if (this.options.navstyle > 0) {
                var self = this;
                var subElement = $(this.$element.children().get(0));
                var posElement = $(subElement.children().get(0))
                var className = (this.options.navstyle == 1 ? 'w-slide-page-num' : 'w-slide-page-img');
                subElement.attr('class', className);
                className = '';
                var navBox = $(this._getNavHtml());
                if (!this.options.disabled) {
                    navBox.find('a').each(function () {
                        $(this).on('click', function () {
                            self._stopPlay();
                            self._play(parseInt($(this).attr('data-index')));
                            self._autoPlay();
                            return false;
                        })
                    });
                }
                posElement.append(navBox);
                switch (this.options.navlocation) {
                    case 0:
                        className = 'w-page-bottom';
                        break;
                    case 1:
                        className = 'w-page-top';
                        break;
                    case 2:
                        className = 'w-page-left';
                        break;
                    case 3:
                        className = 'w-page-right';
                        break;
                }
                posElement.attr('class', className);
            }
        },
        _getNavHtml: function () {
            var html = '<div class="slide-page">';
            var imgCount = this.$items.length;
            for (var i = 0; i < imgCount; i++) {
                if (this.options.navstyle == 1) {
                    html += '<a href="javascript:void(0);" data-index="' + i + '"> ' + (i + 1) + ' </a>';
                } else if (this.options.navstyle == 2) {
                    var item = $(this.$items[i]);
                    item = item.find('img.slide-img');
                    html += '<a href="javascript:void(0)" data-index="' + i + '"><img src="' + item.attr('src') + '"></a>';
                }
            }
            html += '</div>';
            return html;
        },
        //配置
        option: function (key, value) {
            if (typeof (this.options[key]) == 'number')
                value = parseInt(value);
            this.options[key] = value;
            if (key == 'ratio')
                this._setSize();
            if (key == 'autoplay' || key == 'speend') {
                this._closeAutoPlay();
                this._autoPlay();
            }
            if (key == 'captionpos')
                this._setCaptionPos();
            if (key == 'showcotrols')
                this._setShowCotrols();
            if (key == 'navstyle' || key == 'navlocation')
                this._setNavigation();

            return this.options[key];
        }
    };
    /** 封装 */
    $.fn.slide = function (options) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'slide')) {
                    $.data(this, 'slide', new slide(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_') {
            return this.each(function () {
                var instance = $.data(this, 'slide');
                if (instance instanceof slide && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
                //清除缓存
                if (options === 'destroy') {
                    $.data(this, 'slide', null);
                }
            });
        }
    };
}(jQuery, window));


(function ($, d, w) {
    function noteTxt(element, options) {
        this.element = element;
        this.$element = $(element);
        this.toolBar = null;
        this.$textColorBox = null;
        this.isShow = true;
        this.options = options;
        this.toolConfig = [
            {
                type: 'button',
                data: [
                    {'type': 'bold', 'name': '加粗', 'class': 'glyphicon glyphicon-bold'},
                    {'type': 'italic', 'name': '斜体', 'class': 'glyphicon glyphicon-italic'},
                    {'type': 'underline', 'name': '下划线', 'class': 'icon-other icon-underline'}
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
        this._init();
    }
    noteTxt.prototype = {
        //初始化
        _init: function () {
            this._initToolBar();
            this.$element.focus();
        },
        //初始化
        _initToolBar: function () {
            this.toolBar = $('<div></div>', {class: 'text-menubox-b'}).css({'position': 'absolute', 'top': '-25px', 'z-index': 100});
            var textBarPanel = $('<div></div>', {class: 'text-menubox-in-b clearfix'});
            var me = this;
            $.each(this.toolConfig, function (key, item) {
                switch (item.type) {
                    case 'button':
                        textBarPanel = me._initButton(textBarPanel, item);
                        break;
                    case 'dropdown':
                        textBarPanel = me._initDropDown(textBarPanel, item);
                        break;
                }
            });
            this.toolBar.append(textBarPanel).hide();
            $('body').append(this.toolBar);
            this.toolBar.find('a[data-type]').click(function () {
                me._execCommand($(this).attr('data-type'));
                return false;
            });
            var colorBox = this.toolBar.find('.menu-sub:first');
            var colorMenu = this.toolBar.find('.menu-down:first');
            colorMenu.hover(function () {
                colorBox.show();
            }, function () {
                colorBox.hide();
            });
            //颜色
            this.$textColorBox = new dhtmlXColorPicker({parent: 'textCP_' + this.$element.attr('data-id'), closeable: false, cancel: false, color: '#01ef48', conf: {lang: 'cn'}});
            this.$textColorBox.attachEvent('onSelect', function (color) {
                colorBox.hide();
                me._execCommand('forecolor', color);
                return false;
            });
            this.$textColorBox.attachEvent('onCancel', function () {
                colorBox.hide();
            });


            var pos = this.$element.offset();
            this.toolBar.css({'left': pos.left, 'top': pos.top - this.toolBar.outerHeight()}).show();
        },
        //创建普通按钮
        _initButton: function (panel, item) {
            $.each(item.data, function (key, val) {
                $('<a href="javascript:void(0)"></a>')
                        .attr({'data-type': val.type, 'title': val.name})
                        .append($('<span></span>', {class: val.class})).appendTo(panel);
            });
            return panel;
        },
        // 创建下拉菜单
        _initDropDown: function (panel, item) {
            var me = this;
            $.each(item.data, function (key, val) {
                var dropButton = $('<div class="menu-down"></div>').attr({'title': val.name})
                        .append($('<span></span>', {class: val.class}).attr('aria-hidden', true))
                        .append($('<span aria-hidden="true" class="glyphicon glyphicon-triangle-bottom small-down"></span>'));
                if (val.type == 'font-color') {
                    dropButton.append('<div class="menu-sub" style="width:240px;"><div id="textCP_' + me.$element.attr('data-id') + '"></div></div>');
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
        },
        //保存选中区域
        _saveSelection: function () {
            if (w.getSelection) {
                var sel = w.getSelection();
                if (sel.rangeCount > 0) {
                    return sel.getRangeAt(0);
                }
            } else if (d.selection && d.selection.createRange) { // IE
                return d.selection.createRange();
            }
            return null;
        },
        // 重新选中之前选择区域
        _restoreSelection: function (range) {
            if (range) {
                if (w.getSelection) {
                    var sel = w.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (d.selection && range.select) { // IE
                    range.select();
                }
            }
        },
        _getText: function () {
            var txt = '';
            if (w.getSelection) {
                txt = w.getSelection().toString();
            } else if (d.getSelection) {
                txt = d.getSelection().toString();
            } else if (d.selection) {
                txt = d.selection.createRange().text;
            }
            return txt;
        },
        _clearSelection: function () {
            if (w.getSelection) {
                if (w.getSelection().empty) { // Chrome
                    w.getSelection().empty();
                } else if (w.getSelection().removeAllRanges) { // Firefox
                    w.getSelection().removeAllRanges();
                }
            } else if (d.selection) { // IE?
                d.selection.empty();
            }
        },
        _getContainer: function (sel) {
            if (w.getSelection && sel && sel.commonAncestorContainer) {
                return sel.commonAncestorContainer;
            } else if (d.selection && sel && sel.parentElement) {
                return sel.parentElement();
            }
            return null;
        },
        _getSelection: function () {
            if (w.getSelection) {
                return w.getSelection();
            } else if (d.selection && d.selection.createRange) { // IE
                return d.selection;
            }
            return null;
        },
        // 处理命令
        _execCommand: function (type, data, value) {
            data = data || '' + value || '';
            d.execCommand(type, false, data);
            this._saveSelection();
            this.$element.focus();
            if (typeof this.options['saveFun'] == 'function')
                this.options['saveFun']();

        },
        show: function () {
            if (!this.isShow) {
                this.toolBar.show();
                this.isShow = true;
                this.$element.focus();
            }
            return true;
        },
        isShow: function () {
            return this.isShow;
        },
        //清除
        clear: function (empty) {
            this._clearSelection();
            this.toolBar.hide();
            this.isShow = false;
            this.$element.attr('data-empty')==1&&this.$element.html('点击编辑文本');
            return true;
        }
    };
    /** 封装 */
    $.fn.noteTxt = function (options) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'noteTxt')) {
                    $.data(this, 'noteTxt', new noteTxt(this, options));
                } else {
                    var instance = $.data(this, 'noteTxt');
                    instance['show'].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_') {
            return this.each(function () {
                var instance = $.data(this, 'noteTxt');
                if (instance) {
                    if (instance instanceof noteTxt && typeof instance[options] === 'function') {
                        return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                    }
                    //清除缓存
                    if (options === 'destroy') {
                        $.data(this, 'noteTxt', null);
                    }
                }
            });
        }
    }
    ;
}(jQuery, document, window)
        );
