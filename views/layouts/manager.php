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
use node\assets\ManagerAsset;

//AppAsset::register($this);
//ReactAsset::register($this);
ManagerAsset::register($this);
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
        <?= $content ?>
        <?php $this->endBody() ?>
        <script type="text/javascript">
            var HOSTCONFIG = {
                HOST_ID:<?= Yii::$app->params['NAPLES']['HOSTID'] ?>,
                SITE_ID:<?= Yii::$app->params['NAPLES']['SITEID'] ?>,
                CENTER_WEB_URL: '',
                NODE_WEB_URL: "<?= Yii::$app->params['NODE_SERVER']['domain_url'] ?>",
                WEB_URL: "http://<?= Yii::$app->params['NAPLES']['SERVER']['domain'] ?>",
                SELF_URL: '<?= Yii::$app->params['NAPLES']['SITE_DOMAIN'] ?>',
            };
        </script>
    </body>
</html>
<?php $this->endPage() ?>
