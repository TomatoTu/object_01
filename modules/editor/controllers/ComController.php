<?php

namespace node\modules\editor\controllers;

use Yii;
use yii\web\Controller;
use node\lib\controller\AjaxController;
use node\models\node\Title;
use node\lib\WebHtml;
use node\models\site\System;
use node\models\site\ProductInfo;

class ComController extends AjaxController {

    /**
     * 获取标题信息
     */
    public function actionTitles() {
        $titls = Title::find()->asArray()->all();
        return ['list' => $titls];
    }

    /**
     * 获取产品列表
     */
    public function actionProducts() {
        $post = Yii::$app->request->post();
        $sort_id = $post['sortid'];
        $name = '%'.$post['name'].'%';
        $where = null;
        $whereValue = null;
        if ($sort_id == 0) {
            $where = ['and','host_id=:host_id', 'site_id=:site_id','title like :name'];
            $whereValue = [':host_id' => Yii::$app->params['NAPLES']['HOSTID'], ':site_id' => Yii::$app->params['NAPLES']['SITEID'], ':name' => $name];
        } else {
            $where = ['and', 'host_id=:host_id', 'site_id=:site_id', 'category_id=:category_id','title like :name'];
            $whereValue = [':host_id' => Yii::$app->params['NAPLES']['HOSTID'], ':site_id' => Yii::$app->params['NAPLES']['SITEID'], ':category_id' => $sort_id, ':name' => $name];
        }
        $product = ProductInfo::find()->where($where,$whereValue)->asArray()->all();
        return ['list' => $product];
    }

    /**
     * 获取产品
     */
    public function actionProduct() {
        $post = Yii::$app->request->post();
        $html = WebHtml::run()->getProduct($post);
        return ['html' => $html];
    }

    /**
     * 获取产品分类
     */
    public function actionProductSort() {
        $systems = System::ProductSystemList();
        return ['systems' => $systems];
    }

    /**
     * 获取文章分类
     */
    public function actionArticleSort() {
        $systems = System::ArticleSystemList();
        return ['systems' => $systems];
    }

    /**
     * 获取文章信息
     */
    public function actionArticle() {
        $post = Yii::$app->request->post();
        $html = WebHtml::run()->getArticle($post);
        return ['html' => $html];
    }

}
