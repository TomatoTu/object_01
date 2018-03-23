/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function ($) {
    $.fn.phoneCheck = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.yiiCaptcha');
            return false;
        }
    };

    var defaults = {
        refreshUrl: undefined,
        hashKey: undefined
    };

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $e = $(this);
                var settings = $.extend({}, defaults, options || {});
                $e.data('phoneCheck', {
                    settings: settings
                });

                $e.on('click.phoneCheck', function () {
                    methods.refresh.apply($e);
                    return false;
                });

            });
        },
        refresh: function () {
            var $e = this,
                    settings = this.data('phoneCheck').settings;
            
            var phone = $('#'+settings.phone).val();
            
            if(phone == 'undefined' || $.trim(phone) == '' || !/^1[0-9]{10}$/.test(phone)){
                return false;
            }
            
            $.ajax({
                url: $e.attr('href'),
                data:{phone:phone},
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (data['error'] == '0') {
                        $e.data('time',data.time);
                        $e.attr('disabled',true);
                        setInterval(function($e){
                            if($e.data('time') == '0'){
                                $e.attr('disabled',false);
                                $e.html('重新发送验证码');
                                clearInterval();
                                return false;
                           }
                           var times = $e.data('time');
                           $e.html(--times);
                           $e.data('time',times);
                        }, 1000,$e);
                    } else {
                        alert('error');
                    }
                }
            });
        },
        destroy: function () {
            return this.each(function () {
                $(window).unbind('.phoneCheck');
                $(this).removeData('phoneCheck');
            });
        },
        data: function () {
            return this.data('phoneCheck');
        }
    };
})(window.jQuery);

