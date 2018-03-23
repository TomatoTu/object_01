<?php

/* @var $this \yii\web\View */
/* @var $content string */

use node\assets\AppAsset;
use node\assets\ReactAsset;
use node\assets\RAsset;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use center\widgets\Alert;

AppAsset::register($this);
ReactAsset::register($this);
//RAsset::register($this);

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>
<div class="home-b">
    <div class="home-in-b">
        <?= $content ?>
        <div class="home-foot">
           <div class="home-foot-in clearfix">
            <div class="web-logo"><img src="/images/web-logo.png"></div>
            <div class="home-copyright">Copyright © 2016 35.com</div>
            </div>
        </div>
    </div>
</div>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
