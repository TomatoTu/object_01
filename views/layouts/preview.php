<?php

use yii\helpers\Html;
use node\assets\PreviewAsset;

PreviewAsset::register($this);
?>
<!DOCTYPE html>
<html style="display: block;height:100%">
    <head>
        <meta charset="<?= Yii::$app->charset ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
        <?= Html::csrfMetaTags() ?>
        <title><?= Html::encode($this->title) ?></title>
        <?php $this->head() ?>
        <link id="themecss" href="/template/<?=  Yii::$app->params['theme']?>/css/theme.css" rel="stylesheet">
        <link id="colorcss" href="/template/<?= Yii::$app->params['theme']?>/css/color_<?=  Yii::$app->params['color']?>.css" rel="stylesheet">
    </head>
    <body style="display: block;height:100%">
        <?php $this->beginBody() ?>
            <?= $content ?>
        <?php $this->endBody() ?>
    </body>

</html>
<?php $this->endPage(); ?>