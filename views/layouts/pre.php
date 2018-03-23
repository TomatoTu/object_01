<?php

use yii\helpers\Html;
use node\assets\PageAsset;

PageAsset::register($this);
?>
<!DOCTYPE html>
<html style="display: block;height:100%">
    <head>
        <meta charset="<?= Yii::$app->charset ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
        <?= Html::csrfMetaTags() ?>
        <title><?= Html::encode($this->title) ?></title>
        <?php $this->head() ?>
        <link id="themecss" href="/template/1/css/theme.css" rel="stylesheet">
        <link id="colorcss" href="/template/1/css/color_0.css" rel="stylesheet">
    </head>
    <body style="display: block;height:100%">
        <?php $this->beginBody() ?>
        <div class="preview-b">
            <div class="preview-top-b">
                <div class="preview_link">
                    <span class="preview_link_span cur" data-width="100%"><i class="icon_device_preview icon_device_preview_pc"></i></span>
                    <span class="preview_link_span" data-width="1024px"><i class="icon_device_preview icon_device_preview_padH"></i></span>
                    <span class="preview_link_span" data-width="768"><i class="icon_device_preview icon_device_preview_padV"></i></span>
                    <span class="preview_link_span" data-width="480"><i class="icon_device_preview icon_device_preview_telH"></i></span>
                    <span class="preview_link_span" data-width="320"><i class="icon_device_preview icon_device_preview_telV"></i></span>
                    <span class="QR" onMouseOver="$('.QR-pop-b').show();" onMouseOut="$('.QR-pop-b').hide();"><i class="icon_device_preview icon_device_preview_QR"></i></span> 
                    <div class="QR-pop-b">
                        <p>扫描二维码</p>
                        <img src="images/QR.jpg"/>
                    </div>

                </div>
                <div class="btns-right-b">
                    <a href="#"><i class="icon_device_preview icon_device_preview_cancel"></i></a>
                    <a href="#"><i class="icon_device_preview icon_device_preview_selected"></i></a>
                </div>
            </div>
            <div class="preview-containt-b">
                <div class="theme-top-color-b">
                    <div class="theme-mask-b"></div>
                    <div class="theme-bottom-con-b clearfix">
                        <div class="theme-color-list-b"> <span class="color-square selected" style="background-color:#ff0000;"></span> <span class="color-square" style="background-color:#ff0000;"></span> <span class="color-square" style="background-color:#ff0000;"></span> <span class="color-square" style="background-color:#ff0000;"></span> <span class="color-square" style="background-color:#ff0000;"></span> <span class="color-square" style="background-color:#ff0000;"></span> <span class="color-square" style="background-color:#ff0000;"></span> </div>
                    </div>
                </div>
                <div class="web_view_box_b">
                    <div class="web_view_box_in scroll-box">
                        <pre>
                            <iframe style="width:100%;height:100%;overflow-x:hidden;border:0;" src="/manager/page" seamless="seamless" id="eidtIframe">

                            </iframe>
                        </pre>
                    </div> 
                </div>  
            </div>
        </div>
        <script type="text/javascript">
            $(function () {
                $('.preview_link span.preview_link_span').click(function () {
                    $(this).siblings().removeClass('cur');
                    $(this).addClass('cur');
                    var data_width = $(this).attr('data-width');
                    $('.web_view_box_b').css('width', data_width);
                });
            });
        </script>
        <script type="text/javascript">
            $(function () {
                $('.scroll-box').slimScroll({height: '100%', allowPageScroll: true, color: '#576568'});
            });
        </script> 
        <?php $this->endBody() ?>
    </body>

</html>
<?php $this->endPage(); ?>