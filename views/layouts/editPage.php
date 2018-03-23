<?php

use yii\helpers\Html;
use node\assets\PageAsset;

PageAsset::register($this);
?>
<!DOCTYPE html>
<html style="display: block;height:100%">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta content="yes" name="apple-mobile-web-app-capable">
        <meta content="yes" name="apple-touch-fullscreen">
        <?= Html::csrfMetaTags() ?>
        <title><?= Html::encode($this->title) ?></title>
<?php $this->head() ?>
        <link id="themecss" href="/template/<?= Yii::$app->params['NAPLES']['SITE']['theme'] ?>/css/theme.css" rel="stylesheet">
        <link id="colorcss" href="/template/<?= Yii::$app->params['NAPLES']['SITE']['theme'] ?>/css/color_<?= Yii::$app->params['NAPLES']['SITE']['color'] ?>.css" rel="stylesheet">
    </head>
    <body style="display: block;height:100%">
        <?php $this->beginBody() ?>
<?= $content ?>
<?php $this->endBody() ?>
        <script type="text/javascript">
            var SITEMENUS = null;
            var SITECURMENU = null;
            var PAGEALLCOM = null;
            var FOOTERALLCOM = null;
            var SITECONFIG = null;
            var SITEBANNER = null;
            var PAGEJSON = null;
            var HOSTCONFIG = {
                HOST_ID:<?= Yii::$app->params['NAPLES']['HOSTID'] ?>,
                SITE_ID:<?= Yii::$app->params['NAPLES']['SITEID'] ?>,
                THEME_TITLE:'<?= Yii::$app->params['NAPLES']['THEME']['theme_title'] ?>',
                THEME:<?= Yii::$app->params['NAPLES']['SITE']['theme'] ?>,
                PAGE_ID: 0,
                SORT_ID: 0,
                PRODUCT_ID: 0,
                CENTER_WEB_URL: '',
                NODE_WEB_URL: "<?= Yii::$app->params['NODE_SERVER']['domain_url'] ?>",
                WEB_URL: "http://<?= Yii::$app->params['NAPLES']['SERVER']['domain'] ?>"
            };
            var viewbox = null;
            $(function () {
                viewbox = $("#viewbox");
                var comContainer = top.$("#navbar_con1");
                viewbox.webEditor({type: 'web', coms: comContainer});
                top.viewbox = viewbox;
            });
        </script>
    </body>

</html>
<?php $this->endPage(); ?>